"use server"

import { prisma } from "@/lib/prisma";
import he from "he";
import { revalidatePath } from "next/cache";
import { updateUserStatsAfterQuiz, calculateQuizPoints } from "@/lib/stats";

let sessionToken: string | null = null;

async function getSessionToken(): Promise<string | null> {
    if (sessionToken) return sessionToken;

    const response = await fetch("https://opentdb.com/api_token.php?command=request");
    const data = await response.json();

    if (data.response_code === 0) {
        sessionToken = data.token;
        return sessionToken;
    }

    return null;
}

function shuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export async function fetchQuizQuestions(
    category: string,
    difficulty: string = "easy",
    amount: number = 10
) {
    try {
        const token = await getSessionToken();

        const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple${token ? `&token=${token}` : ''}`;

        const apiResponse = await fetch(apiUrl);

        if (!apiResponse.ok) {
            throw new Error("Erreur lors de la récupération des questions");
        }

        const data = await apiResponse.json();

        if (data.response_code !== 0) {
            if (data.response_code === 4) {
                sessionToken = null;
            }
            throw new Error("Pas de questions disponibles pour cette catégorie");
        }

        const formattedQuestions = data.results.map((q: any) => {
            const decodedQuestion = he.decode(q.question);
            const correctAnswer = he.decode(q.correct_answer);
            const incorrectAnswers = q.incorrect_answers.map((a: string) => he.decode(a));

            const allAnswers = shuffle([correctAnswer, ...incorrectAnswers]);

            return {
                question: decodedQuestion,
                answers: allAnswers,
                correctAnswer: correctAnswer,
                category: he.decode(q.category),
                difficulty: q.difficulty,
            };
        });

        return {
            success: true,
            questions: formattedQuestions
        };

    } catch (error) {
        console.error("Erreur fetching quiz data:", error);
        throw new Error(error instanceof Error ? error.message : "Une erreur est survenue");
    }
}

export async function saveQuizResults(
    userId: string,
    categoryId: number,
    categoryName: string,
    score: number,
    totalQuestions: number,
    answers: Array<{
        questionText: string;
        userAnswer: string;
        correctAnswer: string;
        isCorrect: boolean;
    }>
) {
    try {
        const attempt = await prisma.quizAttempt.create({
            data: {
                userId,
                categoryId,
                categoryName,
                score,
                totalQuestions,
                answers: {
                    create: answers.map(answer => ({
                        questionText: answer.questionText,
                        userAnswer: answer.userAnswer,
                        correctAnswer: answer.correctAnswer,
                        isCorrect: answer.isCorrect
                    }))
                }
            },
            include: {
                answers: true
            }
        });

        await updateUserStatsAfterQuiz(userId, score, totalQuestions);

        const updatedUser = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                totalQuizzes: true,
                totalPoints: true,
            },
        });

        const pointsEarned = calculateQuizPoints(score, totalQuestions);

        revalidatePath("/profile");

        return {
            success: true,
            attemptId: attempt.id,
            pointsEarned,
            userStats: updatedUser,
        };
    } catch (error) {
        console.error("Erreur sauvegarde quiz:", error);
        throw new Error("Impossible de sauvegarder les résultats");
    }
}
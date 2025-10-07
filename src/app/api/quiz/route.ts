import { NextResponse } from "next/server";
import he from "he";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category") || "9";
        const difficulty = searchParams.get("difficulty") || "easy";
        const amount = searchParams.get("amount") || "10";

        const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
        const apiResponse = await fetch(apiUrl);

        if (!apiResponse.ok) {
            return NextResponse.json(
                { error: "Erreur lors de la récupération des questions" },
                { status: 500 }
            );
        }

        const data = await apiResponse.json();

        if (data.response_code !== 0) {
            return NextResponse.json(
                { error: "Pas de questions disponibles pour cette catégorie" },
                { status: 404 }
            );
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

        return NextResponse.json({
            questions: formattedQuestions,
        });

    } catch (error) {
        console.error("Erreur fetching quiz data:", error);
        return NextResponse.json(
            { error: "Une erreur est survenue" },
            { status: 500 }
        );
    }
}

function shuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
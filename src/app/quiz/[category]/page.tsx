"use client"

import { use, useEffect, useState } from "react"
import type { Question, UserAnswer } from "@/types/quiz"
import { QuestionCard } from "@/components/QuestionCard"
import { AnswerButton } from "@/components/AnswerButton"
import { ScorePage } from "@/components/ScorePage"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link";
import { QUIZ_CATEGORIES } from "@/lib/categories";
import { fetchQuizQuestions } from "@/actions/quiz";

export default function QuizPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params)

    const categoryInfo = QUIZ_CATEGORIES[category as unknown as keyof typeof QUIZ_CATEGORIES];

    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
    const [showScore, setShowScore] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const result = await fetchQuizQuestions(category, "easy", 10);

                if (result.success) {
                    setQuestions(result.questions);
                }
            } catch (err) {
                return
            } finally {
                setIsLoading(false);
            }
        }

        fetchQuestions();
    }, [category])


    const handleAnswerClick = (answer: string) => {
        if (isTransitioning) return;

        setSelectedAnswer(answer)
        setIsTransitioning(true)

        const currentQuestion = questions[currentQuestionIndex]
        const isCorrect = answer === currentQuestion.correctAnswer

        const newAnswer: UserAnswer = {
            question: currentQuestion.question,
            answer: answer,
            correct: isCorrect,
            correctAnswer: currentQuestion.correctAnswer
        };

        const updatedAnswers = [...userAnswers, newAnswer];
        setUserAnswers(updatedAnswers);

        setTimeout(() => {
            setSelectedAnswer(null)
            setIsTransitioning(false)

            if (currentQuestionIndex === questions.length - 1) {
                setShowScore(true)
            } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1)
            }
        }, 100)
    }

    const calculateScore = () => {
        return userAnswers.filter((answer) => answer.correct).length
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                    <p className="text-lg text-muted-foreground">Chargement des questions...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4">
                <div className="text-center space-y-4 max-w-md">
                    <div className="text-6xl">😕</div>
                    <h2 className="text-2xl font-bold text-foreground">Oups !</h2>
                    <p className="text-muted-foreground">{error}</p>
                    <Button asChild>
                        <Link href="/">Retour à l&#39;accueil</Link>
                    </Button>
                </div>
            </div>
        )
    }

    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4">
                <div className="text-center space-y-4">
                    <div className="text-6xl">📭</div>
                    <h2 className="text-2xl font-bold text-foreground">Aucune question disponible</h2>
                    <Button asChild>
                        <Link href="/">Retour à l&#39;accueil</Link>
                    </Button>
                </div>
            </div>
        )
    }

    if (showScore) {
        const score = calculateScore()
        return (
            <ScorePage
                score={score}
                totalQuestions={questions.length}
                userAnswers={userAnswers}
                questions={questions}
                categoryId={parseInt(category)}
                categoryName={categoryInfo?.name || "Quiz"}
            />
        )
    }

    const currentQuestion = questions[currentQuestionIndex]

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                <QuestionCard
                    question={currentQuestion.question}
                    currentIndex={currentQuestionIndex}
                    totalQuestions={questions.length}
                />

                <div className="space-y-4">
                    {currentQuestion.answers.map((answer, index) => (
                        <AnswerButton
                            key={answer}
                            answer={answer}
                            isSelected={selectedAnswer === answer}
                            onClick={() => handleAnswerClick(answer)}
                            index={index}
                            disabled={isTransitioning}
                        />
                    ))}
                </div>

                {isTransitioning && (
                    <div className="text-center text-muted-foreground animate-pulse">
                        Passage à la question suivante...
                    </div>
                )}
            </div>
        </div>
    )
}
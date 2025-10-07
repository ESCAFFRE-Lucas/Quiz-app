"use client"

import {Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"
import type {Question, UserAnswer} from "@/types/quiz"
import Link from "next/link"

interface ScorePageProps {
    score: number
    totalQuestions: number
    userAnswers: UserAnswer[]
    questions: Question[]
}

export function ScorePage({score, totalQuestions, userAnswers, questions}: ScorePageProps) {
    const percentage = Math.round((score / totalQuestions) * 100)

    const getScoreMessage = () => {
        if (percentage === 100) return "Parfait ! 🎉"
        if (percentage >= 80) return "Excellent ! 🌟"
        if (percentage >= 60) return "Bien joué ! 👏"
        if (percentage >= 40) return "Pas mal ! 💪"
        return "Continue à t'entraîner ! 📚"
    }

    const getScoreColor = () => {
        if (percentage >= 80) return "text-green-500"
        if (percentage >= 60) return "text-blue-500"
        if (percentage >= 40) return "text-orange-500"
        return "text-red-500"
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Score card */}
                <Card className="relative overflow-hidden border-2 border-border/50 bg-card/80 backdrop-blur-sm">
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"/>

                    <div className="relative z-10 p-12 text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground">{getScoreMessage()}</h1>

                        <div className="space-y-2">
                            <div className={cn("text-7xl md:text-8xl font-bold", getScoreColor())}>
                                {score}/{totalQuestions}
                            </div>
                            <p className="text-xl text-muted-foreground">Score: {percentage}%</p>
                        </div>

                        {/* Progress circle */}
                        <div className="flex justify-center pt-4">
                            <div className="relative w-32 h-32">
                                <svg className="transform -rotate-90 w-32 h-32">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-muted"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={`${2 * Math.PI * 56}`}
                                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
                                        className={cn("transition-all duration-1000 ease-out", getScoreColor())}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className={cn("text-2xl font-bold", getScoreColor())}>{percentage}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                            <Button asChild size="lg" className="text-lg">
                                <Link href="/">Retour à l&#39;accueil</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="text-lg bg-transparent">
                                <Link href={window.location.pathname}>Recommencer</Link>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Detailed results */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Détails des réponses</h2>

                    {userAnswers.map((ua, index) => {
                        const question = questions[index]
                        return (
                            <Card
                            key={index}
                            className={cn(
                                "border-2 transition-all duration-300 hover:shadow-lg",
                                ua.correct ? "border-green-500/50 bg-green-500/5" : "border-red-500/50 bg-red-500/5",
                            )}
                            >
                            <div className="p-6 space-y-3">
                                <div className="flex items-start gap-3">
                                    <div
                                        className={cn(
                                            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold",
                                            ua.correct ? "bg-green-500 text-white" : "bg-red-500 text-white",
                                        )}
                                    >
                                        {ua.correct ? "✓" : "✗"}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <p className="font-medium text-foreground leading-relaxed">{ua.question}</p>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-semibold">Votre réponse:</span>{" "}
                                                <span
                                                    className={ua.correct ? "text-green-600" : "text-red-600"}>{ua.answer}</span>
                                            </p>
                                            {!ua.correct && (
                                                <p className="text-sm text-muted-foreground">
                                                    <span className="font-semibold">Bonne réponse:</span>{" "}
                                                    <span className="text-green-600 font-medium">
                                                        {question.correctAnswer}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

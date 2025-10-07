"use client"

import { Card } from "@/components/ui/card"

interface QuestionCardProps {
    question: string
    currentIndex: number
    totalQuestions: number
}

export function QuestionCard({ question, currentIndex, totalQuestions }: QuestionCardProps) {
    const progress = ((currentIndex + 1) / totalQuestions) * 100

    return (
        <Card className="relative overflow-hidden border-2 border-border/50 bg-card/80 backdrop-blur-sm">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="p-8 pt-10">
                {/* Question counter */}
                <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentIndex + 1} sur {totalQuestions}
          </span>
                    <span className="text-sm font-bold text-foreground">{Math.round(progress)}%</span>
                </div>

                {/* Question text */}
                <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-relaxed">{question}</h2>
            </div>
        </Card>
    )
}

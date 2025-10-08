"use client"

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizHistoryListProps } from "@/types/quiz";



export function QuizHistoryList({ attempts, categories }: QuizHistoryListProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (attempts.length === 0) {
        return (
            <Card className="p-12 text-center">
                <p className="text-xl text-muted-foreground mb-4">
                    Aucun quiz joué pour le moment
                </p>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {attempts.map((attempt) => {
                const category = categories[attempt.categoryId];
                const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
                const date = new Date(attempt.completedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                const isExpanded = expandedId === attempt.id;

                return (
                    <Card key={attempt.id} className="overflow-hidden">
                        <button
                            onClick={() => toggleExpand(attempt.id)}
                            className="w-full p-6 hover:bg-muted/50 transition-colors text-left"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">{category?.icon || "📝"}</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">
                                            {attempt.categoryName}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-3xl font-bold text-foreground">
                                            {attempt.score}/{attempt.totalQuestions}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{percentage}%</p>
                                    </div>
                                    {isExpanded ? (
                                        <ChevronUp className="w-6 h-6 text-muted-foreground" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6 text-muted-foreground" />
                                    )}
                                </div>
                            </div>
                        </button>

                        {isExpanded && (
                            <div className="border-t border-border bg-muted/30 p-6 space-y-4">
                                <h4 className="font-semibold text-lg mb-4">Détails des réponses</h4>
                                {attempt.answers.map((answer, index) => (
                                    <div
                                        key={answer.id}
                                        className={cn(
                                            "p-4 rounded-lg border-2",
                                            answer.isCorrect
                                                ? "bg-green-500/5 border-green-500/30"
                                                : "bg-red-500/5 border-red-500/30"
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={cn(
                                                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white",
                                                    answer.isCorrect ? "bg-green-500" : "bg-red-500"
                                                )}
                                            >
                                                {answer.isCorrect ? "✓" : "✗"}
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <p className="font-medium text-foreground">
                                                    <span className="text-muted-foreground">Q{index + 1}:</span> {answer.questionText}
                                                </p>
                                                <div className="space-y-1 text-sm">
                                                    <p className="text-muted-foreground">
                                                        <span className="font-semibold">Ta réponse:</span>{" "}
                                                        <span className={answer.isCorrect ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                                          {answer.userAnswer}
                                                        </span>
                                                    </p>
                                                    {!answer.isCorrect && (
                                                        <p className="text-muted-foreground">
                                                            <span className="font-semibold">Bonne réponse:</span>{" "}
                                                            <span className="text-green-600 font-medium">
                                                                {answer.correctAnswer}
                                                              </span>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                );
            })}
        </div>
    );
}
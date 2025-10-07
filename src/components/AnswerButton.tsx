"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnswerButtonProps {
    answer: string
    isSelected: boolean
    onClick: () => void
    index: number
}

export function AnswerButton({ answer, isSelected, onClick, index }: AnswerButtonProps) {
    const [isHovered, setIsHovered] = useState(false)

    const letters = ["A", "B", "C", "D"]
    const colors = [
        "bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/50",
        "bg-green-500/20 hover:bg-green-500/30 border-green-500/50",
        "bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/50",
        "bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/50",
    ]

    const selectedColors = [
        "bg-blue-500 border-blue-500 text-white",
        "bg-green-500 border-green-500 text-white",
        "bg-orange-500 border-orange-500 text-white",
        "bg-purple-500 border-purple-500 text-white",
    ]

    return (
        <Button
            variant="outline"
            className={cn(
                "w-full h-auto min-h-[80px] p-6 text-left justify-start gap-4 transition-all duration-300 ease-out",
                "border-2 rounded-xl group relative overflow-hidden",
                isSelected ? selectedColors[index % 4] : colors[index % 4],
                isHovered && !isSelected && "scale-[1.02] shadow-lg",
            )}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Letter badge */}
            <div
                className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg font-bold text-lg transition-all duration-300",
                    isSelected ? "bg-white/20 text-white" : "bg-background/50 text-foreground group-hover:scale-110",
                )}
            >
                {letters[index % 4]}
            </div>

            {/* Answer text */}
            <span
                className={cn(
                    "flex-1 text-base md:text-lg font-medium leading-relaxed",
                    isSelected ? "text-white" : "text-foreground",
                )}
            >
        {answer}
      </span>

            {/* Selection indicator */}
            {isSelected && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
            )}
        </Button>
    )
}

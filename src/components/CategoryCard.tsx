"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
    id: number
    name: string
    slug: string
    icon: string
    color: string
}

export function CategoryCard({ id, name, slug, icon, color }: CategoryCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Card
            className={cn(
                "group relative overflow-hidden cursor-pointer transition-all duration-500 ease-out",
                "hover:scale-105 hover:shadow-2xl",
                "border-2 border-border/50 hover:border-transparent",
                "bg-card",
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated background gradient */}
            <div
                className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    color,
                    "blur-xl scale-150",
                )}
            />

            {/* Card content */}
            <div className="relative z-10 p-8 flex flex-col items-center justify-center min-h-[280px] bg-card/80 backdrop-blur-sm">
                {/* Icon container with animation */}
                <div
                    className={cn(
                        "text-7xl mb-6 transition-all duration-500 ease-out",
                        isHovered ? "scale-125 rotate-12" : "scale-100 rotate-0",
                    )}
                >
                    {icon}
                </div>

                {/* Category name */}
                <h3
                    className={cn(
                        "text-2xl font-bold text-center text-balance transition-all duration-300",
                        "text-foreground group-hover:text-foreground",
                    )}
                >
                    {name}
                </h3>

                {/* Animated underline */}
                <div
                    className={cn(
                        "mt-4 h-1 rounded-full transition-all duration-500 ease-out",
                        color,
                        isHovered ? "w-24" : "w-0",
                    )}
                />

                {/* Hover text */}
                <p
                    className={cn(
                        "mt-4 text-sm text-muted-foreground transition-all duration-300",
                        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                    )}
                >
                    Commencer le quiz
                </p>
            </div>

            {/* Corner accent */}
            <div
                className={cn(
                    "absolute top-0 right-0 w-20 h-20 transition-all duration-500",
                    color,
                    "opacity-20 group-hover:opacity-40",
                    "rounded-bl-full",
                    isHovered ? "scale-150" : "scale-100",
                )}
            />
        </Card>
    )
}

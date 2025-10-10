"use client"

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { LeaderboardEntry } from "@/actions/leaderboard";

interface LeaderboardProps {
    entries: LeaderboardEntry[];
    currentUserId?: string;
}

export function Leaderboard({ entries, currentUserId }: LeaderboardProps) {
    const getRankColor = (rank: number) => {
        if (rank === 1) return "text-yellow-500";
        if (rank === 2) return "text-gray-400";
        if (rank === 3) return "text-orange-600";
        return "text-muted-foreground";
    };

    const getRankIcon = (rank: number) => {
        if (rank === 1) return "🥇";
        if (rank === 2) return "🥈";
        if (rank === 3) return "🥉";
        return `#${rank}`;
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500";
        if (score >= 60) return "text-blue-500";
        if (score >= 40) return "text-orange-500";
        return "text-red-500";
    };

    if (entries.length === 0) {
        return (
            <Card className="p-8 text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aucun classement disponible
                </h3>
                <p className="text-muted-foreground">
                    Soyez le premier à jouer un quiz !
                </p>
            </Card>
        );
    }

    return (
        <div className="space-y-3">
            {entries.map((entry) => {
                const isCurrentUser = entry.userId === currentUserId;

                return (
                    <Card
                        key={entry.userId}
                        className={cn(
                            "p-5 transition-all duration-300 hover:shadow-lg border-2",
                            isCurrentUser
                                ? "border-blue-500/50 bg-blue-500/5 ring-2 ring-blue-500/20"
                                : "border-border/50"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                {entry.userImage ? (
                                    <Image
                                        src={entry.userImage}
                                        alt={entry.userName}
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xl font-semibold text-muted-foreground">
                                        {entry.userName.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className={cn("text-lg font-bold", getRankColor(entry.rank))}>
                                        {getRankIcon(entry.rank)}
                                    </span>
                                    <h3 className="font-semibold text-foreground truncate">
                                        {entry.userName}
                                        {isCurrentUser && (
                                            <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                                                Vous
                                            </span>
                                        )}
                                    </h3>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {entry.totalQuizzes} quiz joué{entry.totalQuizzes > 1 ? "s" : ""}
                                </p>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <p className={cn("text-2xl font-bold", getScoreColor(entry.averageScore))}>
                                        {entry.averageScore}%
                                    </p>
                                    <p className="text-xs text-muted-foreground">Moyenne</p>
                                </div>
                                <div className="text-center">
                                    <p className={cn("text-xl font-semibold", getScoreColor(entry.bestScore))}>
                                        {entry.bestScore}%
                                    </p>
                                    <p className="text-xs text-muted-foreground">Meilleur</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}
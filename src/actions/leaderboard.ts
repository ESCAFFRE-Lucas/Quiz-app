"use server"

import {prisma} from "@/lib/prisma";
import {calculateUserStats} from "@/lib/stats";

export interface LeaderboardEntry {
    userId: string;
    userName: string;
    userEmail: string;
    userImage?: string | null
    totalQuizzes: number;
    averageScore: number;
    bestScore: number;
    rank: number;
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
        const users = await prisma.user.findMany({
            include: {
                attempts: {
                    select: {
                        score: true,
                        totalQuestions: true
                    }
                }
            }
        });

        type UserWithAttempts = typeof users[number];

        return users
            .map((user: UserWithAttempts) => {
                const stats = calculateUserStats(user.attempts);

                return {
                    userId: user.id,
                    userName: user.name || "Anonyme",
                    userImage: user.image,
                    userEmail: user.email || "",
                    totalQuizzes: stats.totalQuizzes,
                    averageScore: stats.averageScore,
                    bestScore: stats.bestScore,
                    rank: 0
                };
            })
            .filter(entry => entry.totalQuizzes > 0)
            .sort((a, b) => {
                if (b.averageScore !== a.averageScore) {
                    return b.averageScore - a.averageScore;
                }
                if (b.bestScore !== a.bestScore) {
                    return b.bestScore - a.bestScore;
                }
                return b.totalQuizzes - a.totalQuizzes;
            })
            .map((entry, index) => ({
                ...entry,
                rank: index + 1
            }));
    } catch (error) {
        console.error("Erreur récupération leaderboard:", error);
        throw new Error("Impossible de récupérer le classement");
    }
}
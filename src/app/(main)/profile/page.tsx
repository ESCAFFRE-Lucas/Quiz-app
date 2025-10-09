import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { QUIZ_CATEGORIES } from "@/lib/categories";
import { Card } from "@/components/ui/card";
import { QuizHistoryList } from "@/components/QuizHistoryList";
import { getCompleteUserStats } from "@/lib/stats";
import {EditProfileButton} from "@/components/EditProfileButton";
import Image from "next/image";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            bio: true,
            totalPoints: true,
            createdAt: true,
        }
    });

    if (!user) {
        redirect("/login");
    }

    const attempts = await prisma.quizAttempt.findMany({
        where: { userId: session.user.id },
        orderBy: { completedAt: 'desc' },
        include: {
            answers: true
        }
    });

    const stats = getCompleteUserStats(attempts, user.totalPoints);

    const getUserInitials = () => {
        const name = user.name || user.email;
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <Card className="p-8 border-2 border-border/50 bg-gradient-to-br from-card to-card/50">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="h-32 w-32 rounded-full border-4 border-primary/20 shadow-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || "User"}
                                    width={128}
                                    height={128}
                                    className="object-cover"
                                    priority
                                    fetchPriority="high"
                                    sizes="128px"
                                    quality={85}
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-white">
                                    {getUserInitials()}
                                </div>
                            )}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-foreground">
                                    {user.name || "Utilisateur"}
                                </h1>
                                <div className="md:ml-auto">
                                    <EditProfileButton user={user} stats={stats} />
                                </div>
                            </div>
                            <p className="text-muted-foreground mb-3">{user.email}</p>

                            {user.bio && (
                                <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 max-w-2xl">
                                    {user.bio}
                                </p>
                            )}

                            <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2">
                                <span className="text-sm font-semibold">
                                    🏆 Niveau {Math.floor(user.totalPoints / 100) + 1}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    ({user.totalPoints} points)
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/50">
                        <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <p className="text-3xl font-bold text-blue-500">{stats.totalQuizzes}</p>
                            <p className="text-sm text-muted-foreground mt-1">Quiz joués</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                            <p className="text-3xl font-bold text-green-500">{stats.averageScore}%</p>
                            <p className="text-sm text-muted-foreground mt-1">Score moyen</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <p className="text-3xl font-bold text-purple-500">
                                {stats.bestAttempt
                                    ? `${stats.bestAttempt.score}/${stats.bestAttempt.totalQuestions}`
                                    : "-"
                                }
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">Meilleur score</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <p className="text-3xl font-bold text-orange-500">{user.totalPoints}</p>
                            <p className="text-sm text-muted-foreground mt-1">Points totaux</p>
                        </div>
                    </div>
                </Card>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Historique des quiz</h2>
                    <QuizHistoryList
                        attempts={attempts}
                        categories={QUIZ_CATEGORIES}
                    />
                </div>
            </div>
        </div>
    );
}
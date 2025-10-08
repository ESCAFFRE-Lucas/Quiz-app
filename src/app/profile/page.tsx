import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { QUIZ_CATEGORIES } from "@/lib/categories";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QuizHistoryList } from "@/components/QuizHistoryList";
import { calculateUserStats } from "@/lib/stats";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const attempts = await prisma.quizAttempt.findMany({
        where: { userId: session.user.id },
        orderBy: { completedAt: 'desc' },
        include: {
            answers: true
        }
    });

    const stats = calculateUserStats(attempts);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <Card className="p-8 border-2 border-border/50">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                {session.user.name || "Utilisateur"}
                            </h1>
                            <p className="text-muted-foreground">{session.user.email}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link href="/">Accueil</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/leaderboard">🏆 Classement</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div className="text-center p-4 rounded-lg bg-blue-500/10">
                            <p className="text-3xl font-bold text-blue-500">{stats.totalQuizzes}</p>
                            <p className="text-sm text-muted-foreground">Quiz joués</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-green-500/10">
                            <p className="text-3xl font-bold text-green-500">{stats.averageScore}%</p>
                            <p className="text-sm text-muted-foreground">Score moyen</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-purple-500/10">
                            <p className="text-3xl font-bold text-purple-500">
                                {stats.bestAttempt
                                    ? `${stats.bestAttempt.score}/${stats.bestAttempt.totalQuestions}`
                                    : "-"
                                }
                            </p>
                            <p className="text-sm text-muted-foreground">Meilleur score</p>
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
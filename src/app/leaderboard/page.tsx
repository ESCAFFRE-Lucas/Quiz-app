import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getLeaderboard } from "@/actions/leaderboard";
import { Leaderboard } from "@/components/Leaderboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LeaderboardPage() {
    const session = await getServerSession(authOptions);
    const entries = await getLeaderboard();

    const currentUserEntry = session?.user?.id
        ? entries.find(e => e.userId === session.user.id)
        : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <Card className="p-8 border-2 border-border/50 bg-card/80 backdrop-blur-sm">
                    <div className="text-center space-y-4">
                        <div className="text-6xl">🏆</div>
                        <h1 className="text-4xl font-bold text-foreground">
                            Classement
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Les meilleurs joueurs de quiz
                        </p>

                        <div className="flex justify-center gap-4 pt-4">
                            <Button asChild variant="outline">
                                <Link href="/">Jouer un quiz</Link>
                            </Button>
                            {session && (
                                <Button asChild>
                                    <Link href="/profile">Mon profil</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>

                {currentUserEntry && (
                    <Card className="p-6 border-2 border-blue-500/50 bg-blue-500/5">
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                            Votre position
                        </h2>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-3xl font-bold text-blue-500">
                                    {getRankIcon(currentUserEntry.rank)}
                                </p>
                                <p className="text-sm text-muted-foreground">Rang</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-green-500">
                                    {currentUserEntry.averageScore}%
                                </p>
                                <p className="text-sm text-muted-foreground">Moyenne</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-purple-500">
                                    {currentUserEntry.totalQuizzes}
                                </p>
                                <p className="text-sm text-muted-foreground">Quiz joués</p>
                            </div>
                        </div>
                    </Card>
                )}

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">
                        Top joueurs
                    </h2>
                    <Leaderboard
                        entries={entries}
                        currentUserId={session?.user?.id}
                    />
                </div>
            </div>
        </div>
    );
}

function getRankIcon(rank: number) {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
}
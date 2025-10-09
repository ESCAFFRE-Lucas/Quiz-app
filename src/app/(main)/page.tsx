import { QUIZ_CATEGORIES } from "@/lib/categories"
import { CategoryCard } from "@/components/CategoryCard"
import Link from "next/link";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";

export default async function HomePage() {
    const categories = Object.entries(QUIZ_CATEGORIES).map(([id, category]) => ({
        id: Number(id),
        ...category,
    }))

    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect("/login");
    }

    return (
        <div className="min-h-screen bg-background">
            <section className="relative overflow-hidden border-b border-border/50">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-accent/10"/>

                <div className="relative container mx-auto px-4 py-20 md:py-32">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance text-foreground">
                            Bonjour {session.user.name || session.user.email}!
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                            Choisissez une catégorie et défiez-vous avec nos quiz interactifs
                        </p>
                        <div className="pt-6">
                            <Button asChild size="lg" className="text-lg">
                                <Link href="/leaderboard">Voir le classement</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {categories.map((category) => (
                        <Link href={`/quiz/${category.id}`} key={category.id}>
                            <CategoryCard
                                key={category.id}
                                id={category.id}
                                name={category.name}
                                slug={category.slug}
                                icon={category.icon}
                                color={category.color}
                            />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}

"use client";

import { useState, useMemo } from "react";
import { QUIZ_CATEGORIES } from "@/lib/categories";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchBar } from "@/components/SearchBar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");

    const categories = Object.entries(QUIZ_CATEGORIES).map(([id, category]) => ({
        id: Number(id),
        ...category,
    }));

    const filteredCategories = useMemo(() => {
        if (!searchQuery.trim()) return categories;

        const query = searchQuery.toLowerCase();
        return categories.filter((category) =>
            category.name.toLowerCase().includes(query)
        );
    }, [searchQuery, categories]);

    return (
        <div className="min-h-screen bg-background">
            <section className="relative overflow-hidden border-b border-border/50">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-accent/10" />

                <div className="relative container mx-auto px-4 py-20 md:py-32">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance text-foreground">
                            Testez vos connaissances !
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
                <div className="mb-12">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Rechercher une catégorie..."
                    />
                </div>

                {filteredCategories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredCategories.map((category) => (
                            <Link href={`/quiz/${category.id}`} key={category.id}>
                                <CategoryCard
                                    name={category.name}
                                    icon={category.icon}
                                    color={category.color}
                                />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-muted-foreground mb-4">
                            Aucune catégorie trouvée pour &#34;{searchQuery}&#34;
                        </p>
                        <Button onClick={() => setSearchQuery("")} variant="outline">
                            Effacer la recherche
                        </Button>
                    </div>
                )}
            </section>
        </div>
    );
}
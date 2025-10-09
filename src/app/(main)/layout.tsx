import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Navbar } from "@/components/Navbar";
import { prisma } from "@/lib/prisma";
import { getCompleteUserStats } from "@/lib/stats";
import { redirect } from "next/navigation";
import React from "react";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
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
        }
    });

    if (!user) {
        redirect("/login");
    }

    const attempts = await prisma.quizAttempt.findMany({
        where: { userId: session.user.id },
        select: {
            score: true,
            totalQuestions: true,
        }
    });

    const stats = getCompleteUserStats(attempts, user.totalPoints);

    return (
        <>
            <Navbar
                user={user}
                stats={stats}
            />
            {children}
        </>
    );
}
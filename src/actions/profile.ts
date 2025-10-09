"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(data: {
    name: string;
    bio: string;
    image: string;
}) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            new Error("Non authentifié");
        }

        if (!data.name || data.name.trim().length === 0) {
            new Error("Le nom est requis");
        }

        if (data.name.length > 50) {
            new Error("Le nom ne peut pas dépasser 50 caractères");
        }

        if (data.bio && data.bio.length > 500) {
            new Error("La biographie ne peut pas dépasser 500 caractères");
        }

        const updatedUser = await prisma.user.update({
            where: { id: session?.user.id },
            data: {
                name: data.name.trim(),
                bio: data.bio?.trim() || null,
                image: data.image || null,
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                bio: true,
            },
        });

        revalidatePath("/profile");
        revalidatePath("/leaderboard");
        revalidatePath("/");

        return {
            success: true,
            user: updatedUser,
        };
    } catch (error) {
        console.error("Error updating profile:", error);
        throw new Error(
            error instanceof Error
                ? error.message
                : "Erreur lors de la mise à jour du profil"
        );
    }
}
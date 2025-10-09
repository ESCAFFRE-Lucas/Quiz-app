"use server"

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(
    email: string,
    password: string,
    name?: string
) {
    try {
        if (!email || !password) {
            new Error("Email et mot de passe requis");
        }

        if (password.length < 6) {
            new Error("Le mot de passe doit contenir au moins 6 caractères");
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            new Error("Cet email est déjà utilisé");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || null,
            },
        });

        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        };
    } catch (error) {
        console.error("Erreur inscription:", error);
        throw error;
    }
}
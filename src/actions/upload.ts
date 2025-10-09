"use server";

import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile } from "fs/promises";
import path from "path";

export async function uploadProfileImage(formData: FormData) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new Error("Non authentifié");
        }

        const file = formData.get("file") as File;

        if (!file) {
            throw new Error("Aucun fichier fourni");
        }

        if (!file.type.startsWith("image/")) {
            throw new Error("Le fichier doit être une image");
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new Error("L'image ne doit pas dépasser 5MB");
        }

        const hasVercelBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

        if (hasVercelBlob) {
            const blob = await put(
                `avatars/${session.user.id}-${Date.now()}.${file.name.split('.').pop()}`,
                file,
                {
                    access: "public",
                }
            );

            return {
                success: true,
                url: blob.url,
            };
        } else {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `${session.user.id}-${Date.now()}.${file.name.split('.').pop()}`;
            const uploadPath = path.join(process.cwd(), "public", "uploads", fileName);

            await writeFile(uploadPath, buffer);

            return {
                success: true,
                url: `/uploads/${fileName}`,
            };
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error(
            error instanceof Error ? error.message : "Erreur lors de l'upload de l'image"
        );
    }
}
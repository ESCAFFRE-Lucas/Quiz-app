"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProfileModal } from "./ProfileModal";
import { Edit2 } from "lucide-react";
import { updateUserProfile } from "@/actions/profile";

interface EditProfileButtonProps {
    user: {
        id: string;
        name: string | null;
        email: string;
        image?: string | null;
        bio?: string | null;
    };
    stats: {
        totalQuizzes: number;
        averageScore: number;
        bestAttempt: { score: number; totalQuestions: number } | null;
        totalPoints: number;
    };
}

export function EditProfileButton({ user, stats }: EditProfileButtonProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router = useRouter();

    const handleProfileUpdate = async (data: { name: string; bio: string; image: string }) => {
        try {
            await updateUserProfile(data);
            router.refresh();
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error;
        }
    };

    return (
        <>
            <Button onClick={() => setIsProfileOpen(true)} className="gap-2">
                <Edit2 className="h-4 w-4" />
                Modifier le profil
            </Button>

            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                user={user}
                stats={stats}
                onUpdate={handleProfileUpdate}
            />
        </>
    );
}
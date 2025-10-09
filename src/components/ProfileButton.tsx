"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileModal } from "./ProfileModal";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { User, LogOut, Trophy } from "lucide-react";
import { updateUserProfile } from "@/actions/profile";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface ProfileButtonProps {
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
    onSignOut?: () => void;
}

export function ProfileButton({ user, stats, onSignOut }: ProfileButtonProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router = useRouter();

    const getUserInitials = () => {
        const name = user.name || user.email;
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2 transition-all hover:bg-accent">
                        <div className="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-primary/20">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || "User"}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                    sizes="32px"
                                    quality={85}
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
                                    {getUserInitials()}
                                </div>
                            )}
                        </div>
                        <span className="hidden sm:inline-block font-medium">{user.name || "Utilisateur"}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-primary/20">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || "User"}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                    sizes="32px"
                                    quality={85}
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
                                    {getUserInitials()}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1 leading-none">
                            {user.name && <p className="font-medium text-sm">{user.name}</p>}
                            {user.email && <p className="text-xs text-muted-foreground truncate w-40">{user.email}</p>}
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Mon Profil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/leaderboard")} className="cursor-pointer">
                        <Trophy className="mr-2 h-4 w-4" />
                        Classement
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
                        onClick={() => {
                            if (onSignOut) {
                                onSignOut();
                            } else {
                                signOut({ callbackUrl: "/login" });
                            }
                        }}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Se déconnecter
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

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
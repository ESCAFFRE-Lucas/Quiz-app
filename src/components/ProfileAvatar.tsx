"use client";

import Image from "next/image";
import { Upload } from "lucide-react";

interface ProfileAvatarProps {
    image: string;
    name: string;
    email: string;
    isEditing: boolean;
    isUploading: boolean;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileAvatar({ image, name, email, isEditing, isUploading, onImageUpload }: ProfileAvatarProps) {
    const getUserInitials = () => {
        const displayName = name || email;
        return displayName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative">
                <div className="h-32 w-32 rounded-full border-4 border-primary/20 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                    {image ? (
                        <Image
                            src={image}
                            alt={name || "User avatar"}
                            width={128}
                            height={128}
                            className="object-cover"
                            priority
                            sizes="128px"
                            quality={85}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-white">
                            {getUserInitials()}
                        </div>
                    )}
                </div>

                {isEditing && (
                    <label htmlFor="image-upload" className="absolute bottom-0 right-0">
                        <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-primary/90 shadow-lg transition-all">
                            {isUploading ? (
                                <span className="text-xs">...</span>
                            ) : (
                                <Upload className="h-5 w-5" />
                            )}
                        </div>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={onImageUpload}
                            disabled={isUploading}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            {isUploading && (
                <p className="text-sm text-muted-foreground animate-pulse">Upload en cours...</p>
            )}
        </div>
    );
}
import { useState } from "react";
import { uploadProfileImage } from "@/actions/upload";

interface User {
    name: string | null;
    email: string;
    image?: string | null;
    bio?: string | null;
}

export function useProfileForm(user: User, onUpdate: (data: { name: string; bio: string; image: string }) => Promise<void>) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: user.name || "",
        bio: user.bio || "",
        image: user.image || "",
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const formDataToSend = new FormData();
            formDataToSend.append("file", file);
            const result = await uploadProfileImage(formDataToSend);
            setFormData({ ...formData, image: result.url });
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Erreur lors de l'upload de l'image");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await onUpdate(formData);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Erreur lors de la mise à jour du profil");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user.name || "",
            bio: user.bio || "",
            image: user.image || "",
        });
        setIsEditing(false);
    };

    return {
        isEditing,
        setIsEditing,
        isSaving,
        isUploading,
        formData,
        setFormData,
        handleImageUpload,
        handleSave,
        handleCancel,
    };
}
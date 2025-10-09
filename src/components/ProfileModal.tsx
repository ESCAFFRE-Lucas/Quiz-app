"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit2, Save, X } from "lucide-react";
import { ProfileAvatar } from "./ProfileAvatar";
import { useProfileForm } from "@/hooks/useProfileForm";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
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
    onUpdate: (data: { name: string; bio: string; image: string }) => Promise<void>;
}

export function ProfileModal({ isOpen, onClose, user, stats, onUpdate }: ProfileModalProps) {
    const profile = useProfileForm(user, onUpdate);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Mon Profil</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="profile">Profil</TabsTrigger>
                        <TabsTrigger value="stats">Statistiques</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-6 mt-6">
                        <ProfileAvatar
                            image={profile.formData.image}
                            name={user.name || ""}
                            email={user.email}
                            isEditing={profile.isEditing}
                            isUploading={profile.isUploading}
                            onImageUpload={profile.handleImageUpload}
                        />

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Nom</Label>
                                <Input
                                    id="name"
                                    value={profile.formData.name}
                                    onChange={(e) => profile.setFormData({ ...profile.formData, name: e.target.value })}
                                    disabled={!profile.isEditing}
                                    className="mt-1"
                                    placeholder="Votre nom"
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={user.email} disabled className="mt-1 bg-muted" />
                            </div>

                            <div>
                                <Label htmlFor="bio">Biographie</Label>
                                <Textarea
                                    id="bio"
                                    value={profile.formData.bio}
                                    onChange={(e) => profile.setFormData({ ...profile.formData, bio: e.target.value })}
                                    disabled={!profile.isEditing}
                                    className="mt-1 min-h-[100px]"
                                    placeholder="Parlez-nous de vous..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t">
                            {!profile.isEditing ? (
                                <Button onClick={() => profile.setIsEditing(true)} className="gap-2">
                                    <Edit2 className="h-4 w-4" />
                                    Modifier le profil
                                </Button>
                            ) : (
                                <>
                                    <Button variant="outline" onClick={profile.handleCancel} className="gap-2">
                                        <X className="h-4 w-4" />
                                        Annuler
                                    </Button>
                                    <Button onClick={profile.handleSave} disabled={profile.isSaving} className="gap-2">
                                        <Save className="h-4 w-4" />
                                        {profile.isSaving ? "Enregistrement..." : "Enregistrer"}
                                    </Button>
                                </>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="stats" className="space-y-4 mt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="p-6 text-center bg-blue-500/10 border-blue-500/20">
                                <p className="text-4xl font-bold text-blue-500">{stats.totalQuizzes}</p>
                                <p className="text-sm text-muted-foreground mt-2">Quiz joués</p>
                            </Card>

                            <Card className="p-6 text-center bg-green-500/10 border-green-500/20">
                                <p className="text-4xl font-bold text-green-500">{stats.averageScore}%</p>
                                <p className="text-sm text-muted-foreground mt-2">Score moyen</p>
                            </Card>

                            <Card className="p-6 text-center bg-purple-500/10 border-purple-500/20">
                                <p className="text-4xl font-bold text-purple-500">
                                    {stats.bestAttempt ? `${stats.bestAttempt.score}/${stats.bestAttempt.totalQuestions}` : "-"}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">Meilleur score</p>
                            </Card>

                            <Card className="p-6 text-center bg-orange-500/10 border-orange-500/20">
                                <p className="text-4xl font-bold text-orange-500">{stats.totalPoints}</p>
                                <p className="text-sm text-muted-foreground mt-2">Points totaux</p>
                            </Card>
                        </div>

                        <Card className="p-6 mt-6">
                            <h3 className="font-semibold text-lg mb-4">Niveau et progression</h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-muted-foreground">Niveau actuel</span>
                                        <span className="font-semibold">
                                          Niveau {Math.floor(stats.totalPoints / 100) + 1}
                                        </span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
                                            style={{ width: `${(stats.totalPoints % 100)}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {100 - (stats.totalPoints % 100)} points pour le niveau suivant
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
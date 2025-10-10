"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isOAuthLoading, setIsOAuthLoading] = useState<string | null>(null)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            })

            if (result?.error) {
                setError(result.error)
            } else if (result?.ok) {
                router.push("/")
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue")
        } finally {
            setIsLoading(false)
        }
    }

    const handleOAuthSignIn = async (provider: "github" | "discord") => {
        setIsOAuthLoading(provider)
        setError(null)
        try {
            await signIn(provider, { callbackUrl: "/" })
        } catch (err) {
            setError("Erreur lors de la connexion")
            setIsOAuthLoading(null)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-accent/20 via-background to-accent/10 p-4">
            <div className="w-full max-w-md animate-fadeIn">
                <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
                    <CardHeader className="space-y-2 text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center mb-2">
                            <span className="text-3xl">🎯</span>
                        </div>
                        <CardTitle className="text-3xl font-bold">Connexion</CardTitle>
                        <CardDescription className="text-base">
                            Connectez-vous pour continuer votre aventure
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        <div className="space-y-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-11 text-base font-semibold hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2] transition-all duration-200"
                                onClick={() => handleOAuthSignIn("discord")}
                                disabled={isOAuthLoading !== null}
                            >
                                {isOAuthLoading === "discord" ? (
                                    <span className="flex items-center gap-2">
                                        <span className="inline-block w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                                        Connexion...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                                        </svg>
                                        Continuer avec Discord
                                    </span>
                                )}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-11 text-base font-semibold hover:bg-[#24292F] hover:text-white hover:border-[#24292F] transition-all duration-200"
                                onClick={() => handleOAuthSignIn("github")}
                                disabled={isOAuthLoading !== null}
                            >
                                {isOAuthLoading === "github" ? (
                                    <span className="flex items-center gap-2">
                                        <span className="inline-block w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                                        Connexion...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Github className="w-5 h-5" />
                                        Continuer avec GitHub
                                    </span>
                                )}
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    Ou continuer avec
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="jean@exemple.com"
                                    className="h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="h-11"
                                />
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 animate-fadeIn">
                                    <p className="text-sm text-destructive font-medium">{error}</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isLoading || isOAuthLoading !== null}
                                className="w-full h-11 text-base font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                        Connexion en cours...
                                    </span>
                                ) : (
                                    "Se connecter"
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <div className="text-center text-sm text-muted-foreground">
                            Pas encore de compte ?{" "}
                            <Link
                                href="/register"
                                className="font-semibold text-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
                            >
                                Inscrivez-vous
                            </Link>
                        </div>
                    </CardFooter>
                </Card>

                <p className="text-center text-xs text-muted-foreground mt-6">
                    Besoin d&#39;aide ? Contactez notre support
                </p>
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}
            </style>
        </div>
    )
}
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

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

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

            console.log(result)

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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/20 via-background to-accent/10 p-4">
            <div className="w-full max-w-md opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
                    <CardHeader className="space-y-2 text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center mb-2">
                            <span className="text-3xl">🎯</span>
                        </div>
                        <CardTitle className="text-3xl font-bold">
                            Connexion
                        </CardTitle>
                        <CardDescription className="text-base">
                            Connectez-vous pour continuer votre aventure
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-11 transition-colors duration-200"
                                    placeholder="jean@exemple.com"
                                />
                            </div>

                            <div className="space-y-2 mb-5">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Mot de passe
                                </Label>
                                <Input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-11 transition-colors duration-200"
                                    placeholder="••••••••"
                                />
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 animate-[fadeIn_0.3s_ease-out]">
                                    <p className="text-sm text-destructive font-medium">{error}</p>
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 text-base font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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

                            <div className="text-center text-sm text-muted-foreground">
                                Pas encore de compte?{" "}
                                <Link
                                    href="/register"
                                    className="font-semibold text-foreground hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
                                >
                                    Inscrivez-vous
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>

                <p className="text-center text-xs text-muted-foreground mt-6">
                    Besoin d&#39;aide? Contactez notre support
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
            `}</style>
        </div>
    )
}
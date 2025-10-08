"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { registerUser } from "@/actions/auth"
import { signIn } from "next-auth/react"

export default function RegisterPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const result = await registerUser(email, password, name)

            if (result.success) {
                const signInResult = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                })

                if (signInResult?.error) {
                    setError("Compte créé ! Veuillez vous connecter.")
                    setTimeout(() => router.push("/login"), 2000)
                } else {
                    router.push("/")
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/20 via-background to-accent/10 p-4">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/95 hover:shadow-3xl transition-shadow duration-500">
                    <CardHeader className="space-y-2 text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center mb-2 animate-in zoom-in duration-500 delay-100">
                            <span className="text-3xl">✨</span>
                        </div>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Créer un compte
                        </CardTitle>
                        <CardDescription className="text-base">Rejoignez-nous pour commencer votre aventure quiz</CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-5">
                            <div className="space-y-2 animate-in slide-in-from-left duration-500 delay-200">
                                <Label htmlFor="name" className="text-sm font-medium">
                                    Nom complet
                                </Label>
                                <div className="relative group">
                                    <Input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e: { target: { value: React.SetStateAction<string> } }) => setName(e.target.value)}
                                        required
                                        className="h-11 transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-primary/50"
                                        placeholder="Jean Dupont"
                                    />
                                    <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                                </div>
                            </div>

                            <div className="space-y-2 animate-in slide-in-from-left duration-500 delay-300">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </Label>
                                <div className="relative group">
                                    <Input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e: { target: { value: React.SetStateAction<string> } }) => setEmail(e.target.value)}
                                        required
                                        className="h-11 transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-primary/50"
                                        placeholder="jean@exemple.com"
                                    />
                                    <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                                </div>
                            </div>

                            <div className="space-y-2 animate-in slide-in-from-left duration-500 delay-400 mb-5">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Mot de passe
                                </Label>
                                <div className="relative group">
                                    <Input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e: { target: { value: React.SetStateAction<string> } }) => setPassword(e.target.value)}
                                        required
                                        className="h-11 transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-border/50 focus:border-primary/50"
                                        placeholder="••••••••"
                                    />
                                    <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <p className="text-sm text-destructive font-medium">{error}</p>
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed animate-in slide-in-from-bottom duration-500 delay-500"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Inscription en cours...
                  </span>
                                ) : (
                                    "S'inscrire"
                                )}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground animate-in fade-in duration-500 delay-600">
                                Déjà un compte?{" "}
                                <Link
                                    href="/login"
                                    className="font-semibold text-foreground hover:text-primary transition-colors duration-300 hover:underline underline-offset-4"
                                >
                                    Se connecter
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>

                <p className="text-center text-xs text-muted-foreground mt-6 animate-in fade-in duration-500 delay-700">
                    En vous inscrivant, vous acceptez nos conditions d&#39;utilisation
                </p>
            </div>
        </div>
    )
}

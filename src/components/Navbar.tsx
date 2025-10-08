"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { User, Trophy, Home, LogOut, Menu } from "lucide-react"

interface NavbarProps {
    userName?: string | null
    userEmail?: string | null
    onSignOut?: () => void
}

export function Navbar({ userName, userEmail, onSignOut }: NavbarProps) {
    const pathname = usePathname()

    const navLinks = [
        { href: "/", label: "Accueil", icon: Home },
        { href: "/leaderboard", label: "Classement", icon: Trophy },
    ]

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname.startsWith(href)
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-3 items-center h-16 gap-4">
                    <div className="flex justify-start">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 transition-transform hover:scale-105">
                                <span className="text-2xl font-bold text-white">Q</span>
                            </div>
                            <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QuizMaster
              </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center justify-center space-x-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon
                            return (
                                <Link key={link.href} href={link.href}>
                                    <Button
                                        variant={isActive(link.href) ? "secondary" : "ghost"}
                                        className={cn("gap-2 transition-all duration-300", isActive(link.href) && "bg-secondary shadow-sm")}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {link.label}
                                    </Button>
                                </Link>
                            )
                        })}
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                {navLinks.map((link) => {
                                    const Icon = link.icon
                                    return (
                                        <DropdownMenuItem key={link.href} asChild>
                                            <Link href={link.href} className="flex items-center gap-2 cursor-pointer">
                                                <Icon className="h-4 w-4" />
                                                {link.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    )
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="gap-2 transition-all hover:bg-accent">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 transition-transform hover:scale-110">
                                        <User className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="hidden sm:inline-block font-medium">{userName || "Utilisateur"}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <div className="flex items-center justify-start gap-2 p-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex flex-col space-y-1 leading-none">
                                        {userName && <p className="font-medium text-sm">{userName}</p>}
                                        {userEmail && <p className="text-xs text-muted-foreground truncate w-40">{userEmail}</p>}
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        Mon Profil
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/leaderboard" className="cursor-pointer">
                                        <Trophy className="mr-2 h-4 w-4" />
                                        Classement
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
                                    onClick={onSignOut}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Se déconnecter
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    )
}

import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'Thank you Mario! But our princess is in another castle!',
}

export default function GlobalNotFound() {
    return (
        <html lang="fr">
            <body className={inter.className}>
                <main className="flex min-h-screen flex-col items-center justify-center p-24">
                    <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
                    <p className="mt-4 text-xl">Thank you Mario! But our princess is in another castle!</p>
                    <Link href="/" className="mt-6 text-blue-500 hover:underline">Go save her !</Link>
                </main>
            </body>
        </html>
    )
}
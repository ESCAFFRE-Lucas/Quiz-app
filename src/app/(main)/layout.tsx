import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Navbar } from "@/components/Navbar";
import React from "react";

export default async function MainLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions);

    return (
        <>
            <Navbar
                userName={session?.user?.name}
                userEmail={session?.user?.email}
            />
            {children}
        </>
    );
}
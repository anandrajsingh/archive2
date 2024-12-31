"use client"

import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import Link from "next/link"

export const Navbar = () => {
    const pathname = usePathname()
    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div>
                <Button asChild variant={pathname === "/settings" ? "default" : "outline"}>
                    <Link href="/dashboard/settings">
                    Settings
                    </Link>
                </Button>
            </div>
        </nav>
    )
}
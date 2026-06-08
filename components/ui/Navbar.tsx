"use client"

import Link from "next/link"
import { Book, Menu, User, Bell } from "lucide-react"
import { Button } from "./Button"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <Book className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">BookStore <span className="text-primary text-sm font-normal">Admin</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-primary" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-linear-to-tr from-primary to-indigo-600 flex items-center justify-center text-primary-foreground font-medium text-sm">
            JD
          </div>
        </div>
      </div>
    </nav>
  )
}

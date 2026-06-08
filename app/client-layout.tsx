"use client"

import type React from "react"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { BookProvider } from "@/lib/context"
import { Navbar } from "@/components/ui/Navbar"
import { Sidebar } from "@/components/ui/Sidebar"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/login" || pathname === "/register"

  useEffect(() => {
    const originalError = console.error
    console.error = (...args: any[]) => {
      if (
        typeof args[0] === "string" &&
        (args[0].includes("Hydration failed") ||
          args[0].includes("hydrated but some attributes") ||
          args[0].includes("did not match"))
      ) {
        return
      }
      originalError.call(console, ...args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  if (isAuthPage) {
    return (
      <>
        <BookProvider>{children}</BookProvider>
      </>
    )
  }

  return (
    <>
      <BookProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 bg-muted/20">
              {children}
            </main>
          </div>
        </div>
      </BookProvider>
    </>
  )
}


"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  ShoppingBag,
  BarChart3
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: BookOpen, label: "Inventory", href: "/inventory" },
  { icon: ShoppingBag, label: "Orders", href: "/orders" },
  { icon: Users, label: "Customers", href: "/customers" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex h-[calc(100vh-4rem)] w-64 flex-col border-r bg-muted/30 p-4">
      <div className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </div>
      <div className="mt-auto pt-4 border-t">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <button
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all mt-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}

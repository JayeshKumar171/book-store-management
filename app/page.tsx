"use client"

import { useBooks } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { BookOpen, Users, ShoppingBag, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"
import { BookTable } from "@/components/book-table"

export default function Dashboard() {
  const { books, isLoading } = useBooks()

  const stats = [
    { title: "Total Books", value: books.length, icon: BookOpen, color: "text-blue-600", description: "+12% from last month" },
    { title: "Active Readers", value: "1.2k", icon: Users, color: "text-green-600", description: "+5% from last week" },
    { title: "Total Orders", value: "450", icon: ShoppingBag, color: "text-purple-600", description: "+18% from last month" },
    { title: "Revenue", value: "$12.5k", icon: TrendingUp, color: "text-orange-600", description: "+22% from last month" },
  ]

  // Get recent books (last 5)
  const recentBooks = books.slice(-5).reverse()

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your bookstore.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">{stat.description.split(' ')[0]}</span> {stat.description.split(' ').slice(1).join(' ')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Inventory</CardTitle>
              <CardDescription>Recently added books in your collection.</CardDescription>
            </div>
            <Link href="/inventory" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
             <BookTable books={recentBooks} isLoading={isLoading} onEdit={() => {}} onDelete={() => {}} />
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/inventory" className="flex items-center p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="font-medium">Add New Book</div>
                <div className="text-sm text-muted-foreground">Expand your collection</div>
              </div>
            </Link>
            <Link href="/orders" className="flex items-center p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-4">
                <ShoppingBag className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="font-medium">Manage Orders</div>
                <div className="text-sm text-muted-foreground">Process pending shipments</div>
              </div>
            </Link>
            <Link href="/customers" className="flex items-center p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="font-medium">View Customers</div>
                <div className="text-sm text-muted-foreground">Manage your reader base</div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

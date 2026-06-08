"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/Input"

export default function CustomersPage() {
  const customers = [
    { name: "Alice Johnson", email: "alice@example.com", joined: "2023-12-01", orders: 12 },
    { name: "Bob Smith", email: "bob@example.com", joined: "2024-01-15", orders: 5 },
    { name: "Charlie Brown", email: "charlie@example.com", joined: "2024-02-10", orders: 8 },
    { name: "Diana Prince", email: "diana@example.com", joined: "2024-03-05", orders: 2 },
  ]

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Customers</h1>
          <p className="text-muted-foreground">Manage your customer base and their activity.</p>
        </div>
        <div className="relative w-64">
           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
           <Input placeholder="Search customers..." className="pl-8" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer) => (
          <Card key={customer.email} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <CardTitle className="text-base">{customer.name}</CardTitle>
                  <CardDescription className="text-xs">{customer.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-muted-foreground">Joined</span>
                <span className="font-medium">{customer.joined}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">Total Orders</span>
                <span className="font-medium">{customer.orders}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

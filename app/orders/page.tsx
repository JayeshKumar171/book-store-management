"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "lucide-react" // Using badge-like Badge if it exists, otherwise I'll just use a div

export default function OrdersPage() {
  const orders = [
    { id: "ORD001", customer: "Alice Johnson", date: "2024-03-20", total: "$45.99", status: "Delivered" },
    { id: "ORD002", customer: "Bob Smith", date: "2024-03-19", total: "$12.50", status: "Processing" },
    { id: "ORD003", customer: "Charlie Brown", date: "2024-03-18", total: "$89.00", status: "Shipped" },
    { id: "ORD004", customer: "Diana Prince", date: "2024-03-18", total: "$23.40", status: "Delivered" },
  ]

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Orders</h1>
        <p className="text-muted-foreground">Monitor and manage customer orders.</p>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>A list of recent orders from your bookstore.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium">{order.id}</td>
                    <td className="p-4 align-middle">{order.customer}</td>
                    <td className="p-4 align-middle">{order.date}</td>
                    <td className="p-4 align-middle">{order.total}</td>
                    <td className="p-4 align-middle">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" :
                        order.status === "Processing" ? "bg-blue-100 text-blue-700" :
                        "bg-orange-100 text-orange-700"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

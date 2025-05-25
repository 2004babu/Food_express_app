"use client"

import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import { Separator } from "../ui/separator"

const orders = [
  {
    id: "ORD-1234",
    date: "May 15, 2023",
    restaurant: "Pizza Paradise",
    status: "Delivered",
    total: 27.98,
    address: "123 Main St, Apt 4B, New York, NY 10001",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 12.99 },
      { name: "Pepperoni Pizza", quantity: 1, price: 14.99 },
    ],
  },
  {
    id: "ORD-5678",
    date: "May 10, 2023",
    restaurant: "Burger Bliss",
    status: "Delivered",
    total: 21.98,
    address: "123 Main St, Apt 4B, New York, NY 10001",
    items: [
      { name: "Classic Burger", quantity: 1, price: 9.99 },
      { name: "Cheese Burger", quantity: 1, price: 11.99 },
    ],
  },
  {
    id: "ORD-9012",
    date: "May 5, 2023",
    restaurant: "Sushi Sensation",
    status: "Delivered",
    total: 35.98,
    address: "123 Main St, Apt 4B, New York, NY 10001",
    items: [
      { name: "California Roll", quantity: 1, price: 16.99 },
      { name: "Salmon Nigiri", quantity: 1, price: 18.99 },
    ],
  },
]

export default function OrdersList() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(orderId)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <Button>Browse Restaurants</Button>
        </div>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{order.restaurant}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{order.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2 sm:mt-0">
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    <span className="font-semibold">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 flex items-start">
                    <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{order.address}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toggleOrderDetails(order.id)} className="ml-2">
                    {expandedOrder === order.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="bg-gray-50 p-4">
                  <h4 className="font-semibold mb-2">Order Details</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <div>
                          <span className="font-medium">{item.quantity}x </span>
                          <span>{item.name}</span>
                        </div>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      Track Order
                    </Button>
                    <Button variant="outline" size="sm">
                      Reorder
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

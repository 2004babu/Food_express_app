import OrdersList from "../components/orders/OrdersList"
import { Suspense } from "react"

export default function Orders() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      <Suspense
        fallback={
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 animate-pulse bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        }
      >
        <OrdersList />
      </Suspense>
    </div>
  )
}

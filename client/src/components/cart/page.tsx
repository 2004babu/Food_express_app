import { Suspense } from "react"
import CartContent from "./cart-content"
import { Skeleton } from "../ui/skeleton"

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Food Cart</h1>
      <Suspense
        fallback={
          <div className="space-y-6">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-[300px] md:col-span-2 rounded-lg" />
              <Skeleton className="h-[300px] rounded-lg" />
            </div>
          </div>
        }
      >
        <CartContent />
      </Suspense>
    </div>
  )
}

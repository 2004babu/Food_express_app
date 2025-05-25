
import { useState, useEffect } from "react"
import CartItem from "../cart/cart-item"
import CartSummary from "../cart/cart-summary"
import EmptyCart from "../cart/empty-cart"
import { Button } from "../ui/button"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

// Types
export interface CartItemType {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  options?: {
    color?: string
    size?: string
  }
}

export default function CartContent() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Simulate fetching cart data
  useEffect(() => {
    // In a real app, you would fetch from an API or state management store
    const fetchCart = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const cartItemStorage: CartItemType[] = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems") || "") : []
      // Sample data
      // const sampleCartItems: CartItemType[] = [
      //   {
      //     id: "1",
      //     name: "Premium Wireless Headphones",
      //     price: 129.99,
      //     image: "/placeholder.svg?height=200&width=200",
      //     quantity: 1,
      //     options: {
      //       color: "Black",
      //       size: "Standard",
      //     },
      //   },
      //   {
      //     id: "2",
      //     name: "Ergonomic Laptop Stand",
      //     price: 49.99,
      //     image: "/placeholder.svg?height=200&width=200",
      //     quantity: 2,
      //   },
      //   {
      //     id: "3",
      //     name: "Ultra HD Smart Monitor",
      //     price: 349.99,
      //     image: "/placeholder.svg?height=200&width=200",
      //     quantity: 1,
      //     options: {
      //       size: "27 inch",
      //     },
      //   },
      // ]

      if (cartItemStorage.length === 0) {
        setIsLoading(false)
        return

      }
      setCartItems(cartItemStorage)
      setIsLoading(false)
    }

    fetchCart()
  }, [])

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))

    const updatedCartItems = cartItems.filter((item) => item.id !== id)
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))

  }

  // Clear entire cart
  const clearCart = () => {
    if (confirm("Are you sure you want to clear the cart?")) {
      setCartItems([])
      localStorage.removeItem("cartItems")
      return
      
    }
    return
  }

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax rate
  const shipping = subtotal > 100 ? 0 : 10 // Free shipping over $100
  const total = subtotal + tax + shipping

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Shopping Cart ({cartItems.length} items)</h2>
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500 hover:text-red-700">
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="divide-y">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} updateQuantity={updateQuantity} removeItem={removeItem} />
            ))}
          </div>

          <div className="p-6 border-t">
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Continue Shopping
                </Link>
              </Button>
              <Button variant={'link'} className="bg-primary hover:bg-primary/90 cursor-pointer" onClick={() => navigate("/checkout")}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <CartSummary subtotal={subtotal} tax={tax} shipping={shipping} total={total} />

        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-2">
              <ShoppingBag size={18} className="mt-0.5 text-gray-500" />
              <div>
                <p className="font-medium">Shipping & Delivery</p>
                <p className="text-gray-500">Free shipping on orders over $100</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 text-gray-500"
              >
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                <line x1="4" x2="4" y1="22" y2="15"></line>
              </svg>
              <div>
                <p className="font-medium">Returns & Exchanges</p>
                <p className="text-gray-500">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

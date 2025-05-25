"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

interface CartSummaryProps {
  subtotal: number
  tax: number
  shipping: number
  total: number
}

export default function CartSummary({ subtotal, tax, shipping, total }: CartSummaryProps) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          {shipping === 0 ? <span className="text-green-600">Free</span> : <span>${shipping.toFixed(2)}</span>}
        </div>

        {shipping === 0 && <div className="text-xs text-green-600 italic">Free shipping applied to your order!</div>}

        <Separator className="my-2" />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Button className="w-full mt-6 bg-primary hover:bg-primary/90" onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </Button>

      <div className="mt-4 text-xs text-center text-gray-500">
        <p>Taxes and shipping calculated at checkout</p>
        <div className="flex justify-center space-x-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="20"
            viewBox="0 0 32 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-400"
          >
            <rect width="32" height="20" rx="2" fill="white" stroke="currentColor" />
            <circle cx="11" cy="10" r="4" fill="#EB001B" stroke="none" />
            <circle cx="21" cy="10" r="4" fill="#F79E1B" stroke="none" />
            <path
              d="M16 6C17.3132 7.31322 18 9.11622 18 11C18 12.8838 17.3132 14.6868 16 16C14.6868 14.6868 14 12.8838 14 11C14 9.11622 14.6868 7.31322 16 6Z"
              fill="#FF5F00"
              stroke="none"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="20"
            viewBox="0 0 32 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-400"
          >
            <rect width="32" height="20" rx="2" fill="white" stroke="currentColor" />
            <path d="M11 14H13V6H11V14Z" fill="#0077A6" stroke="none" />
            <path
              d="M21 10C21 12.2091 19.2091 14 17 14C14.7909 14 13 12.2091 13 10C13 7.79086 14.7909 6 17 6C19.2091 6 21 7.79086 21 10Z"
              fill="#0077A6"
              stroke="none"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="20"
            viewBox="0 0 32 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-400"
          >
            <rect width="32" height="20" rx="2" fill="white" stroke="currentColor" />
            <path d="M22 10.92V14H20V11.3L16 6H18L20.5 9.4L23 6H25L22 10.92Z" fill="#172B85" stroke="none" />
            <path d="M10 6H8V14H10V6Z" fill="#172B85" stroke="none" />
            <path
              d="M16 10.2C16 12.3 14.3 14 12.2 14H8V6H12.2C14.3 6 16 7.7 16 9.8V10.2Z"
              fill="#FFB600"
              stroke="none"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

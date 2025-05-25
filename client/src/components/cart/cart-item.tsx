
import type React from "react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Trash, Minus, Plus, Edit, Check, X } from "lucide-react"
import type { CartItemType } from "./cart-content"
import { Badge } from "../ui/badge"

interface CartItemProps {
  item: CartItemType
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
}

export default function CartItem({ item, updateQuantity, removeItem }: CartItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number.parseInt(e.target.value)
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity)
    }
  }

  const handleUpdateQuantity = () => {
    updateQuantity(item.id, quantity)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setQuantity(item.quantity)
    setIsEditing(false)
  }

  const incrementQuantity = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    updateQuantity(item.id, newQuantity)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      updateQuantity(item.id, newQuantity)
    }
  }

  return (
    <div className="p-6 flex flex-col sm:flex-row gap-4 hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0 relative w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
        <img src={item.image || "/placeholder.svg"} alt={item.name}  className="object-cover" />
      </div>

      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <div className="mt-1 flex flex-wrap gap-1">
              {item.options?.color && (
                <Badge variant="outline" className="text-xs">
                  Color: {item.options.color}
                </Badge>
              )}
              {item.options?.size && (
                <Badge variant="outline" className="text-xs">
                  Size: {item.options.size}
                </Badge>
              )}
            </div>
          </div>
          <div className="mt-2 sm:mt-0 text-lg font-semibold">${item.price.toFixed(2)}</div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input type="number" min="1" value={quantity} onChange={handleQuantityChange} className="w-16 h-8" />
                <Button size="icon" variant="ghost" onClick={handleUpdateQuantity} className="h-8 w-8 text-green-600">
                  <Check size={16} />
                </Button>
                <Button size="icon" variant="ghost" onClick={handleCancelEdit} className="h-8 w-8 text-red-600">
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={decrementQuantity}
                  className="h-8 w-8 rounded-r-none"
                  disabled={quantity <= 1}
                >
                  <Minus size={14} />
                </Button>
                <div className="h-8 px-3 flex items-center justify-center border-y border-input">{quantity}</div>
                <Button size="icon" variant="outline" onClick={incrementQuantity} className="h-8 w-8 rounded-l-none">
                  <Plus size={14} />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)} className="h-8 w-8 ml-2">
                  <Edit size={14} />
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm font-medium">
              Subtotal: <span className="font-semibold">${(item.price * quantity).toFixed(2)}</span>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeItem(item.id)}
              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

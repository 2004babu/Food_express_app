"use client"

import { useState } from "react"
import { Button } from "../ui/button"

const categories = [
  { id: 1, name: "All", icon: "🍽️" },
  { id: 2, name: "Pizza", icon: "🍕" },
  { id: 3, name: "Burger", icon: "🍔" },
  { id: 4, name: "Sushi", icon: "🍣" },
  { id: 5, name: "Indian", icon: "🍛" },
  { id: 6, name: "Chinese", icon: "🥡" },
  { id: 7, name: "Italian", icon: "🍝" },
  { id: 8, name: "Dessert", icon: "🍰" },
]

export default function FoodCategories() {
  const [activeCategory, setActiveCategory] = useState(1)

  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className="flex items-center gap-2 whitespace-nowrap"
            onClick={() => setActiveCategory(category.id)}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

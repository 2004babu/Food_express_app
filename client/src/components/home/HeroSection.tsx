"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="relative flex flex-row h-[500px] w-full bg-gradient-to-r from-orange-500 to-red-600">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative w-full z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
          Delicious Food, Delivered To Your Door
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
          Order from your favorite restaurants with just a few clicks
        </p>
        <form onSubmit={handleSearch} className="w-full max-w-md flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search for food or restaurants..."
              className="pl-10 py-6 bg-white text-black w-full rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white py-6">
            Search
          </Button>
        </form>
      </div>
    </div>
  )
}

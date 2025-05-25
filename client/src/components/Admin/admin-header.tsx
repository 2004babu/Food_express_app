"use client"

import { Button } from "../ui/button"
import { Bell, User, LogOut } from "lucide-react"
import {Link} from "react-router-dom"

export default function AdminHeader() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          FoodExpress Admin
        </Link>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">admin@foodexpress.com</p>
            </div>
          </div>

          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

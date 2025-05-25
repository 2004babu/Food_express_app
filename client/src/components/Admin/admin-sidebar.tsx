"use client"

import type React from "react"

import { useState } from "react"
import {Link} from "react-router-dom"
// import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { LayoutDashboard, Store, ShoppingBag, Users, Settings, ChevronRight, ChevronDown } from "lucide-react"

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: { title: string; href: string }[]
}

export default function AdminSidebar() {
//   const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Restaurants",
      href: "/admin/restaurants",
      icon: <Store className="h-5 w-5" />,
      submenu: [
        { title: "All Restaurants", href: "/admin/restaurants" },
        { title: "Add New", href: "/admin/newrestaurants/" },
      ],
    },
    {
      title: "Orders",
      href: "/orders",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(title)
    }
  }

  return (
    <aside className="w-64 bg-white border-r min-h-[calc(100vh-64px)] p-4 hidden md:block">
      <nav className="space-y-1">
        {sidebarItems.map((item) => (
          <div key={item.title}>
            {item.submenu ? (
              <div>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-between",
                     "bg-orange-50 text-orange-600",
                  )}
                  onClick={() => toggleSubmenu(item.title)}
                >
                  <span className="flex items-center">
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </span>
                  {openSubmenu === item.title ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
                {openSubmenu === item.title && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link key={subitem.title}  to={subitem.href}>
                        <Button 
                          variant="ghost"
                          className={cn(
                            "w-full justify-start",
                             "bg-orange-50 text-orange-600",
                          )}
                        >
                          <span className="ml-3">{subitem.title}</span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link to={item.href}>
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start",  "bg-orange-50 text-orange-600")}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Button>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}

"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../ui/button"

const SidebarContext = React.createContext<{
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}>({
  isOpen: true,
  setIsOpen: () => undefined,
})

export function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="grid lg:grid-cols-[auto_1fr]">{children}</div>
    </SidebarContext.Provider>
  )
}

export function Sidebar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = React.useContext(SidebarContext)

  return (
    <aside
      className={cn(
        "border-r bg-background transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-14",
        className,
      )}
      {...props}
    >
      <div className="flex h-full flex-col gap-2">{children}</div>
    </aside>
  )
}

export function SidebarHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header className={cn("flex h-14 items-center border-b px-3", className)} {...props}>
      {children}
    </header>
  )
}

export function SidebarContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <nav className={cn("flex-1 overflow-auto px-1 py-2", className)} {...props}>
      {children}
    </nav>
  )
}

export function SidebarFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <footer className={cn("flex items-center border-t p-3", className)} {...props}>
      {children}
    </footer>
  )
}

export function SidebarGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pb-4", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarMenu({ className, children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("grid gap-1 px-2", className)} {...props}>
      {children}
    </ul>
  )
}

export function SidebarMenuItem({ className, children, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={cn("", className)} {...props}>
      {children}
    </li>
  )
}

const sidebarMenuButtonVariants = cva("flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium", {
  variants: {
    variant: {
      default: "bg-transparent hover:bg-accent hover:text-accent-foreground",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-9",
      sm: "h-8",
      lg: "h-10",
    },
    isActive: {
      true: "bg-accent text-accent-foreground",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    isActive: false,
  },
})

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
}

export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, variant, size, isActive, asChild = false, children, ...props }, ref) => {
    const { isOpen } = React.useContext(SidebarContext)

    if (!isOpen) {
      return (
        <Button variant="ghost" size="icon" className={cn("h-9 w-9", className)} {...props} ref={ref}>
          {React.isValidElement(children) && React.Children.toArray(children)[0]}
        </Button>
      )
    }

    const Comp = asChild ? React.Fragment : "button"
    return (
      <Comp>
        <button className={cn(sidebarMenuButtonVariants({ variant, size, isActive, className }))} ref={ref} {...props}>
          {children}
        </button>
      </Comp>
    )
  },
)
SidebarMenuButton.displayName = "SidebarMenuButton"

export function SidebarMenuSub({ className, children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  const { isOpen } = React.useContext(SidebarContext)

  if (!isOpen) {
    return null
  }

  return (
    <ul className={cn("grid gap-1 pl-4", className)} {...props}>
      {children}
    </ul>
  )
}

export function SidebarMenuSubItem({ className, children, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={cn("", className)} {...props}>
      {children}
    </li>
  )
}

const sidebarMenuSubButtonVariants = cva("flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium", {
  variants: {
    variant: {
      default: "bg-transparent hover:bg-accent hover:text-accent-foreground",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    },
    isActive: {
      true: "bg-accent text-accent-foreground",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    isActive: false,
  },
})

interface SidebarMenuSubButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuSubButtonVariants> {
  asChild?: boolean
}

export const SidebarMenuSubButton = React.forwardRef<HTMLButtonElement, SidebarMenuSubButtonProps>(
  ({ className, variant, isActive, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    return (
      <Comp>
        <button className={cn(sidebarMenuSubButtonVariants({ variant, isActive, className }))} ref={ref} {...props}>
          {children}
        </button>
      </Comp>
    )
  },
)
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { isOpen, setIsOpen } = React.useContext(SidebarContext)

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9", className)}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      <span className="sr-only">{isOpen ? "Close" : "Open"} sidebar</span>
    </Button>
  )
}

export function SidebarInset({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarRail({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen, setIsOpen } = React.useContext(SidebarContext)

  return (
    <div
      className={cn(
        "absolute right-0 top-0 h-full w-1 -translate-x-1/2 cursor-ew-resize bg-transparent transition-all",
        className,
      )}
      onDoubleClick={() => setIsOpen(!isOpen)}
      {...props}
    />
  )
}

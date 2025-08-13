"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { CartSidebar } from "@/components/cart-sidebar"
import { Store, Search, User } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Store className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">ShopSmart</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Products</Button>
          <Button variant="ghost">Categories</Button>
          <Button variant="ghost">About</Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>
          <CartSidebar />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

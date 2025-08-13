"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Package } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "/premium-wireless-headphones.png",
    rating: 4.8,
    reviews: 124,
    stock: 15,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "/smart-fitness-watch.png",
    rating: 4.6,
    reviews: 89,
    stock: 8,
    category: "Wearables",
  },
  {
    id: 3,
    name: "Organic Coffee Beans",
    price: 24.99,
    image: "/organic-coffee-beans-bag.png",
    rating: 4.9,
    reviews: 256,
    stock: 42,
    category: "Food",
  },
  {
    id: 4,
    name: "Minimalist Desk Lamp",
    price: 89.99,
    image: "/minimalist-desk-lamp.png",
    rating: 4.7,
    reviews: 67,
    stock: 23,
    category: "Home",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "/placeholder-3g20u.png",
    rating: 4.5,
    reviews: 143,
    stock: 31,
    category: "Electronics",
  },
  {
    id: 6,
    name: "Yoga Mat Pro",
    price: 49.99,
    image: "/premium-yoga-mat.png",
    rating: 4.8,
    reviews: 198,
    stock: 19,
    category: "Fitness",
  },
]

export function ProductGrid() {
  const { addToCart } = useCart()
  const [filter, setFilter] = useState("All")

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))]
  const filteredProducts = filter === "All" ? products : products.filter((p) => p.category === filter)

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Discover our curated selection of premium products
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <Badge className="absolute top-4 left-4">{product.category}</Badge>
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2">
                  <Package className={`h-4 w-4 ${product.stock < 10 ? "text-red-500" : "text-green-500"}`} />
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                  <span className={`text-sm ${product.stock < 10 ? "text-red-500" : "text-green-500"}`}>
                    {product.stock} in stock
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button className="w-full" onClick={() => addToCart(product)} disabled={product.stock === 0}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

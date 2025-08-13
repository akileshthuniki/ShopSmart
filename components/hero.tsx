import { Button } from "@/components/ui/button"
import { ShoppingBag, Truck, Shield, Star } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Shop Smart, Ship Fast</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover amazing products with intelligent pricing, location-based shipping, and real-time inventory
            management. Your perfect shopping experience awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-3">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
              View Categories
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg">
                <Truck className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Fast Shipping</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Location-based rates</p>
            </div>
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Secure Checkout</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Smart price calculation</p>
            </div>
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg">
                <Star className="h-8 w-8 text-yellow-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Loyalty Points</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Regional bonuses</p>
            </div>
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg">
                <ShoppingBag className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Live Inventory</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Real-time stock</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

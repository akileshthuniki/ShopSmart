import { ProductGrid } from "@/components/product-grid"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <ProductGrid />
    </div>
  )
}

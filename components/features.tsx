import { Calculator, MapPin, Package, Gift } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Calculator,
      title: "Smart Price Calculator",
      description: "Automatic calculation of item price + tax + shipping based on your location",
      color: "text-blue-600",
    },
    {
      icon: MapPin,
      title: "Location Detection",
      description: "Detect customer location for regional tax rates and shipping zones",
      color: "text-green-600",
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Real-time stock tracking across multiple warehouse locations",
      color: "text-purple-600",
    },
    {
      icon: Gift,
      title: "Loyalty Rewards",
      description: "Earn points on purchases with location-based bonus promotions",
      color: "text-orange-600",
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Powerful E-Commerce Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Built with modern microservices architecture for scalable, reliable shopping experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <feature.icon className={`h-12 w-12 ${feature.color} mx-auto`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

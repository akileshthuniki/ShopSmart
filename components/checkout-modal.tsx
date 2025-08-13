"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calculator, CreditCard } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

interface LocationData {
  customer_ip: string
  city: string
  region: string
  country: string
  tax_rate: number
  shipping_zone: string
}

interface PriceBreakdown {
  subtotal: number
  tax: number
  shipping: number
  total: number
  breakdown: string
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, getTotalPrice, clearCart } = useCart()
  const [location, setLocation] = useState<LocationData | null>(null)
  const [pricing, setPricing] = useState<PriceBreakdown | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    zipCode: "",
  })

  // Simulate location detection API call
  useEffect(() => {
    if (isOpen) {
      detectLocation()
    }
  }, [isOpen])

  // Recalculate pricing when location changes
  useEffect(() => {
    if (location && items.length > 0) {
      calculatePricing()
    }
  }, [location, items])

  const detectLocation = async () => {
    // Simulate API call to /whoami endpoint
    setTimeout(() => {
      const mockLocation: LocationData = {
        customer_ip: "192.168.1.1",
        city: "San Francisco",
        region: "CA",
        country: "US",
        tax_rate: 0.0875, // 8.75% CA tax
        shipping_zone: "West Coast",
      }
      setLocation(mockLocation)
    }, 1000)
  }

  const calculatePricing = async () => {
    if (!location) return

    const subtotal = getTotalPrice()
    const tax = subtotal * location.tax_rate
    const shipping = calculateShipping(subtotal, location.shipping_zone)
    const total = subtotal + tax + shipping

    const breakdown = `Subtotal: $${subtotal.toFixed(2)} + Tax (${(location.tax_rate * 100).toFixed(2)}%): $${tax.toFixed(2)} + Shipping: $${shipping.toFixed(2)} = Total: $${total.toFixed(2)}`

    setPricing({
      subtotal,
      tax,
      shipping,
      total,
      breakdown,
    })
  }

  const calculateShipping = (subtotal: number, zone: string): number => {
    const baseRate = 9.99
    const weightSurcharge = items.length * 2.5 // $2.50 per item
    const zoneMultiplier = zone === "West Coast" ? 1.0 : zone === "East Coast" ? 1.2 : 1.5

    if (subtotal > 100) return 0 // Free shipping over $100
    return (baseRate + weightSurcharge) * zoneMultiplier
  }

  const handleCheckout = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      alert("Order placed successfully! Thank you for your purchase.")
      clearCart()
      setIsProcessing(false)
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Checkout
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Location Detection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5" />
                Location Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              {location ? (
                <div className="space-y-2">
                  <p>
                    <strong>Detected Location:</strong> {location.city}, {location.region}, {location.country}
                  </p>
                  <p>
                    <strong>IP Address:</strong> {location.customer_ip}
                  </p>
                  <p>
                    <strong>Tax Rate:</strong> {(location.tax_rate * 100).toFixed(2)}%
                  </p>
                  <p>
                    <strong>Shipping Zone:</strong> {location.shipping_zone}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Detecting your location for tax and shipping calculation...</p>
              )}
            </CardContent>
          </Card>

          {/* Price Calculation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5" />
                Price Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pricing ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length} items):</span>
                    <span>${pricing.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({(location!.tax_rate * 100).toFixed(2)}%):</span>
                    <span>${pricing.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping ({location!.shipping_zone}):</span>
                    <span>{pricing.shipping === 0 ? "FREE" : `$${pricing.shipping.toFixed(2)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${pricing.total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{pricing.breakdown}</p>
                </div>
              ) : (
                <p className="text-gray-500">Calculating prices...</p>
              )}
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  placeholder="123 Main St"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                    placeholder="San Francisco"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={customerInfo.zipCode}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, zipCode: e.target.value })}
                    placeholder="94102"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Checkout Button */}
          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleCheckout}
              disabled={!pricing || isProcessing || !customerInfo.name || !customerInfo.email}
              className="flex-1"
            >
              {isProcessing ? "Processing..." : `Place Order - $${pricing?.total.toFixed(2) || "0.00"}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

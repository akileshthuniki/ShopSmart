import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { base_rate = 9.99, weight_surcharge = 0, distance_fee = 0, destination_zone = "Standard" } = body

    const total_shipping = base_rate + weight_surcharge + distance_fee
    const breakdown = `Base Rate: $${base_rate.toFixed(2)} + Weight: $${weight_surcharge.toFixed(2)} + Distance: $${distance_fee.toFixed(2)} = $${total_shipping.toFixed(2)}`

    // Zone-based multipliers
    const zoneMultipliers = {
      "West Coast": 1.0,
      "East Coast": 1.2,
      Central: 1.1,
      International: 2.5,
      Standard: 1.0,
    }

    const multiplier = zoneMultipliers[destination_zone as keyof typeof zoneMultipliers] || 1.0
    const final_cost = total_shipping * multiplier

    return NextResponse.json({
      base_rate,
      weight_surcharge,
      distance_fee,
      destination_zone,
      zone_multiplier: multiplier,
      shipping_cost: Number.parseFloat(final_cost.toFixed(2)),
      breakdown: `${breakdown} × ${multiplier} (${destination_zone}) = $${final_cost.toFixed(2)}`,
      estimated_delivery: getEstimatedDelivery(destination_zone),
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}

function getEstimatedDelivery(zone: string): string {
  const deliveryTimes = {
    "West Coast": "1-2 business days",
    "East Coast": "2-3 business days",
    Central: "2-3 business days",
    International: "7-14 business days",
    Standard: "3-5 business days",
  }

  return deliveryTimes[zone as keyof typeof deliveryTimes] || "3-5 business days"
}

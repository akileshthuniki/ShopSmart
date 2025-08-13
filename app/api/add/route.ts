import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { item_price, tax_amount, shipping_amount = 0 } = body

    if (typeof item_price !== "number" || typeof tax_amount !== "number") {
      return NextResponse.json({ error: "Invalid input: item_price and tax_amount must be numbers" }, { status: 400 })
    }

    const total = item_price + tax_amount + shipping_amount
    const breakdown = `Item: $${item_price.toFixed(2)} + Tax: $${tax_amount.toFixed(2)} + Shipping: $${shipping_amount.toFixed(2)} = $${total.toFixed(2)}`

    return NextResponse.json({
      total: Number.parseFloat(total.toFixed(2)),
      breakdown,
      components: {
        item_price,
        tax_amount,
        shipping_amount,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}

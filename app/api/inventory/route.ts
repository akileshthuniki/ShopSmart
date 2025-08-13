import { type NextRequest, NextResponse } from "next/server"

// Mock inventory data
const inventory = [
  { id: 1, name: "Premium Wireless Headphones", stock: 15, warehouse: "West Coast" },
  { id: 2, name: "Smart Fitness Watch", stock: 8, warehouse: "East Coast" },
  { id: 3, name: "Organic Coffee Beans", stock: 42, warehouse: "Central" },
  { id: 4, name: "Minimalist Desk Lamp", stock: 23, warehouse: "West Coast" },
  { id: 5, name: "Bluetooth Speaker", stock: 31, warehouse: "East Coast" },
  { id: 6, name: "Yoga Mat Pro", stock: 19, warehouse: "Central" },
]

export async function GET() {
  return NextResponse.json({
    inventory,
    total_items: inventory.reduce((sum, item) => sum + item.stock, 0),
    warehouses: Array.from(new Set(inventory.map((item) => item.warehouse))),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product_id, quantity_to_add, warehouse_location } = body

    const item = inventory.find((item) => item.id === product_id)
    if (!item) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const old_stock = item.stock
    item.stock += quantity_to_add

    if (warehouse_location) {
      item.warehouse = warehouse_location
    }

    return NextResponse.json({
      product_id,
      product_name: item.name,
      old_stock,
      quantity_added: quantity_to_add,
      new_stock: item.stock,
      warehouse: item.warehouse,
      message: `Added ${quantity_to_add} units to ${item.name}. Stock updated from ${old_stock} to ${item.stock}`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}

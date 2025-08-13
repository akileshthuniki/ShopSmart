import { type NextRequest, NextResponse } from "next/server"

// Mock customer loyalty data
const loyaltyAccounts = new Map([
  ["customer1", { points: 1250, tier: "Gold", region: "West Coast" }],
  ["customer2", { points: 750, tier: "Silver", region: "East Coast" }],
  ["customer3", { points: 2500, tier: "Platinum", region: "Central" }],
])

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customer_id, purchase_amount, bonus_points = 0, customer_region = "Standard" } = body

    // Calculate base points (1 point per dollar)
    const base_points = Math.floor(purchase_amount)

    // Regional bonus multipliers
    const regionalBonuses = {
      "West Coast": 1.2,
      "East Coast": 1.1,
      Central: 1.15,
      International: 1.0,
      Standard: 1.0,
    }

    const regional_multiplier = regionalBonuses[customer_region as keyof typeof regionalBonuses] || 1.0
    const regional_bonus = Math.floor(base_points * (regional_multiplier - 1))
    const total_points_earned = base_points + regional_bonus + bonus_points

    // Get or create customer account
    const account = loyaltyAccounts.get(customer_id) || { points: 0, tier: "Bronze", region: customer_region }
    const old_points = account.points
    account.points += total_points_earned
    account.region = customer_region

    // Update tier based on total points
    if (account.points >= 2000) account.tier = "Platinum"
    else if (account.points >= 1000) account.tier = "Gold"
    else if (account.points >= 500) account.tier = "Silver"
    else account.tier = "Bronze"

    loyaltyAccounts.set(customer_id, account)

    return NextResponse.json({
      customer_id,
      purchase_amount,
      points_breakdown: {
        base_points,
        regional_bonus,
        bonus_points,
        total_earned: total_points_earned,
      },
      account_summary: {
        old_points,
        new_points: account.points,
        current_tier: account.tier,
        region: account.region,
      },
      regional_multiplier,
      message: `Added ${total_points_earned} points to ${customer_id}. Account updated from ${old_points} to ${account.points} points (${account.tier} tier)`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const customer_id = searchParams.get("customer_id")

  if (customer_id) {
    const account = loyaltyAccounts.get(customer_id)
    if (!account) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }
    return NextResponse.json({ customer_id, ...account })
  }

  // Return all accounts summary
  const summary = Array.from(loyaltyAccounts.entries()).map(([id, account]) => ({
    customer_id: id,
    ...account,
  }))

  return NextResponse.json({
    total_customers: loyaltyAccounts.size,
    customers: summary,
  })
}

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { eventId } = body

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      )
    }

    // Check if event exists and has capacity
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: {
            registrations: true,
          },
        },
      },
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    const spotsLeft = event.capacity - event._count.registrations
    if (spotsLeft <= 0) {
      return NextResponse.json({ error: "Event is full" }, { status: 400 })
    }

    // Check if user already registered
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId: session.user.id,
          eventId: eventId,
        },
      },
    })

    if (existingRegistration) {
      return NextResponse.json(
        { error: "Already registered for this event" },
        { status: 400 }
      )
    }

    // Create registration and payment record
    const payhereOrderId = `ORDER_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`

    const registration = await prisma.registration.create({
      data: {
        userId: session.user.id,
        eventId: eventId,
        payment: {
          create: {
            userId: session.user.id,
            amount: event.price,
            status: "PENDING",
            payhereOrderId: payhereOrderId,
          },
        },
      },
      include: {
        payment: true,
      },
    })

    // Generate PayHere hash
    const merchantId = process.env.PAYHERE_MERCHANT_ID || "YOUR_MERCHANT_ID"
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET || "YOUR_MERCHANT_SECRET"

    const hashedSecret = crypto
      .createHash("md5")
      .update(merchantSecret)
      .digest("hex")
      .toUpperCase()

    const amountFormatted = parseFloat(event.price.toString()).toFixed(2)
    const hashString = `${merchantId}${payhereOrderId}${amountFormatted}LKR${hashedSecret}`

    const hash = crypto
      .createHash("md5")
      .update(hashString)
      .digest("hex")
      .toUpperCase()

    return NextResponse.json({
      message: "Registration created successfully",
      registration,
      payment: registration.payment,
      hash,
      user: {
        name: session.user.name,
        email: session.user.email,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    )
  }
}

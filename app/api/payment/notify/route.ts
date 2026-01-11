import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: Request) {
  try {
    const body = await req.formData()

    const merchantId = body.get("merchant_id") as string
    const orderId = body.get("order_id") as string
    const paymentId = body.get("payment_id") as string
    const payhereAmount = body.get("payhere_amount") as string
    const payhereCurrency = body.get("payhere_currency") as string
    const statusCode = body.get("status_code") as string
    const md5sig = body.get("md5sig") as string

    // Verify the hash
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET || "YOUR_MERCHANT_SECRET"
    const hashedSecret = crypto
      .createHash("md5")
      .update(merchantSecret)
      .digest("hex")
      .toUpperCase()

    const localMd5sig = crypto
      .createHash("md5")
      .update(
        `${merchantId}${orderId}${payhereAmount}${payhereCurrency}${statusCode}${hashedSecret}`
      )
      .digest("hex")
      .toUpperCase()

    if (localMd5sig !== md5sig) {
      console.error("Payment verification failed: Hash mismatch")
      return NextResponse.json(
        { error: "Invalid payment verification" },
        { status: 400 }
      )
    }

    // Find the payment record
    const payment = await prisma.payment.findUnique({
      where: {
        payhereOrderId: orderId,
      },
    })

    if (!payment) {
      console.error("Payment not found:", orderId)
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    // Update payment status based on status code
    let paymentStatus: "COMPLETED" | "FAILED" | "PENDING" = "PENDING"

    if (statusCode === "2") {
      paymentStatus = "COMPLETED"
    } else if (statusCode === "-1" || statusCode === "-2" || statusCode === "-3") {
      paymentStatus = "FAILED"
    }

    await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: paymentStatus,
        transactionId: paymentId,
        paymentMethod: body.get("method") as string,
      },
    })

    console.log(`Payment ${orderId} updated to ${paymentStatus}`)

    return NextResponse.json({ message: "Payment notification processed" })
  } catch (error) {
    console.error("Payment notification error:", error)
    return NextResponse.json(
      { error: "Payment notification processing failed" },
      { status: 500 }
    )
  }
}

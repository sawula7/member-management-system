"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Event {
  id: string
  title: string
  price: any
}

interface RegistrationFormProps {
  event: Event
  userId: string
}

declare global {
  interface Window {
    payhere: {
      onCompleted: (orderId: string) => void
      onDismissed: () => void
      onError: (error: string) => void
      startPayment: (payment: any) => void
    }
  }
}

export default function RegistrationForm({ event, userId }: RegistrationFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handlePayment = async () => {
    setLoading(true)
    setError("")

    try {
      // Create registration and payment record
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Registration failed")
        setLoading(false)
        return
      }

      // Initialize PayHere payment
      const paymentData = {
        sandbox: true, // Set to false for production
        merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID || "YOUR_MERCHANT_ID",
        return_url: `${window.location.origin}/payment/success`,
        cancel_url: `${window.location.origin}/payment/cancel`,
        notify_url: `${window.location.origin}/api/payment/notify`,
        order_id: data.payment.payhereOrderId,
        items: event.title,
        amount: event.price.toString(),
        currency: "LKR",
        first_name: data.user.name.split(" ")[0] || "Guest",
        last_name: data.user.name.split(" ")[1] || "",
        email: data.user.email,
        phone: "0000000000",
        address: "N/A",
        city: "Colombo",
        country: "Sri Lanka",
        hash: data.hash,
      }

      if (typeof window !== "undefined" && window.payhere) {
        window.payhere.onCompleted = function (orderId: string) {
          console.log("Payment completed. OrderID:", orderId)
          router.push(`/payment/success?orderId=${orderId}`)
        }

        window.payhere.onDismissed = function () {
          console.log("Payment dismissed")
          setLoading(false)
        }

        window.payhere.onError = function (error: string) {
          console.log("Payment Error:", error)
          setError("Payment failed. Please try again.")
          setLoading(false)
        }

        window.payhere.startPayment(paymentData)
      } else {
        // Fallback for development/testing
        console.log("PayHere not loaded, simulating payment...")
        setTimeout(() => {
          router.push(`/payment/success?orderId=${data.payment.payhereOrderId}`)
        }, 1000)
      }
    } catch (error) {
      console.error("Registration error:", error)
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="border-t border-gray-200 pt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Payment Information
      </h3>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">Event Registration</span>
          <span className="font-semibold">LKR {event.price.toString()}</span>
        </div>
        <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-blue-600">
            LKR {event.price.toString()}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-4">
          By clicking "Proceed to Payment", you will be redirected to PayHere's
          secure payment gateway to complete your transaction.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Secure Payment</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ SSL encrypted connection</li>
            <li>✓ PCI DSS compliant</li>
            <li>✓ Multiple payment options</li>
          </ul>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handlePayment}
          disabled={loading}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  )
}

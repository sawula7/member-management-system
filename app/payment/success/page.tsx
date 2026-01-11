import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string }
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-2">
            Your payment has been processed successfully.
          </p>
          {searchParams.orderId && (
            <p className="text-sm text-gray-500 mb-8">
              Order ID: {searchParams.orderId}
            </p>
          )}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-green-900 mb-2">
              Registration Confirmed
            </h2>
            <p className="text-green-800 text-sm">
              You have been successfully registered for the event. A confirmation
              email has been sent to your email address.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/events"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Browse More Events
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

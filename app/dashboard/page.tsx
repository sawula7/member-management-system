import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Navbar from "@/components/Navbar"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  // Fetch user's registrations
  const registrations = await prisma.registration.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      event: true,
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  })

  // Fetch upcoming events
  const upcomingEvents = await prisma.event.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: "asc",
    },
    take: 3,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session.user.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Role: <span className="font-medium">{session.user.role}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Registrations</h3>
            <p className="text-3xl font-bold text-blue-600">
              {registrations.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Upcoming Events</h3>
            <p className="text-3xl font-bold text-green-600">
              {upcomingEvents.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Account Status</h3>
            <p className="text-xl font-bold text-gray-900">Active</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                My Recent Registrations
              </h2>
            </div>
            <div className="p-6">
              {registrations.length === 0 ? (
                <p className="text-gray-500">No registrations yet.</p>
              ) : (
                <ul className="space-y-4">
                  {registrations.map((registration) => (
                    <li
                      key={registration.id}
                      className="border-l-4 border-blue-500 pl-4"
                    >
                      <h3 className="font-semibold text-gray-900">
                        {registration.event.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(registration.event.date).toLocaleDateString()}
                      </p>
                      <span
                        className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                          registration.payment?.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : registration.payment?.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {registration.payment?.status || "No Payment"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
            </div>
            <div className="p-6">
              {upcomingEvents.length === 0 ? (
                <p className="text-gray-500">No upcoming events.</p>
              ) : (
                <ul className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <li
                      key={event.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(event.date).toLocaleDateString()} - {event.location}
                      </p>
                      <p className="text-sm font-medium text-blue-600 mt-2">
                        LKR {event.price.toString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href="/events"
                className="block mt-6 text-center text-blue-600 hover:text-blue-700 font-medium"
              >
                View All Events →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

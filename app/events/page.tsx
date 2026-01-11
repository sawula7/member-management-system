import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Navbar from "@/components/Navbar"
import EventCard from "@/components/EventCard"

export default async function EventsPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  // Fetch all upcoming events
  const events = await prisma.event.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      registrations: {
        where: {
          userId: session.user.id,
        },
      },
      _count: {
        select: {
          registrations: true,
        },
      },
    },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
          <p className="text-gray-600 mt-2">
            Browse and register for upcoming events
          </p>
        </div>

        {events.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">No upcoming events at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isRegistered={event.registrations.length > 0}
                registrationCount={event._count.registrations}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

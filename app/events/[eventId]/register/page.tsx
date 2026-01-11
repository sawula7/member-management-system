import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Navbar from "@/components/Navbar"
import RegistrationForm from "@/components/RegistrationForm"

export default async function EventRegistrationPage({
  params,
}: {
  params: { eventId: string }
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const event = await prisma.event.findUnique({
    where: {
      id: params.eventId,
    },
    include: {
      _count: {
        select: {
          registrations: true,
        },
      },
    },
  })

  if (!event) {
    redirect("/events")
  }

  // Check if user already registered
  const existingRegistration = await prisma.registration.findUnique({
    where: {
      userId_eventId: {
        userId: session.user.id,
        eventId: event.id,
      },
    },
  })

  if (existingRegistration) {
    redirect("/dashboard")
  }

  const spotsLeft = event.capacity - event._count.registrations
  const isFull = spotsLeft <= 0

  if (isFull) {
    redirect("/events")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Event Registration</h1>
            <p className="text-blue-100">Complete your registration and payment</p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {event.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Date:</span>{" "}
                  <span className="text-gray-600">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Location:</span>{" "}
                  <span className="text-gray-600">{event.location}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Price:</span>{" "}
                  <span className="text-gray-600">
                    LKR {event.price.toString()}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Spots Left:</span>{" "}
                  <span className="text-gray-600">{spotsLeft}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>

            <RegistrationForm event={event} userId={session.user.id} />
          </div>
        </div>
      </main>
    </div>
  )
}

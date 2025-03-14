"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {Calendar} from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns"
import { cn } from "@/lib/utils"
import AddEventModal, { type EventType } from "@/components/ui/AddEventModal"

interface EventCalendarProps {
  className?: string
}
function EventCalendar({ className }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [events, setEvents] = useState<EventType[]>([])

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("events")
    if (storedEvents) {
      try {
        const parsedEvents = JSON.parse(storedEvents).map((event: any) => ({
          ...event,
          date: new Date(event.date),
        }))
        setEvents(parsedEvents)
      } catch (error) {
        console.error("Failed to parse events from localStorage:", error)
      }
    }
  }, [])

  const handleEventAdd = (event: EventType) => {
    const newEvents = [...events, event]
    setEvents(newEvents)
    // Save to localStorage
    localStorage.setItem("events", JSON.stringify(newEvents))
    setIsModalOpen(false)
    setSelectedDate(undefined)
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.date), date))
  }

  const getDaysArray = () => {
    const start = startOfMonth(currentDate)
    const end = endOfMonth(currentDate)
    const days = eachDayOfInterval({ start, end })

    // Get the day of the week for the first day (0-6, 0 = Sunday)
    const firstDayOfWeek = start.getDay()

    // Add days from previous month
    const prevMonthDays = []
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push(new Date(start.getFullYear(), start.getMonth(), -i))
    }

    // Add days from next month
    const lastDayOfWeek = end.getDay()
    const nextMonthDays = []
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
      nextMonthDays.push(new Date(end.getFullYear(), end.getMonth() + 1, i))
    }

    return [...prevMonthDays, ...days, ...nextMonthDays]
  }

  return (
    <>
      <Card className={cn("w-full", className)}>
        <CardHeader className="flex bg-white  flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl">Event Calendar</CardTitle>
          <div className="flex items-center bg-white space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{format(currentDate, "MMMM yyyy")}</span>
            <Button variant="ghost" size="icon" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="bg-white pt-1">
          <div className="grid grid-cols-7 bg-emerald--200 text-center text-sm mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="font-medium py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 bg-emerald--200 gap-px text-center">
            {getDaysArray().map((date, i) => {
              const isCurrentMonth = isSameMonth(date, currentDate)
              const dayEvents = getEventsForDate(date)
              const hasEvent = dayEvents.length > 0

              return (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedDate(date)
                    setIsModalOpen(true)
                  }}
                  className={cn(
                    "p-2 relative hover:bg-gray-100 transition-colors h-16 sm:h-20",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
                    !isCurrentMonth && "text-muted-foreground",
                    isCurrentMonth && "hover:bg-muted cursor-pointer",
                    hasEvent && "font-medium",
                    isSameDay(date, selectedDate) && "bg-primary/10",
                  )}
                >
                  <span
                    className={cn(
                      "text-sm flex justify-center",
                      isSameDay(date, new Date()) &&
                        "h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto",
                    )}
                  >
                    {date.getDate()}
                  </span>
                  <div className="mt-1 flex flex-col items-center gap-1 max-h-10 overflow-hidden">
                    {dayEvents.map((event, idx) => (
                      idx < 2 && (
                        <div
                          key={event.id}
                          className={cn(
                            "w-full text-xs px-1 py-0.5 text-center truncate rounded",
                            event.type === "event" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800",
                          )}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      )
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add Event Modal */}
      <AddEventModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialDate={selectedDate}
        onEventAdd={handleEventAdd}
      />
    </>
  )
}
export {EventCalendar}


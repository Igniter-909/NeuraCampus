"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Updated interface to match the provided event format
interface EventType {
  id: string;
  title: string;
  description: string;
  date: string; // Changed from eventDate to date
  time: string; // Changed from startTime/endTime to time
  location: string;
  type: string; // Changed to string to match the format
  ticketsSold: number;
  totalTickets: number;
  status: string;
}

interface EventCalendarProps {
  className?: string;
  events?: EventType[];
  onDateSelect?: (date: Date) => void;
  disableDateClick?: boolean; // New prop to disable date click behavior
}

function EventCalendar({ 
  className, 
  events = [], 
  onDateSelect,
  disableDateClick = false // Default to false
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>()
  console.log("my events in calender : ", events);

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date) // Changed from eventDate to date
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const handleDateClick = (date: Date) => {
    if (disableDateClick) return; // Skip if date click is disabled
    
    setSelectedDate(date)
    if (onDateSelect) {
      onDateSelect(date)
    }
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

  // Helper function to get event color based on type
  const getEventColor = (type: string) => {
    switch (type) {
      case 'academic':
        return "bg-blue-500 text-blue-50";
      case 'cultural':
        return "bg-purple-500 text-purple-50";
      case 'sports':
        return "bg-green-500 text-green-50";
      case 'placement':
        return "bg-yellow-500 text-yellow-50";
      case 'seminar':
        return "bg-red-500 text-red-50";
      case 'workshop':
        return "bg-indigo-500 text-indigo-50";
      case 'event':
        return "bg-blue-500 text-blue-50"; // Default color for 'event' type
      default:
        return "bg-gray-500 text-gray-50";
    }
  }

  // Render event tooltip content
  const renderEventTooltip = (event: EventType) => {
    return (
      <div className="p-2 max-w-xs">
        <h3 className="font-semibold text-sm">{event.title}</h3>
        <div className="mt-1 space-y-1 text-xs">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{event.location}</span>
          </div>
          <p className="text-xs mt-1 line-clamp-2">{event.description}</p>
        </div>
      </div>
    )
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">Calendar</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {format(currentDate, "MMMM yyyy")}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
              {day}
            </div>
          ))}
          {getDaysArray().map((date, i) => {
            const isCurrentMonth = isSameMonth(date, currentDate)
            const dayEvents = getEventsForDate(date)
            const hasEvent = dayEvents.length > 0
            const isToday = isSameDay(date, new Date())
            const isSelected = selectedDate && isSameDay(date, selectedDate)

            return (
              <div
                key={i}
                onClick={() => handleDateClick(date)}
                className={cn(
                  "relative h-24 p-2 border border-gray-200 dark:border-gray-700 rounded-lg",
                  !disableDateClick && "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
                  !isCurrentMonth && "text-gray-400 dark:text-gray-500",
                  isToday && "ring-2 ring-blue-500",
                  isSelected && "bg-blue-50 dark:bg-blue-900/20"
                )}
              >
                <span className={cn(
                  "text-sm",
                  isCurrentMonth ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
                )}>
                  {date.getDate()}
                </span>
                {hasEvent && (
                  <div className="absolute bottom-1 left-1 right-1 flex flex-col gap-1 max-h-16 overflow-hidden">
                    {dayEvents.map((event, index) => (
                      <TooltipProvider key={event.id || index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "text-xs px-1 py-0.5 rounded truncate",
                                getEventColor(event.type)
                              )}
                            >
                              {event.title}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="p-0">
                            {renderEventTooltip(event)}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export { EventCalendar }


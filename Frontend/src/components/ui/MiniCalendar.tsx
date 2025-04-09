"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek
} from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Updated Event interface to match API response structure
interface Event {
  id?: string;
  _id?: string;
  date?: Date;
  eventDate?: string;
  title?: string;
  name?: string;
  description?: string;
  location?: string;
  eventPdf?: string;
}

interface MiniCalendarProps {
  className?: string;
  events?: Event[];
  onDateSelect?: (date: Date, events: Event[]) => void;
  onViewAllEvents?: () => void;
}

export default function MiniCalendar({ 
  className, 
  events = [], 
  onDateSelect, 
  onViewAllEvents 
}: MiniCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Get all dates for the current month view
  const getDaysArray = () => {
    const start = startOfMonth(currentDate)
    const end = endOfMonth(currentDate)
    
    // Calculate days from the start of the week containing the first day of the month
    const calendarStart = startOfWeek(start)
    
    // Calculate days until the end of the week containing the last day of the month
    const calendarEnd = endOfWeek(end)
    
    // Get all days between start and end dates
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  }

  // Check if a date has any events
  const hasEventsOnDate = (date: Date): boolean => {
    return getEventsForDate(date).length > 0;
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date): Event[] => {
    return events.filter(event => {
      const eventDate = event.eventDate 
        ? new Date(event.eventDate) 
        : (event.date ? new Date(event.date) : null);
      
      return eventDate && isSameDay(eventDate, date);
    });
  }

  // Handle date click - view events on this date
  const handleDateClick = (date: Date) => {
    // Only respond to clicks on dates with events
    const dateEvents = getEventsForDate(date);
    if (dateEvents.length > 0) {
      setSelectedDate(date);
      if (onDateSelect) {
        onDateSelect(date, dateEvents);
      }
    }
  }

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  return (
    <Card className={cn("w-full overflow-hidden", className, "shadow-xl border-0 bg-white/95 backdrop-blur-sm")}>
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b border-gray-100">
        <CardTitle className="text-lg font-bold text-gray-900">
          {format(currentDate, "MMMM yyyy")}
        </CardTitle>
        <div className="flex items-center space-x-1">
          <button
            onClick={goToPreviousMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Day headers */}
        <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 border-b border-gray-100">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 text-center">
          {getDaysArray().map((date, i) => {
            const isCurrentMonth = isSameMonth(date, currentDate)
            const isToday = isSameDay(date, new Date())
            const isSelected = selectedDate ? isSameDay(date, selectedDate) : false
            const hasEvents = hasEventsOnDate(date)
            const eventsCount = getEventsForDate(date).length
            
            return (
              <div
                key={i}
                className={cn(
                  "h-12 w-full flex flex-col items-center justify-center relative text-sm",
                  !isCurrentMonth && "text-gray-300",
                  isCurrentMonth && !isToday && !isSelected && "text-gray-800",
                  isToday && !isSelected && "bg-blue-50 text-blue-600 font-medium",
                  isSelected && "bg-blue-500 text-white font-medium",
                  hasEvents ? "cursor-pointer hover:bg-gray-50" : ""
                )}
                onClick={hasEvents ? () => handleDateClick(date) : undefined}
              >
                <span>{date.getDate()}</span>
                {hasEvents && (
                  <div className="absolute bottom-1 flex gap-0.5 items-center justify-center">
                    {eventsCount > 3 ? (
                      <span 
                        className={cn(
                          "text-[10px] font-medium",
                          isSelected ? "text-white" : "text-blue-500"
                        )}
                      >
                        {eventsCount}
                      </span>
                    ) : (
                      Array(eventsCount).fill(0).map((_, idx) => (
                        <span 
                          key={idx}
                          className={cn(
                            "w-1 h-1 rounded-full",
                            isSelected ? "bg-white" : "bg-blue-500"
                          )}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {/* View all events link */}
        {onViewAllEvents && (
          <div className="p-2 border-t border-gray-100">
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onViewAllEvents();
              }}
              className="text-xs text-blue-600 hover:text-blue-800 transition-colors flex justify-center items-center py-1"
            >
              View All Events
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 
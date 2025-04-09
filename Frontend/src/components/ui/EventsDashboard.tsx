"use client"

import { useState, useEffect } from "react"
import { isSameDay } from "date-fns"
import MiniCalendar from "@/components/ui/MiniCalendar"
import UpcomingEvents from "@/components/ui/UpcomingEvents"
import { cn } from "@/lib/utils"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calendar, MapPin, Clock } from "lucide-react"

// Updated Event type to match API response
interface EventType {
  id?: string;
  _id?: string;
  title?: string;
  name?: string;
  date?: Date;
  eventDate?: string;
  time?: string;
  location?: string;
  description?: string;
  type?: 'event' | 'ticket-sale';
  ticketInfo?: {
    isPaid: boolean;
    price: number;
    totalTickets: number;
    soldTickets: number;
  };
  ticketsSold?: number;
  totalTickets?: number;
  status?: 'upcoming' | 'ongoing' | 'completed';
  college?: string;
  isPublic?: boolean;
  media?: {
    gallery: string[];
  };
  attendees?: string[];
  eventPdf?: string;
}

interface EventsDashboardProps {
  className?: string;
  events?: EventType[];
  onAddEvent?: () => void;
  onViewAllEvents?: () => void;
}

export default function EventsDashboard({
  className,
  events = [],
  onAddEvent,
  onViewAllEvents
}: EventsDashboardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>(events)
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  // Filter events when selected date changes
  useEffect(() => {
    if (selectedDate) {
      const filtered = events.filter(event => {
        const eventDate = event.eventDate 
          ? new Date(event.eventDate) 
          : (event.date ? new Date(event.date) : null);
        
        return eventDate && isSameDay(eventDate, selectedDate);
      });
      setFilteredEvents(filtered);
    } else {
      // If no date selected, show upcoming events (future dates)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const upcoming = events
        .filter(event => {
          const eventDate = event.eventDate 
            ? new Date(event.eventDate) 
            : (event.date ? new Date(event.date) : null);
          
          return eventDate && eventDate >= today;
        })
        .sort((a, b) => {
          const dateA = a.eventDate 
            ? new Date(a.eventDate) 
            : (a.date ? new Date(a.date) : new Date());
          
          const dateB = b.eventDate 
            ? new Date(b.eventDate) 
            : (b.date ? new Date(b.date) : new Date());
          
          return dateA.getTime() - dateB.getTime();
        })
        .slice(0, 5); // Limit to 5 events
      
      setFilteredEvents(upcoming);
    }
  }, [selectedDate, events]);

  // Handle date selection with events
  const handleDateSelect = (date: Date, dateEvents: EventType[]) => {
    setSelectedDate(date);
    setFilteredEvents(dateEvents);
  }

  // Handle "View More" click
  const handleViewMore = () => {
    setSelectedDate(null); // Reset date filter
    if (onViewAllEvents) {
      onViewAllEvents();
    }
  }

  // Handle event click to show details
  const handleEventClick = (event: EventType) => {
    setSelectedEvent(event);
    setDetailsOpen(true);
  }

  // Handle PDF download
  const handleDownloadPdf = (event: EventType) => {
    if (event.eventPdf) {
      // Create a URL for the PDF and trigger download
      window.open(event.eventPdf, '_blank');
    }
  }

  // Format date for display
  const formatEventDate = (date: Date | string | undefined) => {
    if (!date) return "No date";
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  return (
    <>
      <div className={cn("grid gap-6 md:grid-cols-1 lg:grid-cols-3", className)}>
        <div className="lg:col-span-1">
          <MiniCalendar 
            events={events}
            onDateSelect={handleDateSelect}
            onViewAllEvents={onViewAllEvents}
            className="h-full"
          />
        </div>
        <div className="lg:col-span-2">
          <UpcomingEvents 
            events={filteredEvents}
            onViewMore={handleViewMore}
            onAddEvent={onAddEvent}
            className="h-full"
            onEventClick={handleEventClick}
          />
        </div>
      </div>

      {/* Event Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedEvent?.name || selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            {/* Date */}
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Date</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {formatEventDate(selectedEvent?.eventDate || selectedEvent?.date)}
                </p>
              </div>
            </div>
            
            {/* Description */}
            {selectedEvent?.description && (
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Description</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>
            )}
            
            {/* Location */}
            {selectedEvent?.location && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Location</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedEvent.location}
                  </p>
                </div>
              </div>
            )}
            
            {/* Time */}
            {selectedEvent?.time && (
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Time</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedEvent.time}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            {selectedEvent?.eventPdf && (
              <Button 
                onClick={() => selectedEvent && handleDownloadPdf(selectedEvent)}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => setDetailsOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 
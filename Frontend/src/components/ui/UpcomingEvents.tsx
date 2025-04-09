import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Ticket, ChevronRight, MoreVertical, Edit, Trash2, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { eventApi } from "@/services/event"
import { useToast } from "@/components/ui/use-toast"
import EditEventModal from "./EditEventModal"

// Adapt this interface to match your API response structure
interface Event {
  id?: string
  _id?: string
  title?: string
  name?: string
  date?: Date
  eventDate?: string
  time?: string
  location?: string
  description?: string
  type?: 'event' | 'ticket-sale'
  ticketInfo?: {
    isPaid: boolean
    price: number
    totalTickets: number
    soldTickets: number
  }
  ticketsSold?: number
  totalTickets?: number
  status?: 'upcoming' | 'ongoing' | 'completed'
  college?: string
  eventPdf?: string
}

interface UpcomingEventsProps {
  events: Event[]
  onViewMore?: () => void
  onAddEvent?: () => void
  onEventClick?: (event: Event) => void
  onDeleteEvent?: (event: Event) => void
  onEventUpdated?: (event: Event) => void
  className?: string
}

export default function UpcomingEvents({ 
  events, 
  onViewMore, 
  onAddEvent,
  onEventClick,
  onDeleteEvent,
  onEventUpdated,
  className 
}: UpcomingEventsProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const [editModalOpen, setEditModalOpen] = useState(false)

  // Function to format the date nicely
  const formatEventDate = (date: Date | string | undefined) => {
    if (!date) return { day: "--", month: "--" };
    
    const eventDate = typeof date === "string" ? new Date(date) : date;
    return {
      day: eventDate.getDate(),
      month: eventDate.toLocaleString('default', { month: 'short' })
    };
  };

  // Process events to normalize the data structure and limit to 5 events
  const normalizedEvents = events
    .map(event => ({
      id: event._id || event.id || '',
      title: event.name || event.title || 'Untitled Event',
      date: event.eventDate ? new Date(event.eventDate) : event.date,
      time: event.time || undefined,
      location: event.location || undefined,
      description: event.description || undefined,
      type: event.type || 'event',
      ticketsSold: event.ticketInfo?.soldTickets || event.ticketsSold || 0,
      totalTickets: event.ticketInfo?.totalTickets || event.totalTickets || 0,
      status: event.status || 'upcoming',
      eventPdf: event.eventPdf || undefined
    }))
    .slice(0, 5); // Limit to 5 events

  // Handle event click
  const handleEventClick = (event: Event) => {
    if (onEventClick) {
      onEventClick(event);
    }
  };

  // Handle edit event
  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event)
    setEditModalOpen(true)
  };

  // Handle event updated
  const handleEventUpdated = (updatedEvent: Event) => {
    if (onEventUpdated) {
      onEventUpdated(updatedEvent);
      
      // Force a re-render by updating the state
      setSelectedEvent(null);
      setEditModalOpen(false);
      
      toast({
        title: "Success",
        children: "Event updated successfully",
      });
    }
  };

  // Handle delete event
  const handleDeleteEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowDeleteDialog(true);
  };

  // Confirm delete event
  const confirmDeleteEvent = async () => {
    if (!selectedEvent) return;
    
    try {
      setIsDeleting(true);
      const eventId = selectedEvent._id || selectedEvent.id;
      
      if (!eventId) {
        toast({
          title: "Error",
          children: "Event ID not found",
          variant: "destructive",
        });
        return;
      }
      
      await eventApi.deleteEvent(eventId);
      
      toast({
        title: "Success",
        children: "Event deleted successfully",
      });
      
      // Call the onDeleteEvent callback if provided
      if (onDeleteEvent) {
        onDeleteEvent(selectedEvent);
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast({
        title: "Error",
        children: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
      setSelectedEvent(null);
    }
  };

  return (
    <>
      <Card className={cn(className, "dark:bg-gray-800/90 overflow-hidden border-0 shadow-xl bg-white/95 backdrop-blur-sm")}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-700/30">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600">
            Upcoming Events
          </CardTitle>
          <Link 
            href="/events"
            onClick={e => {
              e.preventDefault();
              onViewMore?.();
            }}
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors group"
          >
            View More
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100 dark:divide-gray-800/20">
            {normalizedEvents.length > 0 ? normalizedEvents.map((event, index) => {
              const { day, month } = formatEventDate(event.date);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative p-4 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-b from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/10 shadow-sm overflow-hidden flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-300 leading-none mt-1">{day}</span>
                        <span className="text-xs font-medium text-blue-500 dark:text-blue-400 mt-0.5 uppercase">{month}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors truncate pr-2">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={
                              event.status === 'upcoming' ? 'default' :
                              event.status === 'ongoing' ? 'secondary' : 'outline'
                            }
                            className="capitalize text-xs py-0.5 px-2.5 bg-blue-500/10 text-blue-700 dark:bg-blue-800/20 dark:text-blue-300 border border-blue-200 dark:border-blue-800/30 font-medium rounded-full"
                          >
                            {event.status}
                          </Badge>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
                              >
                                <MoreVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem 
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => handleEventClick(event)}
                              >
                                <Eye className="h-4 w-4 text-blue-500" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => handleEditEvent(event)}
                              >
                                <Edit className="h-4 w-4 text-amber-500" />
                                <span>Edit Event</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400"
                                onClick={() => handleDeleteEvent(event)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete Event</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-3">
                        {event.time && (
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3.5 h-3.5 mr-1 text-blue-400 dark:text-blue-500" />
                            <span>{event.time}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <MapPin className="w-3.5 h-3.5 mr-1 text-blue-400 dark:text-blue-500" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.description && (
                          <div className="flex items-start text-xs text-gray-500 dark:text-gray-400 w-full mt-1">
                            <span className="line-clamp-1">{event.description}</span>
                          </div>
                        )}
                        {event.type === 'ticket-sale' && (
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Ticket className="w-3.5 h-3.5 mr-1 text-blue-400 dark:text-blue-500" />
                            <span>{event.ticketsSold}/{event.totalTickets} tickets sold</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle highlight indicator on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-blue-500 dark:group-hover:bg-blue-600 transition-colors"></div>
                </motion.div>
              );
            }) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                <p>No upcoming events</p>
                <p className="text-sm mt-1">Schedule an event to see it here</p>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl py-2.5 shadow-md shadow-blue-500/10 hover:shadow-blue-600/20 transition-all dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700"
              onClick={onAddEvent}
            >
              + New Events
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-white dark:bg-gray-900 border-0 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Delete Event</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this event? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 text-white border-0"
              onClick={confirmDeleteEvent}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Deleting...</span>
                </div>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Event Modal */}
      {selectedEvent && (
        <EditEventModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          event={selectedEvent}
          onEventUpdated={handleEventUpdated}
        />
      )}
    </>
  )
}

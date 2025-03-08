import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Ticket } from "lucide-react"
import { motion } from "framer-motion"

interface Event {
  id: string
  title: string
  date: Date
  time?: string
  location?: string
  type: 'event' | 'ticket-sale'
  ticketsSold?: number
  totalTickets?: number
  status?: 'upcoming' | 'ongoing' | 'completed'
}

interface UpcomingEventsProps {
  events: Event[]
  onViewMore?: () => void
  onAddEvent?: () => void
  className?: string
}

export default function UpcomingEvents({ 
  events, 
  onViewMore, 
  onAddEvent,
  className 
}: UpcomingEventsProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
        <Button 
          variant="ghost" 
          className="text-blue-600 hover:text-blue-700"
          onClick={onViewMore}
        >
          View More
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex flex-col items-center justify-center w-12 h-12 bg-blue-50 rounded-lg text-blue-600">
                  <span className="text-sm font-semibold">
                    {new Date(event.date).getDate()}
                  </span>
                  <span className="text-xs">
                    {new Date(event.date).toLocaleString('default', { month: 'short' })}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="mt-1 space-y-1">
                    {event.time && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.time}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.location}
                      </div>
                    )}
                    {event.type === 'ticket-sale' && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Ticket className="w-4 h-4 mr-1" />
                        {event.ticketsSold}/{event.totalTickets} tickets sold
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Badge 
                variant={
                  event.status === 'upcoming' ? 'default' :
                  event.status === 'ongoing' ? 'secondary' : 'outline'
                }
                className="capitalize"
              >
                {event.status}
              </Badge>
            </div>
          </motion.div>
        ))}
        
        <Button 
          className="w-full bg-indigo-950 hover:bg-indigo-900 text-white"
          onClick={onAddEvent}
        >
          + New Events
        </Button>
      </CardContent>
    </Card>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"

// Define the structure for event data
export interface EventType {
  id: string
  title: string
  date: Date
  type: "ticket-sale" | "event"
  ticketsSold?: number
  totalTickets?: number
  description?: string
  time?: string
  location?: string
}

// Props interface for the AddEventModal component
interface AddEventModalProps {
  onEventAdd: (event: EventType) => void    // Callback function when an event is added
  open?: boolean                            // Control modal visibility
  onOpenChange?: (open: boolean) => void    // Callback for modal open state changes
  initialDate?: Date                        // Pre-selected date when modal opens
}

export default function AddEventModal({ onEventAdd, open, onOpenChange, initialDate }: AddEventModalProps) {
  // State management for form data
  const [date, setDate] = useState<Date | undefined>(initialDate)
  const [eventDetails, setEventDetails] = useState({
    title: "",
    type: "event" as const,
    totalTickets: "",
    description: "",
    time: "",
    location: "",
  })

  // Reset form and set date when initialDate changes
  useEffect(() => {
    if (initialDate) {
      setDate(initialDate)
    }
  }, [initialDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !eventDetails.title) return

    // Generate a unique ID using timestamp and random string
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const newEvent: EventType = {
      id: uniqueId,
      date: date.toISOString(),
      ...eventDetails,
      totalTickets: eventDetails.totalTickets ? Number.parseInt(eventDetails.totalTickets) : undefined,
      ticketsSold: 0,
    }

    try {
      const existingEvents = JSON.parse(localStorage.getItem("events") || "[]")
      localStorage.setItem("events", JSON.stringify([...existingEvents, newEvent]))
      onEventAdd(newEvent)
      onOpenChange?.(false)
      resetForm()
    } catch (error) {
      console.error('Error saving event:', error)
    }
  }

  // Helper function to reset form state to initial values
  const resetForm = () => {
    setEventDetails({
      title: "",
      type: "event",
      totalTickets: "",
      description: "",
      time: "",
      location: "",
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        onOpenChange?.(newOpen)
        // Reset form when modal is closed
        if (!newOpen) {
          resetForm()
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {initialDate ? `Add Event for ${date ? format(date, "MMMM d, yyyy") : ""}` : "Add New Event"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Event Title</Label>
              <Input
                value={eventDetails.title}
                onChange={(e) => setEventDetails((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter event title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select
                value={eventDetails.type}
                onValueChange={(value: "ticket-sale" | "event") =>
                  setEventDetails((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="event">Regular Event</SelectItem>
                  <SelectItem value="ticket-sale">Ticket Sale Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* <div className="space-y-2">
            <Label>Event Date</Label>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border mx-auto" required />
          </div> */}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                type="time"
                value={eventDetails.time}
                onChange={(e) => setEventDetails((prev) => ({ ...prev, time: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={eventDetails.location}
                onChange={(e) => setEventDetails((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Enter location"
              />
            </div>
          </div>

          {eventDetails.type === "ticket-sale" && (
            <div className="space-y-2">
              <Label>Total Tickets</Label>
              <Input
                type="number"
                value={eventDetails.totalTickets}
                onChange={(e) => setEventDetails((prev) => ({ ...prev, totalTickets: e.target.value }))}
                placeholder="Enter total tickets"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={eventDetails.description}
              onChange={(e) => setEventDetails((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Enter event description"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange?.(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


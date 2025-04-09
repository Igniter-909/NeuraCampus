"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { eventApi } from "@/services/event"

// Event interface
interface Event {
  _id?: string;
  id?: string;
  title?: string;
  name?: string;
  description?: string;
  location?: string;
  startTime?: string;
  endTime?: string;
  time?: string;
  eventDate?: string;
  date?: Date;
  type?: 'academic' | 'cultural' | 'sports' | 'placement' | 'seminar' | 'workshop' | 'other';
  organizer?: {
    name: string;
    email: string;
    phone: string;
  };
  isPublic?: boolean;
  media?: {
    coverImage?: string;
    gallery: string[];
  };
  ticketInfo?: {
    isPaid: boolean;
    soldTickets: number;
    totalTickets: number;
  };
  ticketsSold?: number;
  totalTickets?: number;
  status?: 'upcoming' | 'ongoing' | 'completed';
  eventPdf?: string;
}

// Event schema validation
const formSchema = z.object({
  title: z.string().min(3, { message: "Event title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  eventDate: z.date({ required_error: "Event date is required" }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  type: z.enum(['academic', 'cultural', 'sports', 'placement', 'seminar', 'workshop', 'other'], {
    required_error: "Event type is required"
  }),
  organizer: z.object({
    name: z.string().min(1, { message: "Organizer name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" })
  }),
  isPublic: z.boolean().default(true),
  media: z.object({
    coverImage: z.string().optional(),
    gallery: z.array(z.string()).default([])
  }).optional()
})

type FormValues = z.infer<typeof formSchema>

interface EditEventModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event: Event
  onEventUpdated?: (data: Event) => void
}

export default function EditEventModal({
  open,
  onOpenChange,
  event,
  onEventUpdated
}: EditEventModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      startTime: "",
      endTime: "",
      type: "academic",
      organizer: {
        name: "",
        email: "",
        phone: ""
      },
      isPublic: true,
      media: {
        gallery: []
      }
    },
  })

  // Update form values when event changes
  useEffect(() => {
    if (event) {
      const formData = {
        title: event.title || event.name || "",
        description: event.description || "",
        location: event.location || "",
        startTime: event.startTime || (event.time?.split(' - ')[0] || ""),
        endTime: event.endTime || (event.time?.split(' - ')[1] || ""),
        type: (event.type as 'academic' | 'cultural' | 'sports' | 'placement' | 'seminar' | 'workshop' | 'other') || "academic",
        eventDate: event.eventDate ? new Date(event.eventDate) : (event.date ? new Date(event.date) : new Date()),
        organizer: event.organizer || {
          name: "",
          email: "",
          phone: ""
        },
        isPublic: event.isPublic !== undefined ? event.isPublic : true,
        media: event.media || {
          gallery: []
        }
      };
      form.reset(formData);
    }
  }, [event, form]);

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    
    try {
      // Create form data for file upload
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("description", data.description)
      formData.append("eventDate", data.eventDate.toISOString())
      formData.append("startTime", data.startTime)
      formData.append("endTime", data.endTime)
      formData.append("location", data.location)
      formData.append("type", data.type)
      formData.append("organizer", JSON.stringify(data.organizer))
      formData.append("isPublic", String(data.isPublic))
      
      if (data.media) {
        formData.append("media", JSON.stringify(data.media))
      }

      // Get the event ID
      const eventId = event._id || event.id;
      
      if (!eventId) {
        throw new Error("Event ID not found");
      }

      // Update the event
      const response = await eventApi.updateEvent(eventId, {
        ...data,
        media: data.media ? {
          coverImage: data.media.coverImage || "",
          gallery: data.media.gallery || []
        } : undefined
      });

      if (!response?.data) {
        throw new Error("Failed to update event");
      }

      const result = response.data;
      
      toast({
        title: "Event updated",
        children: "Your event has been successfully updated",
      })
      
      if (onEventUpdated) {
        onEventUpdated(result)
      }
      
      // Close modal and reset form
      onOpenChange(false)
      
    } catch (error) {
      console.error("Error updating event:", error)
      toast({
        title: "Error",
        children: "Failed to update event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] max-h-[90vh] p-0 rounded-2xl border-0 shadow-2xl dark:bg-gray-900 animate-in fade-in-0 zoom-in-95 duration-200 flex flex-col">
        {/* Fixed Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 p-8 rounded-t-2xl relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIxMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iNzIwIiBjeT0iNjAiIHI9IjYwIi8+PGNpcmNsZSBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjcyMCIgY3k9IjYwIiByPSI0NSIvPjxjaXJjbGUgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI3MjAiIGN5PSI2MCIgcj0iMzAiLz48Y2lyY2xlIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iNzIwIiBjeT0iNjAiIHI9IjE1Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
          <DialogHeader className="space-y-3 relative z-10">
            <DialogTitle className="text-3xl font-bold text-white tracking-tight">Edit Event</DialogTitle>
            <DialogDescription className="text-blue-100 dark:text-blue-200 text-lg">
              Update the event details below. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow custom-scrollbar">
          <div className="p-8 dark:bg-gray-900">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Event Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2 lg:col-span-3">
                        <FormLabel className="text-base font-medium dark:text-gray-200 flex items-center gap-2">
                          <span className="text-blue-600 dark:text-blue-400">●</span> Event Title
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter event title" 
                            className="h-12 dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Event Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2 lg:col-span-3">
                        <FormLabel className="text-base font-medium dark:text-gray-200 flex items-center gap-2">
                          <span className="text-blue-600 dark:text-blue-400">●</span> Description
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter event description" 
                            className="min-h-[120px] resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Event Type */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium dark:text-gray-200 flex items-center gap-2">
                          <span className="text-blue-600 dark:text-blue-400">●</span> Event Type
                        </FormLabel>
                        <FormControl>
                          <select 
                            className="w-full p-3 border rounded-lg h-12 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            {...field}
                          >
                            <option value="academic">Academic</option>
                            <option value="cultural">Cultural</option>
                            <option value="sports">Sports</option>
                            <option value="placement">Placement</option>
                            <option value="seminar">Seminar</option>
                            <option value="workshop">Workshop</option>
                            <option value="other">Other</option>
                          </select>
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Event Date */}
                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-base font-medium dark:text-gray-200 flex items-center gap-2">
                          <span className="text-blue-600 dark:text-blue-400">●</span> Event Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal h-12 dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                                  !field.value && "text-muted-foreground dark:text-gray-400"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-lg" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              className="dark:bg-gray-800 dark:text-white rounded-lg"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Start Time */}
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium dark:text-gray-200 flex items-center gap-2">
                          <span className="text-blue-600 dark:text-blue-400">●</span> Start Time
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="time" 
                            className="h-12 dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  {/* End Time */}
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium dark:text-gray-200 flex items-center gap-2">
                          <span className="text-blue-600 dark:text-blue-400">●</span> End Time
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="time" 
                            className="h-12 dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Location */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2 lg:col-span-3">
                        <FormLabel className="text-base font-medium dark:text-gray-200 flex items-center gap-2">
                          <span className="text-blue-600 dark:text-blue-400">●</span> Location
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter event location" 
                            className="h-12 dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Organizer Details */}
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span className="text-blue-600 dark:text-blue-400">●</span> Organizer Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="organizer.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium dark:text-gray-200">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Organizer name" 
                              className="h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="organizer.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium dark:text-gray-200">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Organizer email" 
                              className="h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="organizer.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium dark:text-gray-200">Phone</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Organizer phone" 
                              className="h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="border-t border-gray-100 dark:border-gray-700 p-6 flex-shrink-0 bg-white dark:bg-gray-900 rounded-b-2xl">
          <DialogFooter className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="h-12 px-8 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 rounded-lg transition-all"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-900 dark:hover:from-blue-800 dark:hover:to-blue-950 rounded-lg transition-all shadow-md hover:shadow-lg"
              onClick={form.handleSubmit(onSubmit)}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Add custom scrollbar styles
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(59, 130, 246, 0.5);
    border-radius: 20px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(59, 130, 246, 0.7);
  }
  
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(96, 165, 250, 0.5);
  }
  
  .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(96, 165, 250, 0.7);
  }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = customScrollbarStyles;
  document.head.appendChild(style);
} 
export interface Event {
  _id: string;
  title: string;
  description: string;
  eventDate: Date;
  startTime: string;
  endTime: string;
  location: string;
  type: 'academic' | 'cultural' | 'sports' | 'placement' | 'seminar' | 'workshop' | 'other';
  organizer: {
    name: string;
    email: string;
    phone: string;
  };
  ticketInfo?: {
    isPaid: boolean;
    price: number;
    totalTickets: number;
    soldTickets: number;
  };
  college: string;
  attendees?: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdBy: string;
  updatedBy: string;
  media?: {
    coverImage: string;
    gallery: string[];
  };
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventsResponse {
  success: boolean;
  data: Event[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export interface EventResponse {
  success: boolean;
  data: Event;
} 
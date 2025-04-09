import { apiClient } from '@/lib/api';
import { Event } from '@/types/event';
import cookieUtils from '@/lib/cookies';

// Helper to ensure auth token is included in requests
const getAuthHeaders = () => {
  const token = cookieUtils.get('token');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    }
  };
};

export const eventApi = {
  // Get all events for a college
  async getEvents(collegeId: string, params: any = {}) {
    console.log('Fetching events with token:', cookieUtils.get('token')?.substring(0, 10) + '...');
    return apiClient.get(`/events/college/${collegeId}`, { 
      ...getAuthHeaders(),
      params 
    });
  },

  // Create a new event
  async createEvent(collegeId: string, eventData: any) {
    console.log(`Creating event for college: ${collegeId}`);
    console.log('Event data being sent:', JSON.stringify(eventData, null, 2));
    
    try {
      const response = await apiClient.post(`/events/college/${collegeId}`, eventData, getAuthHeaders());
      console.log('Event creation response:', response);
      return response;
    } catch (error) {
      console.error('Event creation failed:', error);
      throw error;
    }
  },

  // Get event details
  async getEventDetails(eventId: string) {
    return apiClient.get(`/events/${eventId}`, getAuthHeaders());
  },

  // Update event
  async updateEvent(eventId: string, eventData: Partial<Event>) {
    return apiClient.put(`/events/${eventId}`, eventData, getAuthHeaders());
  },

  // Delete event
  async deleteEvent(eventId: string) {
    return apiClient.delete(`/events/${eventId}`, getAuthHeaders());
  },

  // Bulk upload events
  async bulkUploadEvents(collegeId: string, formData: FormData) {
    return apiClient.post(`/events/college/${collegeId}/bulk-upload`, formData, {
      ...getAuthHeaders(),
      headers: {
        ...getAuthHeaders().headers,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
}; 
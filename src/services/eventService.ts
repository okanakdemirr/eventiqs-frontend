import { Event } from '../types';
import { mockEvents } from '../data/mockData';

export class EventService {
  static getAllEvents(): Event[] {
    return mockEvents;
  }

  static getEventById(id: string): Event | undefined {
    return mockEvents.find(event => event.id === id);
  }

  static getActiveEvents(): Event[] {
    return mockEvents.filter(event => event.status === 'active');
  }

  static getCompletedEvents(): Event[] {
    return mockEvents.filter(event => event.status === 'completed');
  }

  static getUpcomingEvents(): Event[] {
    return mockEvents.filter(event => event.status === 'upcoming');
  }

  static getCurrentEvent(): Event | undefined {
    const selectedEventId = localStorage.getItem('selectedEvent');
    if (selectedEventId) {
      return this.getEventById(selectedEventId);
    }
    return this.getActiveEvents()[0];
  }
}
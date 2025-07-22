import { Visitor, PerfectMatch, Exhibitor } from '../types';
import { mockVisitors, mockPerfectMatches, mockExhibitors } from '../data/mockData';

export class ParticipantService {
  static getAllVisitors(): Visitor[] {
    return mockVisitors;
  }

  static getVisitorById(id: number): Visitor | undefined {
    return mockVisitors.find(visitor => visitor.id === id);
  }

  static getPerfectMatches(): PerfectMatch[] {
    return mockPerfectMatches;
  }

  static getExhibitors(): Exhibitor[] {
    return mockExhibitors;
  }

  static getExhibitorById(id: number): Exhibitor | undefined {
    return mockExhibitors.find(exhibitor => exhibitor.id === id);
  }

  static getVisitorsByStatus(status: 'online' | 'away' | 'offline'): Visitor[] {
    return mockVisitors.filter(visitor => visitor.status === status);
  }

  static getVisitorsByConfidence(confidence: string): Visitor[] {
    return mockVisitors.filter(visitor => visitor.confidence === confidence);
  }

  static searchVisitors(query: string): Visitor[] {
    const lowercaseQuery = query.toLowerCase();
    return mockVisitors.filter(visitor =>
      visitor.name.toLowerCase().includes(lowercaseQuery) ||
      visitor.company.toLowerCase().includes(lowercaseQuery) ||
      visitor.title.toLowerCase().includes(lowercaseQuery)
    );
  }

  static getRecommendedExhibitors(): Exhibitor[] {
    return mockExhibitors
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5);
  }
}
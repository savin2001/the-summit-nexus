export interface Sector {
  id: string;
  title: string;
  iconName: string;
  description: string;
}

export interface Insight {
  id: string;
  title: string;
  category: 'How-to' | 'Security Alert' | 'Market Trend';
  date: string;
  readTime: string;
  summary: string;
  image: string;
}

export type EventType = 'Summit' | 'Conference' | 'Workshop' | 'Retreat' | 'Webinar' | 'Briefing';

export interface Event {
  id: string;
  title: string;
  eventType: EventType;
  date: string;
  location: string;
  themes: string[];
  isExclusive: boolean;
  description?: string;
  targetAudience?: string;
}

export enum ViewState {
  HOME = 'HOME',
  KNOWLEDGE = 'KNOWLEDGE',
  EVENTS = 'EVENTS',
  PORTAL = 'PORTAL',
  ABOUT = 'ABOUT'
}

export interface User {
  name: string;
  role: 'ADMIN' | 'EXECUTIVE';
  organization: string;
  email?: string;
}
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  experience: number;
  bio: string;
  availability: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface WaitingQueueItem {
  id: string;
  patientId: string;
  doctorId: string;
  preferredDates: string[];
  preferredTimeSlots: string[];
  reason: string;
  priority: number;
  requestDate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
  keywords?: string[];
  doctorId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  appointments: string[];
  waitingQueue: string[];
}
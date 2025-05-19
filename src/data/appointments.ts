import { Appointment } from '../types';

export const appointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    patientId: 'user1',
    date: '2025-03-12',
    time: '09:00',
    status: 'scheduled',
    notes: 'Annual checkup'
  },
  {
    id: '2',
    doctorId: '3',
    patientId: 'user1',
    date: '2025-03-18',
    time: '14:30',
    status: 'scheduled',
    notes: 'Follow-up appointment'
  },
  {
    id: '3',
    doctorId: '2',
    patientId: 'user2',
    date: '2025-03-15',
    time: '11:00',
    status: 'scheduled'
  },
  {
    id: '4',
    doctorId: '4',
    patientId: 'user2',
    date: '2025-03-10',
    time: '10:00',
    status: 'completed',
    notes: 'Skin consultation'
  }
];
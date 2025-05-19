import { WaitingQueueItem } from '../types';

export const waitingQueue: WaitingQueueItem[] = [
  {
    id: '1',
    patientId: 'user1',
    doctorId: '1',
    preferredDates: ['2025-03-14', '2025-03-15', '2025-03-16'],
    preferredTimeSlots: ['morning', 'afternoon'],
    reason: 'Heart palpitations',
    priority: 2,
    requestDate: '2025-03-05'
  },
  {
    id: '2',
    patientId: 'user2',
    doctorId: '3',
    preferredDates: ['2025-03-12', '2025-03-13'],
    preferredTimeSlots: ['morning'],
    reason: 'Child wellness visit',
    priority: 1,
    requestDate: '2025-03-06'
  },
  {
    id: '3',
    patientId: 'user3',
    doctorId: '5',
    preferredDates: ['2025-03-20', '2025-03-21', '2025-03-22'],
    preferredTimeSlots: ['afternoon', 'evening'],
    reason: 'Chronic fatigue',
    priority: 3,
    requestDate: '2025-03-04'
  }
];
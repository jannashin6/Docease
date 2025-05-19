import React, { createContext, useState, useContext } from 'react';
import { Appointment, Doctor, WaitingQueueItem, ChatMessage, User } from '../types';
import { doctors as initialDoctors } from '../data/doctors';
import { appointments as initialAppointments } from '../data/appointments';
import { waitingQueue as initialWaitingQueue } from '../data/waitingQueue';
import { loadChatHistory } from '../utils/storage';

interface AppContextType {
  currentUser: User | null;
  doctors: Doctor[];
  appointments: Appointment[];
  waitingQueue: WaitingQueueItem[];
  chatHistory: ChatMessage[];
  setCurrentUser: (user: User | null) => void;
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (id: string) => void;
  addToWaitingQueue: (queueItem: WaitingQueueItem) => void;
  removeFromWaitingQueue: (id: string) => void;
  addChatMessage: (message: ChatMessage) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mock current user
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'user1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '123-456-7890',
    appointments: ['1', '2'],
    waitingQueue: ['1']
  });

  const [doctors] = useState<Doctor[]>(initialDoctors);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [waitingQueue, setWaitingQueue] = useState<WaitingQueueItem[]>(initialWaitingQueue);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    return (loadChatHistory() as unknown as ChatMessage[]).map(message => ({
      ...message,
      content: message.content || ''
    }));
  });

  const addAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        appointments: [...currentUser.appointments, appointment.id]
      });
    }
  };

  const cancelAppointment = (id: string) => {
    setAppointments(
      appointments.map(appointment => 
        appointment.id === id ? { ...appointment, status: 'cancelled' } : appointment
      )
    );
  };

  const addToWaitingQueue = (queueItem: WaitingQueueItem) => {
    setWaitingQueue([...waitingQueue, queueItem]);
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        waitingQueue: [...currentUser.waitingQueue, queueItem.id]
      });
    }
  };

  const removeFromWaitingQueue = (id: string) => {
    setWaitingQueue(waitingQueue.filter(item => item.id !== id));
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        waitingQueue: currentUser.waitingQueue.filter(itemId => itemId !== id)
      });
    }
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatHistory(prev => [...prev, message]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        doctors,
        appointments,
        waitingQueue,
        chatHistory,
        setCurrentUser,
        addAppointment,
        cancelAppointment,
        addToWaitingQueue,
        removeFromWaitingQueue,
        addChatMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
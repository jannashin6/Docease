import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import AppointmentCard from '../components/AppointmentCard';
import WaitingQueueCard from '../components/WaitingQueueCard';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';

const AppointmentsPage: React.FC = () => {
  const { currentUser, appointments, waitingQueue } = useAppContext();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'waiting'>('upcoming');
  
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900">Please log in to view your appointments</h2>
          <p className="mt-2 text-gray-500">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }
  
  // Filter user's appointments
  const userAppointments = appointments.filter(appt => 
    appt.patientId === currentUser.id
  );
  
  // Split into upcoming and past appointments
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingAppointments = userAppointments.filter(appt => {
    const apptDate = new Date(appt.date);
    return (
      apptDate >= today && 
      appt.status === 'scheduled'
    );
  });
  
  const pastAppointments = userAppointments.filter(appt => {
    const apptDate = new Date(appt.date);
    return (
      apptDate < today || 
      appt.status === 'completed' || 
      appt.status === 'cancelled'
    );
  });
  
  // Get user's waiting queue items
  const userQueueItems = waitingQueue.filter(item => 
    item.patientId === currentUser.id
  );
  
  // Sort appointments by date
  const sortedUpcoming = [...upcomingAppointments].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const sortedPast = [...pastAppointments].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let activeContent;
  
  if (activeTab === 'upcoming') {
    activeContent = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedUpcoming.length > 0 ? (
          sortedUpcoming.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No upcoming appointments</h3>
            <p className="mt-2 text-gray-500">
              You don't have any upcoming appointments scheduled.
            </p>
          </div>
        )}
      </div>
    );
  } else if (activeTab === 'past') {
    activeContent = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedPast.length > 0 ? (
          sortedPast.map(appointment => (
            <AppointmentCard 
              key={appointment.id} 
              appointment={appointment} 
              showCancelOption={false}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No past appointments</h3>
            <p className="mt-2 text-gray-500">
              Your appointment history will appear here.
            </p>
          </div>
        )}
      </div>
    );
  } else {
    activeContent = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userQueueItems.length > 0 ? (
          userQueueItems.map(queueItem => (
            <WaitingQueueCard key={queueItem.id} queueItem={queueItem} />
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No waiting queue requests</h3>
            <p className="mt-2 text-gray-500">
              You're not currently in any waiting queues.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Appointments</h1>
      
      {/* Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`mr-8 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'upcoming'
                ? 'border-blue-800 text-blue-800'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upcoming
            {upcomingAppointments.length > 0 && (
              <span className="ml-2 rounded-full bg-blue-100 text-blue-800 text-xs px-2">
                {upcomingAppointments.length}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('past')}
            className={`mr-8 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'past'
                ? 'border-blue-800 text-blue-800'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Past
          </button>
          
          <button
            onClick={() => setActiveTab('waiting')}
            className={`py-4 text-sm font-medium border-b-2 ${
              activeTab === 'waiting'
                ? 'border-blue-800 text-blue-800'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Waiting Queue
            {userQueueItems.length > 0 && (
              <span className="ml-2 rounded-full bg-yellow-100 text-yellow-800 text-xs px-2">
                {userQueueItems.length}
              </span>
            )}
          </button>
        </nav>
      </div>
      
      {/* Content for active tab */}
      {activeContent}
    </div>
  );
};

export default AppointmentsPage;
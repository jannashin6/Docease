import React from 'react';
import { CalendarDays, Clock } from 'lucide-react';
import { WaitingQueueItem } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface WaitingQueueCardProps {
  queueItem: WaitingQueueItem;
}

const WaitingQueueCard: React.FC<WaitingQueueCardProps> = ({ queueItem }) => {
  const { doctors, removeFromWaitingQueue } = useAppContext();
  
  const doctor = doctors.find(d => d.id === queueItem.doctorId);
  
  if (!doctor) return null;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  const handleRemove = () => {
    if (confirm('Are you sure you want to remove yourself from this waiting queue?')) {
      removeFromWaitingQueue(queueItem.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
            <p className="text-sm text-blue-800">{doctor.specialty}</p>
          </div>
          <span className="text-xs bg-yellow-50 text-yellow-800 px-2 py-1 rounded-full uppercase font-medium">
            Waiting
          </span>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
            <span>Preferred dates: </span>
            <div className="ml-1 flex flex-wrap gap-1">
              {queueItem.preferredDates.map((date, index) => (
                <span key={index} className="text-xs">
                  {formatDate(date)}{index < queueItem.preferredDates.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <span>Preferred times: </span>
            <div className="ml-1 flex flex-wrap gap-1">
              {queueItem.preferredTimeSlots.map((slot, index) => (
                <span key={index} className="text-xs capitalize">
                  {slot}{index < queueItem.preferredTimeSlots.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
          
          <p className="text-sm text-gray-600">
            Reason: {queueItem.reason}
          </p>
          
          <p className="text-sm text-gray-600">
            Request date: {formatDate(queueItem.requestDate)}
          </p>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleRemove}
            className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitingQueueCard;
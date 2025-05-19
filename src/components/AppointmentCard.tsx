import React from 'react';
import { Clock, Calendar, User } from 'lucide-react';
import { Appointment } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface AppointmentCardProps {
  appointment: Appointment;
  showCancelOption?: boolean;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  showCancelOption = true 
}) => {
  const { doctors, cancelAppointment } = useAppContext();
  
  const doctor = doctors.find(d => d.id === appointment.doctorId);
  
  if (!doctor) return null;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  const getStatusColor = () => {
    switch (appointment.status) {
      case 'scheduled':
        return 'bg-blue-50 text-blue-800';
      case 'completed':
        return 'bg-green-50 text-green-800';
      case 'cancelled':
        return 'bg-red-50 text-red-800';
      default:
        return 'bg-gray-50 text-gray-800';
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      cancelAppointment(appointment.id);
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
          <span className={`text-xs px-2 py-1 rounded-full uppercase font-medium ${getStatusColor()}`}>
            {appointment.status}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            {formatDate(appointment.date)}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            {appointment.time}
          </div>
          {appointment.notes && (
            <p className="text-sm text-gray-600 mt-2">
              Notes: {appointment.notes}
            </p>
          )}
        </div>
        
        {showCancelOption && appointment.status === 'scheduled' && (
          <div className="flex justify-end">
            <button
              onClick={handleCancel}
              className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
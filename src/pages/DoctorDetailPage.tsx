import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Award } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const DoctorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { doctors, addAppointment, addToWaitingQueue, currentUser } = useAppContext();
  
  const doctor = doctors.find(d => d.id === id);
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [showWaitingQueueForm, setShowWaitingQueueForm] = useState(false);
  const [preferredDates, setPreferredDates] = useState<string[]>([]);
  const [preferredTimeSlots, setPreferredTimeSlots] = useState<string[]>([]);
  const [reason, setReason] = useState('');
  
  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900">Doctor not found</h2>
          <button
            onClick={() => navigate('/doctors')}
            className="mt-4 text-blue-800 hover:text-blue-900"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }
  
  // Generate available dates (next 14 days)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      // Only include days the doctor is available
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      if (doctor.availability.includes(dayOfWeek)) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        });
      }
    }
    
    return dates;
  };
  
  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (const minutes of ['00', '30']) {
        if (hour === endHour && minutes === '30') continue; // Skip 5:30 PM
        
        const time = `${hour}:${minutes}`;
        const label = new Date(`2000-01-01T${hour}:${minutes}`).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit'
        });
        
        slots.push({ value: time, label });
      }
    }
    
    return slots;
  };
  
  const availableDates = generateAvailableDates();
  const timeSlots = generateTimeSlots();
  
  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and time for your appointment.');
      return;
    }
    
    if (!currentUser) {
      alert('Please log in to book an appointment.');
      navigate('/login');
      return;
    }
    
    const newAppointment = {
      id: Date.now().toString(),
      doctorId: doctor.id,
      patientId: currentUser.id,
      date: selectedDate,
      time: selectedTime,
      status: 'scheduled' as const,
      notes: notes.trim()
    };
    
    addAppointment(newAppointment);
    
    alert('Appointment booked successfully!');
    navigate('/appointments');
  };
  
  const handleJoinWaitingQueue = () => {
    if (preferredDates.length === 0 || preferredTimeSlots.length === 0 || !reason) {
      alert('Please fill in all required fields.');
      return;
    }
    
    if (!currentUser) {
      alert('Please log in to join the waiting queue.');
      navigate('/login');
      return;
    }
    
    const newQueueItem = {
      id: Date.now().toString(),
      patientId: currentUser.id,
      doctorId: doctor.id,
      preferredDates,
      preferredTimeSlots,
      reason,
      priority: 1, // Default priority
      requestDate: new Date().toISOString().split('T')[0]
    };
    
    addToWaitingQueue(newQueueItem);
    
    alert('You have been added to the waiting queue!');
    navigate('/appointments');
  };
  
  const toggleTimeSlot = (slot: string) => {
    if (preferredTimeSlots.includes(slot)) {
      setPreferredTimeSlots(preferredTimeSlots.filter(s => s !== slot));
    } else {
      setPreferredTimeSlots([...preferredTimeSlots, slot]);
    }
  };
  
  const togglePreferredDate = (date: string) => {
    if (preferredDates.includes(date)) {
      setPreferredDates(preferredDates.filter(d => d !== date));
    } else {
      setPreferredDates([...preferredDates, date]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Doctor header */}
        <div className="md:flex">
          <div className="md:w-1/3 lg:w-1/4">
            <div className="h-64 md:h-full">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="p-6 md:w-2/3 lg:w-3/4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
            <p className="text-blue-800 mb-4">{doctor.specialty}</p>
            
            <div className="flex items-center mb-6">
              <Award className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-600">{doctor.experience} years of experience</span>
            </div>
            
            <p className="text-gray-600 mb-6">{doctor.bio}</p>
            
            <div className="flex flex-wrap gap-2">
              <h3 className="text-sm font-medium text-gray-700 mr-2">Available on:</h3>
              {doctor.availability.map((day, index) => (
                <span key={index} className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full">
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Booking section */}
        <div className="border-t border-gray-200">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left column - Regular booking */}
              <div className="md:w-1/2">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Book an Appointment</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  >
                    <option value="">Select a date</option>
                    {availableDates.map((date, index) => (
                      <option key={index} value={date.value}>{date.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot.value}>{slot.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                    placeholder="Add any notes or questions for your appointment"
                  />
                </div>
                
                <button
                  onClick={handleBookAppointment}
                  className="flex items-center justify-center w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-colors duration-200"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Appointment
                </button>
              </div>
              
              {/* Right column - Waiting queue */}
              <div className="md:w-1/2 md:border-l md:border-gray-200 md:pl-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium text-gray-900">Waiting Queue</h2>
                  <button
                    onClick={() => setShowWaitingQueueForm(!showWaitingQueueForm)}
                    className="text-blue-800 hover:text-blue-900 text-sm font-medium"
                  >
                    {showWaitingQueueForm ? 'Cancel' : 'Join Queue'}
                  </button>
                </div>
                
                {!showWaitingQueueForm ? (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-600 text-sm">
                      Join our waiting queue to be notified if an earlier appointment becomes available. 
                      You'll have priority access to cancelled slots that match your preferred dates and times.
                    </p>
                    <div className="flex items-center mt-4">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-600">
                        Average wait time: <span className="font-medium">3-5 days</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Dates
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {availableDates.slice(0, 6).map((date, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => togglePreferredDate(date.value)}
                            className={`text-xs py-2 px-1 rounded-md border text-center ${
                              preferredDates.includes(date.value)
                                ? 'bg-blue-800 text-white border-blue-800'
                                : 'bg-white text-gray-700 border-gray-300'
                            }`}
                          >
                            {date.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Time Slots
                      </label>
                      <div className="flex gap-2">
                        {['morning', 'afternoon', 'evening'].map((slot, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => toggleTimeSlot(slot)}
                            className={`flex-1 py-2 px-3 rounded-md border text-center capitalize ${
                              preferredTimeSlots.includes(slot)
                                ? 'bg-blue-800 text-white border-blue-800'
                                : 'bg-white text-gray-700 border-gray-300'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reason for Visit
                      </label>
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                        placeholder="Please describe your symptoms or reason for the appointment"
                      />
                    </div>
                    
                    <button
                      onClick={handleJoinWaitingQueue}
                      className="flex items-center justify-center w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-colors duration-200"
                    >
                      Join Waiting Queue
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;
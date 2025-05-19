import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="h-48 overflow-hidden">
        <img 
          src={doctor.image} 
          alt={`Dr. ${doctor.name}`} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{doctor.name}</h3>
        <p className="text-sm text-blue-800 mb-4">{doctor.specialty}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doctor.bio}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>Experience: {doctor.experience} years</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {doctor.availability.slice(0, 2).map((day, index) => (
              <span key={index} className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full">
                {day}
              </span>
            ))}
            {doctor.availability.length > 2 && (
              <span className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full">
                +{doctor.availability.length - 2}
              </span>
            )}
          </div>
          
          <button
            onClick={() => navigate(`/doctors/${doctor.id}`)}
            className="flex items-center text-sm font-medium text-blue-800 hover:text-blue-900 transition-colors duration-200"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import { useAppContext } from '../contexts/AppContext';

const DoctorsPage: React.FC = () => {
  const { doctors } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  
  // Get unique specialties
  const specialties = ['All', ...new Set(doctors.map(doctor => doctor.specialty))];
  
  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = searchTerm === '' || 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'All' || 
      doctor.specialty === selectedSpecialty;
      
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Our Doctors</h1>
        <p className="mt-4 text-gray-500 max-w-3xl mx-auto">
          Browse our network of specialists and book an appointment with the right doctor for your needs.
        </p>
      </div>
      
      {/* Search and filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, specialty, or keywords"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
          />
        </div>
        
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
        >
          <option value="">All Specialties</option>
          {specialties.map((specialty, index) => (
            specialty !== 'All' && <option key={index} value={specialty}>{specialty}</option>
          ))}
        </select>
      </div>
      
      {/* Doctors grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No doctors found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSpecialty('');
            }}
            className="mt-4 text-blue-800 hover:text-blue-900"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, MessageCircle, ClipboardList } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import { useAppContext } from '../contexts/AppContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { doctors } = useAppContext();

  return (
    <div>
      {/* Hero section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Quality healthcare, simplified
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Book appointments with trusted doctors, join waiting queues, and get personalized recommendations.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <button
                onClick={() => navigate('/doctors')}
                className="px-8 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors duration-200 shadow-sm"
              >
                Find a doctor
              </button>
              <button
                onClick={() => navigate('/chat')}
                className="px-8 py-3 bg-white text-blue-800 border border-blue-800 rounded-md hover:bg-blue-50 transition-colors duration-200"
              >
                Chat with assistant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-500">
              Our streamlined system makes healthcare access simple and efficient.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Search className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Find the right doctor</h3>
              <p className="mt-2 text-sm text-gray-500">
                Browse our network of specialists or get recommendations from our chatbot.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Book an appointment</h3>
              <p className="mt-2 text-sm text-gray-500">
                Select a convenient time or join the waiting queue for earlier availability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Manage your care</h3>
              <p className="mt-2 text-sm text-gray-500">
                View upcoming appointments, check waiting status, and receive reminders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured doctors section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Featured Specialists</h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-500">
              Meet some of our top-rated healthcare professionals.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.slice(0, 3).map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/doctors')}
              className="inline-flex items-center text-blue-800 hover:text-blue-900"
            >
              <span>View all doctors</span>
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Chat assistant CTA */}
      <section className="bg-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:max-w-2xl">
              <h2 className="text-3xl font-bold text-white">Not sure which doctor to see?</h2>
              <p className="mt-4 text-lg text-blue-100">
                Our intelligent chatbot can analyze your symptoms and recommend the right specialist for your needs.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => navigate('/chat')}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-800 rounded-md hover:bg-blue-50 transition-colors duration-200"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat with assistant
                </button>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:max-w-lg">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-800 font-semibold">M</span>
                  </div>
                  <div className="text-sm text-gray-800 bg-gray-100 rounded-lg p-3">
                    Hello! I'm your medical assistant. How can I help you today?
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-4 mb-4">
                  <div className="text-sm text-white bg-blue-800 rounded-lg p-3">
                    I've been having frequent headaches for the past week.
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-800 font-semibold">M</span>
                  </div>
                  <div className="text-sm text-gray-800 bg-gray-100 rounded-lg p-3">
                    I'd recommend seeing a neurologist. Would you like me to show you available specialists?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
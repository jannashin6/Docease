import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MessageCircle, UserCircle, Menu, X } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { currentUser } = useAppContext();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center" onClick={() => navigate('/')} role="button">
            <span className="text-blue-800 font-semibold text-xl tracking-tight cursor-pointer">MediVue</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => navigate('/appointments')}
              className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Appointments
            </button>
            <button 
              onClick={() => navigate('/doctors')}
              className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              Doctors
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </button>
          </nav>

          {/* User Profile */}
          <div className="hidden md:flex items-center">
            {currentUser ? (
              <div 
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <UserCircle className="h-8 w-8 text-blue-800" />
                <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button 
              onClick={() => {
                navigate('/appointments');
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Appointments
            </button>
            <button 
              onClick={() => {
                navigate('/doctors');
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Doctors
            </button>
            <button 
              onClick={() => {
                navigate('/chat');
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Chat
            </button>
            {currentUser ? (
              <button 
                onClick={() => {
                  navigate('/profile');
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Profile
              </button>
            ) : (
              <button 
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
                className="bg-blue-800 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
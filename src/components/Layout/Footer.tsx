import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 pt-8">
          <div className="md:grid md:grid-cols-3 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">MediVue</h3>
              <p className="text-gray-500 text-sm">
                Connecting patients with quality healthcare through a simple, elegant appointment system.
              </p>
            </div>
            
            <div className="mt-12 md:mt-0">
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-blue-800">
                    Health Articles
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-blue-800">
                    Wellness Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-blue-800">
                    Medical FAQ
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="mt-12 md:mt-0">
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Contact</h3>
              <ul className="mt-4 space-y-4">
                <li className="text-sm text-gray-500">
                  500 Medical Center Dr.<br />
                  Suite 200<br />
                  Boston, MA 02215
                </li>
                <li className="text-sm text-gray-500">
                  contact@medivue.health
                </li>
                <li className="text-sm text-gray-500">
                  (555) 123-4567
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} MediVue Health. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-xs text-gray-400 hover:text-blue-800">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-gray-400 hover:text-blue-800">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-gray-400 hover:text-blue-800">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
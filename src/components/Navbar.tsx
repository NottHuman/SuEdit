import { Search, Bell, Menu, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { AuthModal } from './auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export function Navbar() {
  const { user, signOut } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-dark-200/80 backdrop-blur-md border-b border-primary-800/20 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-cyber font-bold bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">
                Suedit
              </Link>
            </div>

            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Suedit..."
                  className="w-full bg-dark-100 text-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link to="/notifications" className="text-gray-400 hover:text-primary-500">
                    <Bell size={20} />
                  </Link>
                  <Link to="/profile" className="text-gray-400 hover:text-primary-500">
                    <User size={20} />
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="hidden md:flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsAuthOpen(true)}
                  className="hidden md:block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  Sign In
                </button>
              )}
              <button className="md:hidden text-gray-400 hover:text-primary-500">
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
}
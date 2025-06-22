
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <header className={`border-b transition-colors duration-300 ${
      isDarkMode ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-500">
          KalviX
        </Link>
        
        <nav className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <Link to="/" className="hover:text-blue-500 transition-colors">
                Home
              </Link>
              <Link to="/ocr" className="hover:text-blue-500 transition-colors">
                OCR Tool
              </Link>
              <Link to="/edubot" className="hover:text-blue-500 transition-colors">
                Edubot
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-500 transition-colors">
                Login
              </Link>
              <Link to="/signup" className="hover:text-blue-500 transition-colors">
                Sign Up
              </Link>
            </>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center space-x-2"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span>{isDarkMode ? 'Light' : 'Dark'}</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

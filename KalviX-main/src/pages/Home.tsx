
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Scan, GraduationCap, Languages } from 'lucide-react';
import Layout from '@/components/Layout';

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? 'bg-black' : 'bg-white'
      }`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-blue-500">Learn. Grow. Achive</h1>
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your comprehensive learning platform for Tamil students
          </p>
          <div className="space-x-4">
            <Link to="/login">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className={isDarkMode ? 'border-gray-700 hover:bg-gray-800' : ''}>
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-blue-500">
            Learn. Grow. Achive
          </h1>
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Empowering Tamil Nadu students with advanced learning tools
          </p>
        </section>

        {/* Products Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Edubot Card */}
            <Card className={`hover:shadow-lg transition-shadow duration-300 ${
              isDarkMode ? 'bg-gray-900 border-gray-800 hover:bg-gray-800' : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-8 w-8 text-blue-500" />
                  <CardTitle className="text-2xl">Edubot</CardTitle>
                </div>
                <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  AI-powered study companion for Tamil subject
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Designed specifically for 10th, 11th, and 12th grade students in Tamil Nadu. 
                  Get personalized help with Tamil language studies, interactive learning, and comprehensive notes.
                </p>
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    Interactive learning sessions
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-6">
                  <Languages className="h-5 w-5 text-blue-500" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    Tamil language focus
                  </span>
                </div>
                <Link to="/edubot">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Start Learning
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* OCR Tool Card */}
            <Card className={`hover:shadow-lg transition-shadow duration-300 ${
              isDarkMode ? 'bg-gray-900 border-gray-800 hover:bg-gray-800' : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Scan className="h-8 w-8 text-blue-500" />
                  <CardTitle className="text-2xl">OCR Tool</CardTitle>
                </div>
                <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Advanced Tamil text recognition and extraction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Convert Tamil text from images and PDFs into editable formats. 
                  Support for multiple file formats with high accuracy text recognition.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      PDF, JPG, PNG support
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Export to JSON, PDF, TXT
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Drag & drop interface
                    </span>
                  </div>
                </div>
                <Link to="/ocr">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Try OCR Tool
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className={`rounded-lg p-8 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
        }`}>
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose KalviX?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Student-Focused</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Designed specifically for Tamil Nadu curriculum
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Languages className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tamil Language</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Native support for Tamil text and content
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scan className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced OCR</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                High-accuracy text recognition technology
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;

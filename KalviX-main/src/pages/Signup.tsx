
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Simulate signup process
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        toast({
          title: "Account Created!",
          description: "Welcome to KalviX",
        });
        navigate('/');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDarkMode ? 'bg-black' : 'bg-white'
    }`}>
      <Card className={`w-full max-w-md ${
        isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-500">KalviX</CardTitle>
          <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
          <p className={`text-center mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;

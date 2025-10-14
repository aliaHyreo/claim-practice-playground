import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const GetStarted = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate login - replace with your actual login logic
    setTimeout(() => {
      console.log('Login attempt:', { username, password });
      navigate("/search");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-md">
            <img src="/logo.png" alt="Praxis Logo" className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-slate-900">
              Welcome to Praxis
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Sign in to continue to your account
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-slate-900">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 text-base"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-900">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 text-base pr-12"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <a 
                href="#" 
                className="text-sm text-blue-600 hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </a>
            </div>

            <Button 
              onClick={handleSubmit}
              size="lg"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <a 
                href="#" 
                className="text-blue-600 font-medium hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                Sign up
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GetStarted;
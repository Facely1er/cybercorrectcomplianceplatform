import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOff, User, Building, CheckCircle, Loader2} from 'lucide-react';
import { useAuth } from '../../../shared/hooks/useAuth';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp, loading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '', name: '', organization: '', role: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    if (!formData.email || !formData.password) {
      setErrors({ general: 'Email and password are required' 
    });
      return;
    }

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: 'Passwords do not match' });
        return;
      }
      if (!formData.name || !formData.organization) {
        setErrors({ general: 'Name and organization are required for signup' });
        return;
      }
    }

    try {
      if (isSignUp) {
        const { success, error } = await signUp(formData.email, formData.password,) {
          name: formData.name, organization: formData.organization, role: formData.role });

        if (success) {
          navigate('/dashboard');
        } else {
          setErrors({ general: error || 'Failed to create account' });
        }
      } else {
        const { success, error } = await signIn(formData.email, formData.password);

        if (success) {
          navigate('/dashboard');
        } else {
          setErrors({ general: error || 'Failed to sign in' });
        }
      }
    } catch {
      setErrors({ general: 'An unexpected error occurred' });
    }
  };

  const benefits = [
    'NIST CSF v2.0 implementation guidance',
    'CMMC Level 2 certification readiness',
    'Privacy compliance (GDPR, CCPA)',
    'Real-time compliance monitoring',
    'Evidence collection and management',
    'Comprehensive reporting and analytics'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <img src="/cybercorrect.png" alt="CyberCorrect Logo" className="w-12 h-12 rounded-lg" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {isSignUp ? 'Start your compliance journey' : 'Sign in to your account'}
              </p>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-700 dark:text-red-300 text-sm">{errors.general }</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit } className="space-y-6">
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        value={formData.name }
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Organization *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        value={formData.organization }
                        onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter organization name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role
                    </label>
                    <select
                      value={formData.role }
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your role</option>
                      <option value="CISO">CISO</option>
                      <option value="Security Manager">Security Manager</option>
                      <option value="Compliance Officer">Compliance Officer</option>
                      <option value="Privacy Officer">Privacy Officer</option>
                      <option value="Risk Manager">Risk Manager</option>
                      <option value="IT Manager">IT Manager</option>
                      <option value="Consultant">Consultant</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={formData.email }
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password }
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      required
                      value={formData.confirmPassword }
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.confirmPassword ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Confirm your password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.confirmPassword }</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading }
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Switch Mode */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setErrors({});
                    setFormData({
                      email: '', password: '', confirmPassword: '', name: '', organization: '', role: ''
                    });
                  }}
                  className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </div>

            {/* Demo Access */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Continue as Demo User
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-indigo-600 items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-white/20 rounded-xl">
             <img 
      src="/cybercorrect.png" 
      alt="CyberCorrect Logo" 
      className="w-8 h-8 object-contain"
    />
            </div>
            <div>
              <h1 className="text-2xl font-bold">CyberCorrect™</h1>
              <p className="text-blue-100">Comprehensive Compliance Platform</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">
            Complete Cybersecurity Compliance Solution
          </h2>
          
          <p className="text-blue-100 mb-8 text-lg">
            Streamline your compliance journey across NIST CSF v2.0, CMMC, and Privacy regulations 
            with our comprehensive assessment and implementation platform.
          </p>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index } className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-blue-100">{benefit }</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold mb-3">Trusted by compliance professionals</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-blue-200">Frameworks</div>
              </div>
              <div>
                <div className="text-2xl font-bold">300+</div>
                <div className="text-xs text-blue-200">Controls</div>
              </div>
              <div>
                <div className="text-2xl font-bold">6</div>
                <div className="text-xs text-blue-200">Functions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
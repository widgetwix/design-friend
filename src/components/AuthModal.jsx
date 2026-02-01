import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, signUp, signInWithGoogle, signInWithFacebook, error: authError } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Name validation (only for signup)
    if (mode === 'signup' && !name) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
      }
      onClose();
      resetForm();
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
      onClose();
      resetForm();
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsSubmitting(true);
    try {
      await signInWithFacebook();
      onClose();
      resetForm();
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setErrors({});
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="relative bg-[#F2E6DF] border border-[#1A1A1A] shadow-xl w-full max-w-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 p-1 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8 pt-12">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-[#1A1A1A] font-headline italic">
                    {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-xs text-[#1A1A1A]/50 mt-3 font-mono uppercase tracking-wider leading-relaxed">
                    {mode === 'signin'
                      ? 'Sign in to continue your design journey'
                      : 'Join Design Friend to discover your style'
                    }
                  </p>
                </div>

                {/* Social buttons */}
                <div className="space-y-3 mb-6">
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 border border-[#1A1A1A] bg-transparent hover:bg-[#1A1A1A]/5 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]">Continue with Google</span>
                  </button>

                  <button
                    onClick={handleFacebookSignIn}
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 border border-[#1A1A1A] bg-transparent hover:bg-[#1A1A1A]/5 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]">Continue with Facebook</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#1A1A1A]/20" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-[#F2E6DF] text-[#1A1A1A]/40 font-mono uppercase tracking-wider text-xs">or</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {mode === 'signup' && (
                    <div>
                      <label htmlFor="auth-name" className="block text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/60 mb-2">
                        Full Name
                      </label>
                      <input
                        id="auth-name"
                        type="text"
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`w-full px-0 py-2 border-b bg-transparent focus:outline-none text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 ${
                          errors.name ? 'border-[#C84C35]' : 'border-[#1A1A1A]/30 focus:border-[#1A1A1A]'
                        }`}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-[#C84C35]">{errors.name}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label htmlFor="auth-email" className="block text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/60 mb-2">
                      Email Address
                    </label>
                    <input
                      id="auth-email"
                      type="email"
                      placeholder="YOUR@EMAIL.COM"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full px-0 py-2 border-b bg-transparent focus:outline-none text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 placeholder:text-sm ${
                        errors.email ? 'border-[#C84C35]' : 'border-[#1A1A1A]/30 focus:border-[#1A1A1A]'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-[#C84C35]">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="auth-password" className="block text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/60 mb-2">
                      Password
                    </label>
                    <input
                      id="auth-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-invalid={errors.password ? 'true' : 'false'}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                      className={`w-full px-0 py-2 border-b bg-transparent focus:outline-none text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 ${
                        errors.password ? 'border-[#C84C35]' : 'border-[#1A1A1A]/30 focus:border-[#1A1A1A]'
                      }`}
                    />
                    {errors.password && (
                      <p id="password-error" className="mt-1 text-xs text-[#C84C35]">{errors.password}</p>
                    )}
                  </div>

                  {(errors.submit || authError) && (
                    <p className="text-xs text-[#C84C35] text-center">
                      {errors.submit || authError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 mt-2 bg-[#C84C35] text-[#F2E6DF] text-sm font-mono uppercase tracking-wider hover:bg-[#C84C35]/90 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#C84C35] focus:ring-offset-2"
                  >
                    {isSubmitting ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
                  </button>
                </form>

                {/* Switch mode */}
                <p className="mt-8 text-center text-xs text-[#1A1A1A]/50">
                  {mode === 'signin' ? (
                    <>
                      Don't have an account?{' '}
                      <button
                        onClick={switchMode}
                        className="text-[#C84C35] font-medium uppercase tracking-wider hover:underline focus:outline-none focus:ring-2 focus:ring-[#C84C35]"
                      >
                        Create One
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button
                        onClick={switchMode}
                        className="text-[#C84C35] font-medium uppercase tracking-wider hover:underline focus:outline-none focus:ring-2 focus:ring-[#C84C35]"
                      >
                        Sign In
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

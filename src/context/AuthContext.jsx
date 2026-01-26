import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

// Simulated user storage (replace with Firebase in production)
const STORAGE_KEY = 'design_friend_user';
const USERS_KEY = 'design_friend_users';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Get stored users database
  const getUsers = useCallback(() => {
    try {
      const users = localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : {};
    } catch {
      return {};
    }
  }, []);

  // Save user to storage
  const saveUser = useCallback((userData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  }, []);

  // Sign up with email and password
  const signUp = useCallback(async (email, password, displayName) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const users = getUsers();

      // Check if user already exists
      if (users[email]) {
        throw new Error('An account with this email already exists');
      }

      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        displayName,
        photoURL: null,
        createdAt: new Date().toISOString(),
      };

      // Store user in "database"
      users[email] = { ...newUser, password };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      // Save session
      saveUser(newUser);

      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [getUsers, saveUser]);

  // Sign in with email and password
  const signIn = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const users = getUsers();
      const storedUser = users[email];

      if (!storedUser || storedUser.password !== password) {
        throw new Error('Invalid email or password');
      }

      // Remove password from user object before saving to session
      const { password: _, ...userData } = storedUser;
      saveUser(userData);

      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [getUsers, saveUser]);

  // Sign out
  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sign in with Google (simulated)
  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate OAuth flow delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // In production, this would use Firebase Google Auth
      // For now, create a mock Google user
      const googleUser = {
        id: `google_${Date.now()}`,
        email: `user${Date.now()}@gmail.com`,
        displayName: 'Google User',
        photoURL: 'https://lh3.googleusercontent.com/a/default-user',
        provider: 'google',
        createdAt: new Date().toISOString(),
      };

      saveUser(googleUser);
      return googleUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [saveUser]);

  // Sign in with Facebook (simulated)
  const signInWithFacebook = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate OAuth flow delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // In production, this would use Firebase Facebook Auth
      // For now, create a mock Facebook user
      const facebookUser = {
        id: `facebook_${Date.now()}`,
        email: `user${Date.now()}@facebook.com`,
        displayName: 'Facebook User',
        photoURL: 'https://graph.facebook.com/default/picture',
        provider: 'facebook',
        createdAt: new Date().toISOString(),
      };

      saveUser(facebookUser);
      return facebookUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [saveUser]);

  // Update user profile
  const updateProfile = useCallback(async (updates) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    saveUser(updatedUser);

    // Also update in users "database"
    const users = getUsers();
    if (users[user.email]) {
      users[user.email] = { ...users[user.email], ...updates };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    return updatedUser;
  }, [user, saveUser, getUsers]);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    signInWithFacebook,
    updateProfile,
    clearError: () => setError(null),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;

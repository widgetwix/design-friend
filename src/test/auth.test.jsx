import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Test component to access auth context
function TestAuthConsumer() {
  const { user, isAuthenticated, isLoading, signUp, signIn, signOut, signInWithGoogle, signInWithFacebook } = useAuth();

  return (
    <div>
      <div data-testid="loading">{isLoading ? 'loading' : 'ready'}</div>
      <div data-testid="authenticated">{isAuthenticated ? 'true' : 'false'}</div>
      <div data-testid="user-email">{user?.email || 'none'}</div>
      <div data-testid="user-name">{user?.displayName || 'none'}</div>
      <button onClick={() => signUp('test@example.com', 'password123', 'Test User')}>Sign Up</button>
      <button onClick={() => signIn('test@example.com', 'password123')}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
      <button onClick={signInWithGoogle}>Google Sign In</button>
      <button onClick={signInWithFacebook}>Facebook Sign In</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should start with unauthenticated state', () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user-email')).toHaveTextContent('none');
  });

  it('should provide signUp function', async () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    const signUpButton = screen.getByText('Sign Up');
    expect(signUpButton).toBeInTheDocument();
  });

  it('should provide signIn function', () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    const signInButton = screen.getByText('Sign In');
    expect(signInButton).toBeInTheDocument();
  });

  it('should provide signOut function', () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    const signOutButton = screen.getByText('Sign Out');
    expect(signOutButton).toBeInTheDocument();
  });

  it('should provide Google sign in function', () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    const googleButton = screen.getByText('Google Sign In');
    expect(googleButton).toBeInTheDocument();
  });

  it('should provide Facebook sign in function', () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    const facebookButton = screen.getByText('Facebook Sign In');
    expect(facebookButton).toBeInTheDocument();
  });

  it('should update user state after successful sign up', async () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    const signUpButton = screen.getByText('Sign Up');
    await userEvent.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });

    expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');
    expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');
  });

  it('should update user state after successful sign in', async () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    const signInButton = screen.getByText('Sign In');
    await userEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });
  });

  it('should clear user state after sign out', async () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    // First sign in
    await userEvent.click(screen.getByText('Sign In'));
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });

    // Then sign out
    await userEvent.click(screen.getByText('Sign Out'));
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('user-email')).toHaveTextContent('none');
  });
});

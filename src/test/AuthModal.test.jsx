import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthModal from '../components/AuthModal';
import { AuthProvider } from '../context/AuthContext';

const renderWithAuth = (component) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('AuthModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render sign in form by default', () => {
    renderWithAuth(<AuthModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should switch to sign up form when clicking create account', async () => {
    renderWithAuth(<AuthModal isOpen={true} onClose={mockOnClose} />);

    const createAccountLink = screen.getByText(/create one/i);
    await userEvent.click(createAccountLink);

    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  });

  it('should show Google sign in button', () => {
    renderWithAuth(<AuthModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText(/continue with google/i)).toBeInTheDocument();
  });

  it('should show Facebook sign in button', () => {
    renderWithAuth(<AuthModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText(/continue with facebook/i)).toBeInTheDocument();
  });

  it('should have email input with proper validation attributes', () => {
    renderWithAuth(<AuthModal isOpen={true} onClose={mockOnClose} />);

    const emailInput = screen.getByLabelText(/email address/i);

    // Verify the email input exists and has proper type for browser validation
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('should validate password length', async () => {
    renderWithAuth(<AuthModal isOpen={true} onClose={mockOnClose} />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '123');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('should require name field when signing up', async () => {
    renderWithAuth(<AuthModal isOpen={true} onClose={mockOnClose} />);

    // Switch to sign up
    await userEvent.click(screen.getByText(/create one/i));

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });
  });

  it('should call onClose when clicking close button', async () => {
    renderWithAuth(<AuthModal isOpen={true} onClose={mockOnClose} />);

    const closeButton = screen.getByLabelText(/close/i);
    await userEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should not render when isOpen is false', () => {
    renderWithAuth(<AuthModal isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByText('Welcome Back')).not.toBeInTheDocument();
  });

  it('should show loading state during submission', async () => {
    renderWithAuth(<AuthModal isOpen={true} onClose={mockOnClose} />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    // Button should show loading state
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });
});

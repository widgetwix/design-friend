import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileDisplay from '../components/ProfileDisplay';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Mock the useAuth hook for testing different states
vi.mock('../context/AuthContext', async () => {
  const actual = await vi.importActual('../context/AuthContext');
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

describe('ProfileDisplay', () => {
  const mockSignOut = vi.fn();
  const mockOnLoginClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show login button when user is not authenticated', () => {
    useAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      signOut: mockSignOut,
    });

    render(<ProfileDisplay onLoginClick={mockOnLoginClick} />);

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('should call onLoginClick when login button is clicked', async () => {
    useAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      signOut: mockSignOut,
    });

    render(<ProfileDisplay onLoginClick={mockOnLoginClick} />);

    await userEvent.click(screen.getByText(/sign in/i));
    expect(mockOnLoginClick).toHaveBeenCalled();
  });

  it('should show user avatar when authenticated', () => {
    useAuth.mockReturnValue({
      user: {
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'https://example.com/photo.jpg',
      },
      isAuthenticated: true,
      signOut: mockSignOut,
    });

    render(<ProfileDisplay onLoginClick={mockOnLoginClick} />);

    const avatar = screen.getByAltText(/profile/i);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  it('should show initials when user has no photo', () => {
    useAuth.mockReturnValue({
      user: {
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: null,
      },
      isAuthenticated: true,
      signOut: mockSignOut,
    });

    render(<ProfileDisplay onLoginClick={mockOnLoginClick} />);

    // Should show initials "TU" for "Test User"
    expect(screen.getByText('TU')).toBeInTheDocument();
  });

  it('should show dropdown menu when clicking on avatar', async () => {
    useAuth.mockReturnValue({
      user: {
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: null,
      },
      isAuthenticated: true,
      signOut: mockSignOut,
    });

    render(<ProfileDisplay onLoginClick={mockOnLoginClick} />);

    await userEvent.click(screen.getByText('TU'));

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('should call signOut when clicking sign out in dropdown', async () => {
    useAuth.mockReturnValue({
      user: {
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: null,
      },
      isAuthenticated: true,
      signOut: mockSignOut,
    });

    render(<ProfileDisplay onLoginClick={mockOnLoginClick} />);

    // Open dropdown
    await userEvent.click(screen.getByText('TU'));

    // Click sign out
    await userEvent.click(screen.getByText(/sign out/i));

    expect(mockSignOut).toHaveBeenCalled();
  });

  it('should close dropdown when clicking outside', async () => {
    useAuth.mockReturnValue({
      user: {
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: null,
      },
      isAuthenticated: true,
      signOut: mockSignOut,
    });

    render(
      <div>
        <ProfileDisplay onLoginClick={mockOnLoginClick} />
        <div data-testid="outside">Outside</div>
      </div>
    );

    // Open dropdown
    await userEvent.click(screen.getByText('TU'));
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();

    // Click outside
    await userEvent.click(screen.getByTestId('outside'));

    await waitFor(() => {
      expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
    });
  });

  it('should display in upper right corner with proper positioning', () => {
    useAuth.mockReturnValue({
      user: {
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: null,
      },
      isAuthenticated: true,
      signOut: mockSignOut,
    });

    render(<ProfileDisplay onLoginClick={mockOnLoginClick} />);

    const container = screen.getByTestId('profile-display');
    expect(container).toHaveClass('absolute');
    expect(container).toHaveClass('right-4');
    expect(container).toHaveClass('top-4');
  });
});

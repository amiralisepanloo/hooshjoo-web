import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';

// Mock the useLogout hook
jest.mock('../hooks/useLogout', () => ({
  useLogout: () => ({ logout: jest.fn() })
}));

const renderWithAuthContext = (ui, authValue) => {
  return render(
    <AuthContext.Provider value={authValue}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

describe('Navbar Component', () => {
  test('renders the logo', () => {
    renderWithAuthContext(<Navbar />, { user: null });
    const logoElement = screen.getByText(/hooshjoo/i);
    expect(logoElement).toBeInTheDocument();
  });

  test('shows login and signup when user is not logged in', () => {
    renderWithAuthContext(<Navbar />, { user: null });
    const loginLink = screen.getByText(/login/i);
    const signupLink = screen.getByText(/signup/i);
    expect(loginLink).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
  });

  test('shows logout when user is logged in', () => {
    renderWithAuthContext(<Navbar />, { 
      user: { displayName: 'Test User', photoURL: null } 
    });
    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
  });

  test('displays user name when logged in', () => {
    renderWithAuthContext(<Navbar />, { 
      user: { displayName: 'Test User', photoURL: null } 
    });
    const userNameElement = screen.getByText(/test user/i);
    expect(userNameElement).toBeInTheDocument();
  });
});

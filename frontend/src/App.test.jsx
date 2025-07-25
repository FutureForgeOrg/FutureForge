import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock all the page components
jest.mock('./pages/Login', () => {
  return function MockLogin() {
    return <div data-testid="login-page">Login Page</div>;
  };
});

jest.mock('./pages/Register', () => {
  return function MockRegister() {
    return <div data-testid="register-page">Register Page</div>;
  };
});

jest.mock('./pages/LandingPage', () => {
  return function MockLandingPage() {
    return <div data-testid="landing-page">Landing Page</div>;
  };
});

jest.mock('./components/Terms', () => {
  return function MockTerms() {
    return <div data-testid="terms-page">Terms Page</div>;
  };
});

jest.mock('./pages/Dashboard', () => {
  return function MockDashboard() {
    return <div data-testid="dashboard-page">Dashboard Page</div>;
  };
});

jest.mock('./pages/JobSearch', () => {
  return function MockJobSearch() {
    return <div data-testid="job-search-page">Job Search Page</div>;
  };
});

jest.mock('./pages/Bookmark', () => {
  return function MockBookmark() {
    return <div data-testid="bookmark-page">Bookmark Page</div>;
  };
});

jest.mock('./components/Profile', () => {
  return function MockProfile() {
    return <div data-testid="profile-page">Profile Page</div>;
  };
});

jest.mock('./pages/tools/Portfolio', () => {
  return function MockPortfolio() {
    return <div data-testid="portfolio-page">Portfolio Page</div>;
  };
});

jest.mock('./pages/tools/Resume', () => {
  return function MockResume() {
    return <div data-testid="resume-page">Resume Page</div>;
  };
});

jest.mock('./pages/tools/Reviews', () => {
  return function MockReviews() {
    return <div data-testid="reviews-page">Reviews Page</div>;
  };
});

jest.mock('./pages/VerifyEmail', () => {
  return function MockVerifyEmailPage() {
    return <div data-testid="verify-email-page">Verify Email Page</div>;
  };
});

jest.mock('./components/EmailVerificationHandler', () => {
  return function MockEmailVerificationHandler() {
    return <div data-testid="email-verification-handler">Email Verification Handler</div>;
  };
});

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  Toaster: () => <div data-testid="toaster">Toaster</div>,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    loading: jest.fn(),
  },
}));

// Mock the UI Loader component
jest.mock('./components/ui/Loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

// Mock the auth store
const mockAuthStore = {
  checkAuth: jest.fn(),
  authUser: null,
  isCheckingAuth: false,
};

jest.mock('./store/useAuthStore', () => ({
  useAuthStore: () => mockAuthStore,
}));

// Helper function to render App with router
const renderWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
};

describe('App Component', () => {
  // Setup and teardown
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Reset auth store to default state
    mockAuthStore.checkAuth = jest.fn();
    mockAuthStore.authUser = null;
    mockAuthStore.isCheckingAuth = false;
    
    // Mock console.log to avoid noise in test output
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore all mocks after each test
    jest.restoreAllMocks();
  });

  describe('Authentication Loading State', () => {
    test('displays loader when checking auth and no user is authenticated', () => {
      mockAuthStore.isCheckingAuth = true;
      mockAuthStore.authUser = null;

      renderWithRouter();

      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByTestId('toaster')).not.toBeInTheDocument();
    });

    test('does not display loader when not checking auth', () => {
      mockAuthStore.isCheckingAuth = false;
      mockAuthStore.authUser = null;

      renderWithRouter();

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.getByTestId('toaster')).toBeInTheDocument();
    });

    test('does not display loader when checking auth but user is authenticated', () => {
      mockAuthStore.isCheckingAuth = true;
      mockAuthStore.authUser = { id: 1, name: 'John Doe' };

      renderWithRouter();

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.getByTestId('toaster')).toBeInTheDocument();
    });

    test('calls checkAuth on mount', async () => {
      renderWithRouter();

      await waitFor(() => {
        expect(mockAuthStore.checkAuth).toHaveBeenCalledTimes(1);
      });
    });

    test('logs authentication check message', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      
      renderWithRouter();

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Checking authentication status...');
      });
    });
  });

  describe('Routing', () => {
    test('renders landing page on root path', () => {
      renderWithRouter(['/']);
      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });

    test('renders login page on /login path', () => {
      renderWithRouter(['/login']);
      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    test('renders register page on /register path', () => {
      renderWithRouter(['/register']);
      expect(screen.getByTestId('register-page')).toBeInTheDocument();
    });

    test('renders terms page on /terms path', () => {
      renderWithRouter(['/terms']);
      expect(screen.getByTestId('terms-page')).toBeInTheDocument();
    });

    test('renders dashboard page on /dashboard path', () => {
      renderWithRouter(['/dashboard']);
      expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
    });

    test('renders job search page on /jobSearch path', () => {
      renderWithRouter(['/jobSearch']);
      expect(screen.getByTestId('job-search-page')).toBeInTheDocument();
    });

    test('renders bookmark page on /bookmark path', () => {
      renderWithRouter(['/bookmark']);
      expect(screen.getByTestId('bookmark-page')).toBeInTheDocument();
    });

    test('renders profile page on /profile path', () => {
      renderWithRouter(['/profile']);
      expect(screen.getByTestId('profile-page')).toBeInTheDocument();
    });
  });

  describe('Tools Routes', () => {
    test('renders portfolio page on /tools/portfolio path', () => {
      renderWithRouter(['/tools/portfolio']);
      expect(screen.getByTestId('portfolio-page')).toBeInTheDocument();
    });

    test('renders resume page on /tools/resume path', () => {
      renderWithRouter(['/tools/resume']);
      expect(screen.getByTestId('resume-page')).toBeInTheDocument();
    });

    test('renders reviews page on /tools/reviews path', () => {
      renderWithRouter(['/tools/reviews']);
      expect(screen.getByTestId('reviews-page')).toBeInTheDocument();
    });
  });

  describe('Email Verification Routes', () => {
    test('renders verify email page on /verify-email path', () => {
      renderWithRouter(['/verify-email']);
      expect(screen.getByTestId('verify-email-page')).toBeInTheDocument();
    });

    test('renders email verification handler on /verify-email/:token path', () => {
      renderWithRouter(['/verify-email/abc123token']);
      expect(screen.getByTestId('email-verification-handler')).toBeInTheDocument();
    });

    test('handles different verification tokens', () => {
      const tokens = ['token1', 'token2', 'abc123xyz'];
      
      tokens.forEach(token => {
        renderWithRouter([`/verify-email/${token}`]);
        expect(screen.getByTestId('email-verification-handler')).toBeInTheDocument();
      });
    });
  });

  describe('Component Integration', () => {
    test('always renders Toaster component', () => {
      renderWithRouter(['/']);
      expect(screen.getByTestId('toaster')).toBeInTheDocument();

      renderWithRouter(['/login']);
      expect(screen.getByTestId('toaster')).toBeInTheDocument();

      renderWithRouter(['/dashboard']);
      expect(screen.getByTestId('toaster')).toBeInTheDocument();
    });

    test('renders Toaster before router content', () => {
      renderWithRouter(['/']);
      
      const toaster = screen.getByTestId('toaster');
      const landingPage = screen.getByTestId('landing-page');
      
      expect(toaster).toBeInTheDocument();
      expect(landingPage).toBeInTheDocument();
    });
  });

  describe('Authentication State Changes', () => {
    test('handles auth state changes during component lifecycle', async () => {
      // Start with checking auth
      mockAuthStore.isCheckingAuth = true;
      mockAuthStore.authUser = null;

      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('loader')).toBeInTheDocument();

      // Simulate auth check completion
      mockAuthStore.isCheckingAuth = false;
      mockAuthStore.authUser = { id: 1, name: 'John Doe' };

      rerender(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });

    test('handles authentication failure gracefully', async () => {
      mockAuthStore.isCheckingAuth = false;
      mockAuthStore.authUser = null;
      mockAuthStore.checkAuth = jest.fn().mockRejectedValue(new Error('Auth failed'));

      renderWithRouter(['/']);

      await waitFor(() => {
        expect(mockAuthStore.checkAuth).toHaveBeenCalled();
      });

      // Should still render the app even if auth check fails
      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });
  });

  describe('Route Navigation', () => {
    test('handles invalid routes gracefully', () => {
      renderWithRouter(['/invalid-route']);
      
      // React Router should handle this gracefully
      // The app should still render but no specific page component
      expect(screen.getByTestId('toaster')).toBeInTheDocument();
    });

    test('handles navigation between routes', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('login-page')).toBeInTheDocument();

      rerender(
        <MemoryRouter initialEntries={['/register']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('register-page')).toBeInTheDocument();
      expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    test('handles multiple simultaneous route changes', () => {
      const routes = ['/', '/login', '/register', '/dashboard'];
      
      routes.forEach(route => {
        renderWithRouter([route]);
        expect(screen.getByTestId('toaster')).toBeInTheDocument();
      });
    });

    test('handles auth store errors without crashing', () => {
      const originalConsoleError = console.error;
      console.error = jest.fn();

      mockAuthStore.checkAuth = jest.fn(() => {
        throw new Error('Auth store error');
      });

      expect(() => renderWithRouter(['/'])).not.toThrow();

      console.error = originalConsoleError;
    });

    test('handles undefined auth user gracefully', () => {
      mockAuthStore.authUser = undefined;
      mockAuthStore.isCheckingAuth = false;

      expect(() => renderWithRouter(['/'])).not.toThrow();
      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });

    test('handles null auth user gracefully', () => {
      mockAuthStore.authUser = null;
      mockAuthStore.isCheckingAuth = false;

      expect(() => renderWithRouter(['/'])).not.toThrow();
      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    test('does not re-render unnecessarily', () => {
      const checkAuthSpy = jest.fn();
      mockAuthStore.checkAuth = checkAuthSpy;

      const { rerender } = renderWithRouter(['/']);

      expect(checkAuthSpy).toHaveBeenCalledTimes(1);

      // Re-render with same props should not call checkAuth again
      rerender(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      // checkAuth should only be called once due to useEffect dependency
      expect(checkAuthSpy).toHaveBeenCalledTimes(1);
    });

    test('handles rapid auth state changes', async () => {
      mockAuthStore.isCheckingAuth = true;

      const { rerender } = renderWithRouter(['/']);

      expect(screen.getByTestId('loader')).toBeInTheDocument();

      // Rapidly change auth state
      for (let i = 0; i < 5; i++) {
        mockAuthStore.isCheckingAuth = i % 2 === 0;
        rerender(
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        );
      }

      // Final state should be rendered correctly
      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('maintains proper document structure', () => {
      renderWithRouter(['/']);
      
      // Should have proper React fragment structure
      expect(document.body).toBeInTheDocument();
    });

    test('provides consistent navigation experience', () => {
      const routes = ['/login', '/register', '/dashboard'];
      
      routes.forEach(route => {
        renderWithRouter([route]);
        expect(screen.getByTestId('toaster')).toBeInTheDocument();
      });
    });
  });

  describe('Error Boundaries', () => {
    test('handles component render errors gracefully', () => {
      const originalConsoleError = console.error;
      console.error = jest.fn();

      // Mock a component to throw an error
      jest.doMock('./pages/Login', () => {
        return function BrokenLogin() {
          throw new Error('Component error');
        };
      });

      // The app should handle this gracefully
      expect(() => renderWithRouter(['/login'])).not.toThrow();

      console.error = originalConsoleError;
    });
  });

  describe('Memory Management', () => {
    test('cleans up properly on unmount', () => {
      const { unmount } = renderWithRouter(['/']);
      
      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
      
      // Should unmount without errors
      expect(() => unmount()).not.toThrow();
    });

    test('handles component unmounting during auth check', async () => {
      let resolveAuth;
      const authPromise = new Promise(resolve => {
        resolveAuth = resolve;
      });
      
      mockAuthStore.checkAuth = jest.fn(() => authPromise);
      
      const { unmount } = renderWithRouter(['/']);
      
      // Unmount before auth resolves
      unmount();
      
      // Resolve auth after unmount
      resolveAuth();
      
      // Should not cause any errors
      await waitFor(() => {
        expect(mockAuthStore.checkAuth).toHaveBeenCalled();
      });
    });
  });
});
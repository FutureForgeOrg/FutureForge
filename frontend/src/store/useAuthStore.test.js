import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from './useAuthStore';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';

// Mock dependencies
jest.mock('react-hot-toast');
jest.mock('../lib/axios.js');
jest.mock('react-router-dom', () => ({
  Navigate: jest.fn()
}));

describe('useAuthStore', () => {
  let mockNavigate;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    mockNavigate = jest.fn();
    
    // Reset toast mocks
    toast.success = jest.fn();
    toast.error = jest.fn();
    
    // Reset axios mock
    axiosInstance.get = jest.fn();
    axiosInstance.post = jest.fn();
    
    // Reset store state by creating a fresh instance
    useAuthStore.setState({
      authUser: null,
      isSiginingUp: false,
      isLoggingIn: false,
      isCheckingAuth: true,
      tempEmail: null
    });
  });

  describe('Initial State', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useAuthStore());
      
      expect(result.current.authUser).toBeNull();
      expect(result.current.isSiginingUp).toBe(false);
      expect(result.current.isLoggingIn).toBe(false);
      expect(result.current.isCheckingAuth).toBe(true);
      expect(result.current.tempEmail).toBeNull();
    });

    it('should have all required methods available', () => {
      const { result } = renderHook(() => useAuthStore());
      
      expect(typeof result.current.checkAuth).toBe('function');
      expect(typeof result.current.signup).toBe('function');
      expect(typeof result.current.verifyEmailToken).toBe('function');
      expect(typeof result.current.login).toBe('function');
      expect(typeof result.current.logout).toBe('function');
    });
  });

  describe('checkAuth', () => {
    it('should successfully set authenticated user when API call succeeds', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      axiosInstance.get.mockResolvedValueOnce({
        data: { user: mockUser }
      });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.checkAuth();
      });

      expect(axiosInstance.get).toHaveBeenCalledWith('/auth/check-auth');
      expect(result.current.authUser).toEqual(mockUser);
      expect(result.current.isCheckingAuth).toBe(false);
    });

    it('should set authUser to null when API call fails', async () => {
      const mockError = new Error('Unauthorized');
      axiosInstance.get.mockRejectedValueOnce(mockError);
      
      // Mock console.error to avoid test output pollution
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.checkAuth();
      });

      expect(result.current.authUser).toBeNull();
      expect(result.current.isCheckingAuth).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith('Error checking authentication:', mockError);
      
      consoleSpy.mockRestore();
    });

    it('should always set isCheckingAuth to false in finally block', async () => {
      axiosInstance.get.mockRejectedValueOnce(new Error('Network error'));
      jest.spyOn(console, 'error').mockImplementation();

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.checkAuth();
      });

      expect(result.current.isCheckingAuth).toBe(false);
      
      console.error.mockRestore();
    });

    it('should handle undefined user in response data', async () => {
      axiosInstance.get.mockResolvedValueOnce({
        data: {} // No user property
      });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.checkAuth();
      });

      expect(result.current.authUser).toBeUndefined();
      expect(result.current.isCheckingAuth).toBe(false);
    });
  });

  describe('signup', () => {
    const signupData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };

    it('should successfully sign up user and navigate to verify email', async () => {
      axiosInstance.post.mockResolvedValueOnce({
        data: { message: 'Signup successful' }
      });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.signup(signupData, mockNavigate);
      });

      expect(axiosInstance.post).toHaveBeenCalledWith('/auth/signup', signupData);
      expect(toast.success).toHaveBeenCalledWith('Signup successful');
      expect(result.current.tempEmail).toBe(signupData.email);
      expect(mockNavigate).toHaveBeenCalledWith('/verify-email');
      expect(result.current.isSiginingUp).toBe(false);
    });

    it('should set isSiginingUp to true during signup process', async () => {
      let resolveSignup;
      const signupPromise = new Promise((resolve) => {
        resolveSignup = resolve;
      });
      
      axiosInstance.post.mockReturnValueOnce(signupPromise);

      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.signup(signupData, mockNavigate);
      });

      expect(result.current.isSiginingUp).toBe(true);

      await act(async () => {
        resolveSignup({ data: { message: 'Success' } });
        await signupPromise;
      });

      expect(result.current.isSiginingUp).toBe(false);
    });

    it('should handle signup failure and show error toast', async () => {
      const mockError = new Error('Email already exists');
      axiosInstance.post.mockRejectedValueOnce(mockError);
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.signup(signupData, mockNavigate);
      });

      expect(toast.error).toHaveBeenCalledWith('Signup failed. Please try again.');
      expect(consoleSpy).toHaveBeenCalledWith('Signup error:', mockError);
      expect(result.current.isSiginingUp).toBe(false);
      expect(mockNavigate).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it('should not set authUser during signup (user not verified yet)', async () => {
      const mockUser = { id: 1, name: 'John Doe' };
      axiosInstance.post.mockResolvedValueOnce({
        data: { user: mockUser }
      });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.signup(signupData, mockNavigate);
      });

      expect(result.current.authUser).toBeNull(); // Should remain null until verified
    });

    it('should store email temporarily for verification', async () => {
      axiosInstance.post.mockResolvedValueOnce({
        data: { message: 'Success' }
      });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.signup(signupData, mockNavigate);
      });

      expect(result.current.tempEmail).toBe(signupData.email);
    });
  });

  describe('verifyEmailToken', () => {
    const mockToken = 'verification-token-123';
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

    it('should successfully verify email and navigate to dashboard', async () => {
      axiosInstance.get.mockResolvedValueOnce({
        data: { 
          user: mockUser,
          message: 'Email verified successfully!'
        }
      });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.verifyEmailToken(mockToken, mockNavigate);
      });

      expect(axiosInstance.get).toHaveBeenCalledWith(`/auth/verify-email/${mockToken}`);
      expect(result.current.authUser).toEqual(mockUser);
      expect(toast.success).toHaveBeenCalledWith('Email verified successfully!');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    it('should use default success message when none provided', async () => {
      axiosInstance.get.mockResolvedValueOnce({
        data: { user: mockUser }
      });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.verifyEmailToken(mockToken, mockNavigate);
      });

      expect(toast.success).toHaveBeenCalledWith('Email verified!');
    });

    it('should handle verification failure and navigate to login', async () => {
      const mockError = {
        response: {
          data: { message: 'Invalid verification token' }
        }
      };
      axiosInstance.get.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.verifyEmailToken(mockToken, mockNavigate);
      });

      expect(toast.error).toHaveBeenCalledWith('Invalid verification token');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
      expect(result.current.authUser).toBeNull();
    });

    it('should use default error message when error response is malformed', async () => {
      const mockError = new Error('Network error');
      axiosInstance.get.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.verifyEmailToken(mockToken, mockNavigate);
      });

      expect(toast.error).toHaveBeenCalledWith('Invalid/expired token');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('should handle empty token gracefully', async () => {
      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.verifyEmailToken('', mockNavigate);
      });

      expect(axiosInstance.get).toHaveBeenCalledWith('/auth/verify-email/');
    });
  });

  describe('login', () => {
    const loginData = {
      email: 'john@example.com',
      password: 'password123'
    };
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

    it('should successfully log in user and navigate to dashboard', async () => {
      axiosInstance.post.mockResolvedValueOnce({
        data: { user: mockUser }
      });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login(loginData, mockNavigate);
      });

      expect(axiosInstance.post).toHaveBeenCalledWith('/auth/login', loginData);
      expect(result.current.authUser).toEqual(mockUser);
      expect(toast.success).toHaveBeenCalledWith('Login successful');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      expect(result.current.isLoggingIn).toBe(false);
    });

    it('should set isLoggingIn to true during login process', async () => {
      let resolveLogin;
      const loginPromise = new Promise((resolve) => {
        resolveLogin = resolve;
      });
      
      axiosInstance.post.mockReturnValueOnce(loginPromise);

      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.login(loginData, mockNavigate);
      });

      expect(result.current.isLoggingIn).toBe(true);

      await act(async () => {
        resolveLogin({ data: { user: mockUser } });
        await loginPromise;
      });

      expect(result.current.isLoggingIn).toBe(false);
    });

    it('should handle login failure and show error toast', async () => {
      const mockError = new Error('Invalid credentials');
      axiosInstance.post.mockRejectedValueOnce(mockError);
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login(loginData, mockNavigate);
      });

      expect(toast.error).toHaveBeenCalledWith('Login failed. Please check your credentials.');
      expect(consoleSpy).toHaveBeenCalledWith('Login error:', mockError);
      expect(result.current.isLoggingIn).toBe(false);
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(result.current.authUser).toBeNull();
      
      consoleSpy.mockRestore();
    });

    it('should always set isLoggingIn to false in finally block', async () => {
      axiosInstance.post.mockRejectedValueOnce(new Error('Network error'));
      jest.spyOn(console, 'error').mockImplementation();

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login(loginData, mockNavigate);
      });

      expect(result.current.isLoggingIn).toBe(false);
      
      console.error.mockRestore();
    });

    it('should handle undefined user in login response', async () => {
      axiosInstance.post.mockResolvedValueOnce({
        data: {} // No user property
      });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login(loginData, mockNavigate);
      });

      expect(result.current.authUser).toBeUndefined();
      expect(toast.success).toHaveBeenCalledWith('Login successful');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  describe('logout', () => {
    it('should successfully log out user and show success toast', async () => {
      axiosInstance.post.mockResolvedValueOnce({
        data: { message: 'Logged out successfully' }
      });

      const { result } = renderHook(() => useAuthStore());
      
      // Set initial authenticated state
      act(() => {
        useAuthStore.setState({ authUser: { id: 1, name: 'John' } });
      });

      await act(async () => {
        await result.current.logout();
      });

      expect(axiosInstance.post).toHaveBeenCalledWith('/auth/logout');
      expect(result.current.authUser).toBeNull();
      expect(toast.success).toHaveBeenCalledWith('Logout successful');
    });

    it('should handle logout failure and show error toast', async () => {
      const mockError = new Error('Logout failed');
      axiosInstance.post.mockRejectedValueOnce(mockError);
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.logout();
      });

      expect(toast.error).toHaveBeenCalledWith('Logout failed. Please try again.');
      expect(consoleSpy).toHaveBeenCalledWith('Logout error:', mockError);
      
      consoleSpy.mockRestore();
    });

    it('should clear authUser even when API call fails', async () => {
      axiosInstance.post.mockRejectedValueOnce(new Error('Server error'));
      jest.spyOn(console, 'error').mockImplementation();

      const { result } = renderHook(() => useAuthStore());
      
      // Set initial authenticated state
      act(() => {
        useAuthStore.setState({ authUser: { id: 1, name: 'John' } });
      });

      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.authUser).toBeNull();
      
      console.error.mockRestore();
    });

    it('should handle logout when user is not authenticated', async () => {
      axiosInstance.post.mockResolvedValueOnce({});

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.authUser).toBeNull();
      expect(toast.success).toHaveBeenCalledWith('Logout successful');
    });
  });

  describe('State Management', () => {
    it('should maintain state consistency across multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useAuthStore());
      const { result: result2 } = renderHook(() => useAuthStore());

      act(() => {
        useAuthStore.setState({ authUser: { id: 1, name: 'John' } });
      });

      expect(result1.current.authUser).toEqual({ id: 1, name: 'John' });
      expect(result2.current.authUser).toEqual({ id: 1, name: 'John' });
    });

    it('should handle concurrent operations gracefully', async () => {
      const mockUser = { id: 1, name: 'John' };
      axiosInstance.post.mockResolvedValue({ data: { user: mockUser } });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        const promises = [
          result.current.login({ email: 'john@example.com', password: 'pass' }, mockNavigate),
          result.current.signup({ name: 'John', email: 'john@example.com', password: 'pass' }, mockNavigate)
        ];
        await Promise.all(promises);
      });

      // Should handle without throwing errors
      expect(result.current.authUser).toBeDefined();
    });

    it('should reset loading states properly after operations', async () => {
      axiosInstance.post.mockResolvedValueOnce({ data: { user: { id: 1 } } });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login({ email: 'test@test.com', password: 'pass' }, mockNavigate);
      });

      expect(result.current.isLoggingIn).toBe(false);

      await act(async () => {
        await result.current.signup({ name: 'Test', email: 'test@test.com', password: 'pass' }, mockNavigate);
      });

      expect(result.current.isSiginingUp).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null navigate function gracefully', async () => {
      axiosInstance.post.mockResolvedValueOnce({ data: { user: { id: 1 } } });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login({ email: 'test@test.com', password: 'pass' }, null);
      });

      // Should not throw error even with null navigate
      expect(result.current.authUser).toEqual({ id: 1 });
    });

    it('should handle malformed API responses', async () => {
      axiosInstance.get.mockResolvedValueOnce(null);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.checkAuth();
      });

      expect(result.current.isCheckingAuth).toBe(false);
    });

    it('should handle axios instance being undefined', async () => {
      const originalAxios = axiosInstance.get;
      axiosInstance.get = undefined;

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        try {
          await result.current.checkAuth();
        } catch (error) {
          expect(error).toBeDefined();
        }
      });

      axiosInstance.get = originalAxios;
    });

    it('should handle empty or invalid data in signup', async () => {
      axiosInstance.post.mockResolvedValueOnce({ data: { user: { id: 1 } } });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.signup({}, mockNavigate);
      });

      expect(result.current.tempEmail).toBeUndefined();
    });

    it('should handle network timeouts gracefully', async () => {
      const timeoutError = new Error('Network Timeout');
      timeoutError.code = 'NETWORK_ERROR';
      axiosInstance.post.mockRejectedValueOnce(timeoutError);
      
      jest.spyOn(console, 'error').mockImplementation();

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login({ email: 'test@test.com', password: 'pass' }, mockNavigate);
      });

      expect(toast.error).toHaveBeenCalledWith('Login failed. Please check your credentials.');
      
      console.error.mockRestore();
    });
  });

  describe('Integration Flow', () => {
    it('should handle complete user flow: signup -> verify -> login -> logout', async () => {
      const { result } = renderHook(() => useAuthStore());
      const userData = { name: 'John Doe', email: 'john@example.com', password: 'pass123' };
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

      // Signup
      axiosInstance.post.mockResolvedValueOnce({ data: { message: 'Signup successful' } });
      
      await act(async () => {
        await result.current.signup(userData, mockNavigate);
      });

      expect(result.current.tempEmail).toBe(userData.email);
      expect(mockNavigate).toHaveBeenCalledWith('/verify-email');

      // Verify email
      axiosInstance.get.mockResolvedValueOnce({ data: { user: mockUser, message: 'Verified!' } });
      
      await act(async () => {
        await result.current.verifyEmailToken('token123', mockNavigate);
      });

      expect(result.current.authUser).toEqual(mockUser);
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');

      // Logout
      axiosInstance.post.mockResolvedValueOnce({ data: { message: 'Logged out' } });
      
      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.authUser).toBeNull();

      // Login again
      axiosInstance.post.mockResolvedValueOnce({ data: { user: mockUser } });
      
      await act(async () => {
        await result.current.login({ email: userData.email, password: userData.password }, mockNavigate);
      });

      expect(result.current.authUser).toEqual(mockUser);
    });
  });
});
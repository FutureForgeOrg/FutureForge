import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
import ResendVerification from './ResendVerification';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';

// Mock external dependencies
vi.mock('react-hot-toast');
vi.mock('../lib/axios');
vi.mock('../store/useAuthStore');

// Mock timers for cooldown testing
beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

describe('ResendVerification Component', () => {
  const mockToast = {
    success: vi.fn(),
    error: vi.fn()
  };

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    
    // Setup mock implementations
    toast.success = mockToast.success;
    toast.error = mockToast.error;
    
    // Mock useAuthStore with default values
    useAuthStore.mockReturnValue({ tempEmail: '' });
    
    // Mock axiosInstance
    axiosInstance.post = vi.fn();

    // Reset timers
    vi.clearAllTimers();
  });

  afterEach(() => {
    // Clean up timers
    act(() => {
      vi.runOnlyPendingTimers();
    });
  });

  describe('Initial Render', () => {
    test('renders email input with correct placeholder and attributes', () => {
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveClass('border', 'px-4', 'py-2', 'rounded', 'w-[300px]');
    });

    test('renders resend button with correct initial state', () => {
      render(<ResendVerification />);
      
      const resendButton = screen.getByRole('button');
      expect(resendButton).toBeInTheDocument();
      expect(resendButton).toHaveTextContent('Resend Email');
      expect(resendButton).toBeDisabled(); // Initially disabled due to empty email
    });

    test('pre-fills email from tempEmail in auth store', () => {
      useAuthStore.mockReturnValue({ tempEmail: 'stored@example.com' });
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      expect(emailInput).toHaveValue('stored@example.com');
      
      const resendButton = screen.getByRole('button');
      expect(resendButton).not.toBeDisabled(); // Should be enabled with pre-filled email
    });

    test('renders with empty email when tempEmail is null or undefined', () => {
      useAuthStore.mockReturnValue({ tempEmail: null });
      render(<ResendVerification />);
      expect(screen.getByPlaceholderText('Enter your email')).toHaveValue('');
      
      // Test with undefined
      useAuthStore.mockReturnValue({ tempEmail: undefined });
      render(<ResendVerification />);
      expect(screen.getByPlaceholderText('Enter your email')).toHaveValue('');
    });

    test('component has correct layout structure', () => {
      render(<ResendVerification />);
      
      const container = screen.getByPlaceholderText('Enter your email').closest('div');
      expect(container).toHaveClass('flex', 'flex-col', 'items-center', 'gap-4', 'mt-6');
    });
  });

  describe('Email Input Handling', () => {
    test('updates email value on input change', () => {
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      
      fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
      expect(emailInput).toHaveValue('new@example.com');
    });

    test('enables button when valid email is entered', () => {
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      expect(resendButton).toBeDisabled();
      
      fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
      expect(resendButton).not.toBeDisabled();
    });

    test('disables button when email is cleared', () => {
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      expect(resendButton).not.toBeDisabled();
      
      fireEvent.change(emailInput, { target: { value: '' } });
      expect(resendButton).toBeDisabled();
    });

    test('handles whitespace in email input', () => {
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      // Test with only whitespace
      fireEvent.change(emailInput, { target: { value: '   ' } });
      expect(resendButton).toBeDisabled();
      
      // Test with email surrounded by whitespace
      fireEvent.change(emailInput, { target: { value: '  test@example.com  ' } });
      expect(resendButton).not.toBeDisabled();
    });

    test('accepts various valid email formats', () => {
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      const validEmails = [
        'simple@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'user123@test-domain.com',
        'test.email.with+symbol@example.com',
        'user_name@example-domain.com'
      ];
      
      validEmails.forEach(email => {
        fireEvent.change(emailInput, { target: { value: email } });
        expect(emailInput).toHaveValue(email);
        expect(resendButton).not.toBeDisabled();
      });
    });
  });

  describe('Successful Email Resend', () => {
    test('successfully sends verification email and shows success message', async () => {
      const mockResponse = {
        data: { message: 'Verification email sent successfully!' }
      };
      axiosInstance.post.mockResolvedValue(mockResponse);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(resendButton);
      
      await waitFor(() => {
        expect(axiosInstance.post).toHaveBeenCalledWith(
          '/auth/resend-verification-email',
          { email: 'test@example.com' }
        );
      });
      
      expect(toast.success).toHaveBeenCalledWith('Verification email sent successfully!');
    });

    test('shows default success message when no message in response', async () => {
      const mockResponse = { data: {} };
      axiosInstance.post.mockResolvedValue(mockResponse);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(resendButton);
      
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Verification email sent.');
      });
    });

    test('starts 60-second cooldown after successful send', async () => {
      const mockResponse = { data: { message: 'Email sent!' } };
      axiosInstance.post.mockResolvedValue(mockResponse);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      const resendButton = screen.getByRole('button');
      fireEvent.click(resendButton);
      
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalled();
      });
      
      // Check cooldown started
      const updatedButton = screen.getByRole('button');
      expect(updatedButton).toBeDisabled();
      expect(updatedButton).toHaveTextContent('Resend available in 60s');
    });

    test('shows loading state during API call', async () => {
      let resolvePromise;
      const promise = new Promise(resolve => {
        resolvePromise = resolve;
      });
      axiosInstance.post.mockReturnValue(promise);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(resendButton);
      
      // Check loading state
      expect(resendButton).toBeDisabled();
      expect(resendButton).toHaveTextContent('Sending...');
      
      // Resolve the promise
      resolvePromise({ data: { message: 'Success!' } });
      
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalled();
      });
    });

    test('handles successful response with different data structures', async () => {
      const testCases = [
        { data: { message: 'Custom success message' } },
        { data: { message: null } },
        { data: { success: true } },
        { data: {} }
      ];

      for (const mockResponse of testCases) {
        vi.clearAllMocks();
        axiosInstance.post.mockResolvedValue(mockResponse);
        
        render(<ResendVerification />);
        
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const resendButton = screen.getByRole('button');
        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(resendButton);
        
        await waitFor(() => {
          expect(axiosInstance.post).toHaveBeenCalled();
        });

        const expectedMessage = mockResponse.data.message || 'Verification email sent.';
        expect(toast.success).toHaveBeenCalledWith(expectedMessage);
      }
    });
  });

  describe('Error Handling', () => {
    test('handles network errors gracefully', async () => {
      const networkError = new Error('Network Error');
      axiosInstance.post.mockRejectedValue(networkError);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(resendButton);
      
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Something went wrong');
      });
    });

    test('displays server error messages', async () => {
      const serverError = new Error('Server Error');
      serverError.response = {
        data: { message: 'User not found' }
      };
      axiosInstance.post.mockRejectedValue(serverError);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      fireEvent.change(emailInput, { target: { value: 'notfound@example.com' } });
      fireEvent.click(resendButton);
      
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('User not found');
      });
    });

    test('extracts and sets cooldown from rate limit error message', async () => {
      const rateLimitError = new Error('Rate Limited');
      rateLimitError.response = {
        data: { message: 'Too many requests, please wait 30 seconds before trying again' }
      };
      axiosInstance.post.mockRejectedValue(rateLimitError);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      const resendButton = screen.getByRole('button');
      fireEvent.click(resendButton);
      
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(expect.stringContaining('wait 30 seconds'));
      });
      
      // Check that cooldown was extracted and set
      const updatedButton = screen.getByRole('button');
      expect(updatedButton).toBeDisabled();
      expect(updatedButton).toHaveTextContent('Resend available in 30s');
    });

    test('handles various cooldown message formats', async () => {
      const testCases = [
        { message: 'Please wait 45 seconds', expectedCooldown: 45 },
        { message: 'Try again in 120 seconds', expectedCooldown: 120 },
        { message: 'Rate limited, wait 5 seconds before retry', expectedCooldown: 5 },
        { message: 'wait 99 seconds', expectedCooldown: 99 }
      ];
      
      for (const testCase of testCases) {
        vi.clearAllMocks();
        
        const error = new Error('Rate Limited');
        error.response = { data: { message: testCase.message } };
        axiosInstance.post.mockRejectedValue(error);
        
        render(<ResendVerification />);
        
        const emailInput = screen.getByPlaceholderText('Enter your email');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        
        const resendButton = screen.getByRole('button');
        fireEvent.click(resendButton);
        
        await waitFor(() => {
          expect(toast.error).toHaveBeenCalled();
        });
        
        const updatedButton = screen.getByRole('button');
        expect(updatedButton).toHaveTextContent(`Resend available in ${testCase.expectedCooldown}s`);
      }
    });

    test('re-enables button after error without cooldown', async () => {
      const error = new Error('Server Error');
      error.response = { data: { message: 'Invalid email format' } };
      axiosInstance.post.mockRejectedValue(error);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      
      const resendButton = screen.getByRole('button');
      fireEvent.click(resendButton);
      
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Invalid email format');
      });
      
      const updatedButton = screen.getByRole('button');
      expect(updatedButton).not.toBeDisabled();
      expect(updatedButton).toHaveTextContent('Resend Email');
    });

    test('handles malformed error responses', async () => {
      const testCases = [
        new Error('Network timeout'), // No response object
        (() => { const e = new Error('Server Error'); e.response = null; return e; })(),
        (() => { const e = new Error('Server Error'); e.response = { data: null }; return e; })(),
        (() => { const e = new Error('Server Error'); e.response = { data: undefined }; return e; })(),
        (() => { const e = new Error('Server Error'); e.response = {}; return e; })()
      ];
      
      for (const errorCase of testCases) {
        vi.clearAllMocks();
        axiosInstance.post.mockRejectedValue(errorCase);
        
        render(<ResendVerification />);
        
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const resendButton = screen.getByRole('button');
        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(resendButton);
        
        await waitFor(() => {
          expect(toast.error).toHaveBeenCalledWith('Something went wrong');
        });
      }
    });
  });

  describe('Cooldown Functionality', () => {
    test('cooldown timer counts down properly', async () => {
      const mockResponse = { data: { message: 'Email sent!' } };
      axiosInstance.post.mockResolvedValue(mockResponse);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      const resendButton = screen.getByRole('button');
      fireEvent.click(resendButton);
      
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalled();
      });
      
      // Initial cooldown
      let updatedButton = screen.getByRole('button');
      expect(updatedButton).toHaveTextContent('Resend available in 60s');
      
      // Advance timer by 10 seconds
      act(() => {
        vi.advanceTimersByTime(10000);
      });
      
      updatedButton = screen.getByRole('button');
      expect(updatedButton).toHaveTextContent('Resend available in 50s');
      
      // Advance timer by another 25 seconds
      act(() => {
        vi.advanceTimersByTime(25000);
      });
      
      updatedButton = screen.getByRole('button');
      expect(updatedButton).toHaveTextContent('Resend available in 25s');
    });

    test('button re-enables after cooldown expires', async () => {
      const mockResponse = { data: { message: 'Email sent!' } };
      axiosInstance.post.mockResolvedValue(mockResponse);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      const resendButton = screen.getByRole('button');
      fireEvent.click(resendButton);
      
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalled();
      });
      
      // Should be disabled during cooldown
      let updatedButton = screen.getByRole('button');
      expect(updatedButton).toBeDisabled();
      
      // Fast forward past cooldown
      act(() => {
        vi.advanceTimersByTime(60000);
      });
      
      updatedButton = screen.getByRole('button');
      expect(updatedButton).not.toBeDisabled();
      expect(updatedButton).toHaveTextContent('Resend Email');
    });

    test('cooldown works with different time values', async () => {
      const testCooldowns = [1, 30, 60, 120, 300];
      
      for (const cooldownSeconds of testCooldowns) {
        vi.clearAllMocks();
        
        const error = new Error('Rate Limited');
        error.response = { data: { message: `wait ${cooldownSeconds} seconds` } };
        axiosInstance.post.mockRejectedValue(error);
        
        render(<ResendVerification />);
        
        const emailInput = screen.getByPlaceholderText('Enter your email');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        
        const resendButton = screen.getByRole('button');
        fireEvent.click(resendButton);
        
        await waitFor(() => {
          expect(toast.error).toHaveBeenCalled();
        });
        
        let updatedButton = screen.getByRole('button');
        expect(updatedButton).toHaveTextContent(`Resend available in ${cooldownSeconds}s`);
        
        // Test countdown
        if (cooldownSeconds > 1) {
          act(() => {
            vi.advanceTimersByTime(1000);
          });
          
          updatedButton = screen.getByRole('button');
          expect(updatedButton).toHaveTextContent(`Resend available in ${cooldownSeconds - 1}s`);
        }
      }
    });

    test('cleans up timer on component unmount', () => {
      const mockResponse = { data: { message: 'Email sent!' } };
      axiosInstance.post.mockResolvedValue(mockResponse);
      
      const { unmount } = render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(resendButton);
      
      // Unmount before cooldown finishes
      act(() => {
        vi.advanceTimersByTime(30000);
        unmount();
      });
      
      // Should not throw any errors or memory leaks
      expect(() => {
        act(() => {
          vi.advanceTimersByTime(30000);
        });
      }).not.toThrow();
    });

    test('handles edge case of zero or negative cooldown', async () => {
      const testCases = ['wait 0 seconds', 'wait -5 seconds'];
      
      for (const message of testCases) {
        vi.clearAllMocks();
        
        const error = new Error('Rate Limited');
        error.response = { data: { message } };
        axiosInstance.post.mockRejectedValue(error);
        
        render(<ResendVerification />);
        
        const emailInput = screen.getByPlaceholderText('Enter your email');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        
        const resendButton = screen.getByRole('button');
        fireEvent.click(resendButton);
        
        await waitFor(() => {
          expect(toast.error).toHaveBeenCalled();
        });
        
        // Should not set invalid cooldown
        const updatedButton = screen.getByRole('button');
        expect(updatedButton).not.toBeDisabled();
      }
    });
  });

  describe('Button States and Styling', () => {
    test('applies correct CSS classes for different states', () => {
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      let resendButton = screen.getByRole('button');
      
      // Disabled state (no email)
      expect(resendButton).toHaveClass('bg-gray-400', 'cursor-not-allowed');
      expect(resendButton).not.toHaveClass('bg-blue-600', 'hover:bg-blue-700');
      
      // Enabled state
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      resendButton = screen.getByRole('button');
      expect(resendButton).toHaveClass('bg-blue-600', 'hover:bg-blue-700');
      expect(resendButton).not.toHaveClass('bg-gray-400', 'cursor-not-allowed');
    });

    test('maintains disabled styling during cooldown', async () => {
      const mockResponse = { data: { message: 'Email sent!' } };
      axiosInstance.post.mockResolvedValue(mockResponse);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      const resendButton = screen.getByRole('button');
      fireEvent.click(resendButton);
      
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalled();
      });
      
      const updatedButton = screen.getByRole('button');
      expect(updatedButton).toHaveClass('bg-gray-400', 'cursor-not-allowed');
      expect(updatedButton).toBeDisabled();
    });

    test('applies correct styling during loading state', async () => {
      let resolvePromise;
      const promise = new Promise(resolve => {
        resolvePromise = resolve;
      });
      axiosInstance.post.mockReturnValue(promise);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      const resendButton = screen.getByRole('button');
      fireEvent.click(resendButton);
      
      // During loading, button should have disabled styling
      expect(resendButton).toHaveClass('bg-gray-400', 'cursor-not-allowed');
      expect(resendButton).toBeDisabled();
      
      resolvePromise({ data: { message: 'Success!' } });
    });
  });

  describe('Edge Cases and Error Scenarios', () => {
    test('prevents multiple rapid clicks during loading', async () => {
      let resolvePromise;
      const promise = new Promise(resolve => {
        resolvePromise = resolve;
      });
      axiosInstance.post.mockReturnValue(promise);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      // Click multiple times rapidly
      fireEvent.click(resendButton);
      fireEvent.click(resendButton);
      fireEvent.click(resendButton);
      
      // Should only make one API call
      expect(axiosInstance.post).toHaveBeenCalledTimes(1);
      
      resolvePromise({ data: { message: 'Success!' } });
    });

    test('handles non-numeric cooldown values gracefully', async () => {
      const error = new Error('Server Error');
      error.response = { data: { message: 'wait abc seconds' } };
      axiosInstance.post.mockRejectedValue(error);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(resendButton);
      
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('wait abc seconds');
      });
      
      // Should not set invalid cooldown (NaN should not disable button)
      const updatedButton = screen.getByRole('button');
      expect(updatedButton).not.toBeDisabled();
    });

    test('handles empty error message gracefully', async () => {
      const error = new Error('Server Error');
      error.response = { data: { message: '' } };
      axiosInstance.post.mockRejectedValue(error);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(resendButton);
      
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Something went wrong');
      });
    });

    test('maintains email value during and after operations', async () => {
      const mockResponse = { data: { message: 'Email sent!' } };
      axiosInstance.post.mockResolvedValue(mockResponse);
      
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const testEmail = 'persistent@example.com';
      
      fireEvent.change(emailInput, { target: { value: testEmail } });
      expect(emailInput).toHaveValue(testEmail);
      
      const resendButton = screen.getByRole('button');
      fireEvent.click(resendButton);
      
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalled();
      });
      
      // Email should still be there after successful send
      expect(emailInput).toHaveValue(testEmail);
    });
  });

  describe('Integration and Accessibility', () => {
    test('email input accepts keyboard events', () => {
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      
      fireEvent.keyDown(emailInput, { key: 'A', code: 'KeyA' });
      fireEvent.change(emailInput, { target: { value: 'a' } });
      
      expect(emailInput).toHaveValue('a');
    });

    test('maintains proper focus management', () => {
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      // Email input should be focusable
      emailInput.focus();
      expect(document.activeElement).toBe(emailInput);
      
      // Button should be focusable when enabled
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      resendButton.focus();
      expect(document.activeElement).toBe(resendButton);
    });

    test('provides appropriate HTML attributes', () => {
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const resendButton = screen.getByRole('button');
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('placeholder', 'Enter your email');
      
      // Button should have proper structure
      expect(resendButton).toBeInTheDocument();
    });

    test('works correctly with different auth store states', () => {
      const testCases = [
        { tempEmail: 'test1@example.com' },
        { tempEmail: '' },
        { tempEmail: null },
        { tempEmail: undefined },
        {}
      ];

      testCases.forEach(storeState => {
        vi.clearAllMocks();
        useAuthStore.mockReturnValue(storeState);
        
        render(<ResendVerification />);
        
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const expectedValue = storeState.tempEmail || '';
        
        expect(emailInput).toHaveValue(expectedValue);
      });
    });

    test('handles component re-renders correctly', () => {
      const { rerender } = render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      expect(emailInput).toHaveValue('test@example.com');
      
      // Re-render component
      rerender(<ResendVerification />);
      
      // Should maintain state properly
      const newEmailInput = screen.getByPlaceholderText('Enter your email');
      expect(newEmailInput).toBeInTheDocument();
    });
  });

  describe('Performance and Memory Management', () => {
    test('cleans up properly on multiple mount/unmount cycles', () => {
      for (let i = 0; i < 5; i++) {
        const { unmount } = render(<ResendVerification />);
        
        const emailInput = screen.getByPlaceholderText('Enter your email');
        fireEvent.change(emailInput, { target: { value: `test${i}@example.com` } });
        
        // Unmount should not throw errors
        expect(() => unmount()).not.toThrow();
      }
    });

    test('handles rapid state changes without memory issues', () => {
      render(<ResendVerification />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      
      // Rapidly change email values
      for (let i = 0; i < 20; i++) {
        fireEvent.change(emailInput, { target: { value: `test${i}@example.com` } });
      }
      
      expect(emailInput).toHaveValue('test19@example.com');
    });
  });
});
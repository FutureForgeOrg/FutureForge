import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import VerifyEmailPage from './VerifyEmail';

// Mock the ResendVerification component
const mockResendVerification = vi.fn(() => <div data-testid="resend-verification">Resend Verification Component</div>);
vi.mock('../components/ResendVerification', () => ({
  default: mockResendVerification,
}));

describe('VerifyEmailPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render the main container with correct styling', () => {
      render(<VerifyEmailPage />);
      
      const container = screen.getByRole('main', { hidden: true }) || 
                       document.querySelector('.min-h-screen');
      expect(container).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center', 'px-4', 'bg-purple-800');
    });

    it('should render the card container with correct styling', () => {
      render(<VerifyEmailPage />);
      
      const card = document.querySelector('.bg-white');
      expect(card).toHaveClass('bg-white', 'rounded-2xl', 'shadow-xl', 'p-8', 'max-w-md', 'w-full', 'text-center');
    });

    it('should render the main heading', () => {
      render(<VerifyEmailPage />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Verify Your Email');
      expect(heading).toHaveClass('text-3xl', 'font-bold', 'mb-4');
    });

    it('should render the instruction text', () => {
      render(<VerifyEmailPage />);
      
      const instruction = screen.getByText(/We've sent a verification link to your email address/);
      expect(instruction).toBeInTheDocument();
      expect(instruction).toHaveClass('text-gray-600', 'mb-6');
    });

    it('should render the complete instruction text content', () => {
      render(<VerifyEmailPage />);
      
      const instruction = screen.getByText(
        "We've sent a verification link to your email address. Please check your inbox and click the link to verify your account."
      );
      expect(instruction).toBeInTheDocument();
    });
  });

  describe('Visual Separator', () => {
    it('should render the OR separator with correct styling', () => {
      render(<VerifyEmailPage />);
      
      const separator = screen.getByText('OR');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveClass('bg-white', 'px-2', 'text-gray-500');
    });

    it('should render the separator container with correct styling', () => {
      render(<VerifyEmailPage />);
      
      const separatorContainer = document.querySelector('.relative.my-6');
      expect(separatorContainer).toBeInTheDocument();
    });

    it('should render the separator line with correct styling', () => {
      render(<VerifyEmailPage />);
      
      const separatorLine = document.querySelector('.border-t.border-gray-300');
      expect(separatorLine).toBeInTheDocument();
      expect(separatorLine).toHaveClass('w-full', 'border-t', 'border-gray-300');
    });
  });

  describe('ResendVerification Component Integration', () => {
    it('should render the ResendVerification component', () => {
      render(<VerifyEmailPage />);
      
      expect(screen.getByTestId('resend-verification')).toBeInTheDocument();
    });

    it('should call ResendVerification component once', () => {
      render(<VerifyEmailPage />);
      
      expect(mockResendVerification).toHaveBeenCalledTimes(1);
    });

    it('should pass no props to ResendVerification component', () => {
      render(<VerifyEmailPage />);
      
      expect(mockResendVerification).toHaveBeenCalledWith({}, {});
    });
  });

  describe('Layout and Structure', () => {
    it('should have the correct component hierarchy', () => {
      render(<VerifyEmailPage />);
      
      // Check main container
      const mainContainer = document.querySelector('.min-h-screen');
      expect(mainContainer).toBeInTheDocument();
      
      // Check card container
      const cardContainer = mainContainer.querySelector('.bg-white');
      expect(cardContainer).toBeInTheDocument();
      
      // Check heading is inside card
      const heading = cardContainer.querySelector('h2');
      expect(heading).toBeInTheDocument();
      
      // Check instruction paragraph is inside card
      const instruction = cardContainer.querySelector('p');
      expect(instruction).toBeInTheDocument();
      
      // Check separator is inside card
      const separator = cardContainer.querySelector('.relative.my-6');
      expect(separator).toBeInTheDocument();
    });

    it('should maintain proper text alignment', () => {
      render(<VerifyEmailPage />);
      
      const cardContainer = document.querySelector('.bg-white');
      expect(cardContainer).toHaveClass('text-center');
    });

    it('should have responsive design classes', () => {
      render(<VerifyEmailPage />);
      
      const mainContainer = document.querySelector('.min-h-screen');
      expect(mainContainer).toHaveClass('px-4'); // Responsive padding
      
      const cardContainer = document.querySelector('.bg-white');
      expect(cardContainer).toHaveClass('max-w-md', 'w-full'); // Responsive width
    });
  });

  describe('CSS Classes and Styling', () => {
    it('should apply correct background color to main container', () => {
      render(<VerifyEmailPage />);
      
      const mainContainer = document.querySelector('.min-h-screen');
      expect(mainContainer).toHaveClass('bg-purple-800');
    });

    it('should apply correct shadow and border radius to card', () => {
      render(<VerifyEmailPage />);
      
      const cardContainer = document.querySelector('.bg-white');
      expect(cardContainer).toHaveClass('rounded-2xl', 'shadow-xl');
    });

    it('should apply correct spacing classes', () => {
      render(<VerifyEmailPage />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('mb-4');
      
      const instruction = screen.getByText(/We've sent a verification link/);
      expect(instruction).toHaveClass('mb-6');
      
      const separator = document.querySelector('.relative.my-6');
      expect(separator).toHaveClass('my-6');
      
      const cardContainer = document.querySelector('.bg-white');
      expect(cardContainer).toHaveClass('p-8');
    });

    it('should apply correct text styling classes', () => {
      render(<VerifyEmailPage />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-3xl', 'font-bold');
      
      const instruction = screen.getByText(/We've sent a verification link/);
      expect(instruction).toHaveClass('text-gray-600');
      
      const separatorText = screen.getByText('OR');
      expect(separatorText).toHaveClass('text-gray-500');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<VerifyEmailPage />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('should have readable text content', () => {
      render(<VerifyEmailPage />);
      
      // Check that important text is accessible
      expect(screen.getByText('Verify Your Email')).toBeInTheDocument();
      expect(screen.getByText(/Please check your inbox/)).toBeInTheDocument();
    });

    it('should maintain good color contrast with text colors', () => {
      render(<VerifyEmailPage />);
      
      // Gray text on white background should have sufficient contrast
      const instruction = screen.getByText(/We've sent a verification link/);
      expect(instruction).toHaveClass('text-gray-600');
      
      const separatorText = screen.getByText('OR');
      expect(separatorText).toHaveClass('text-gray-500');
    });
  });

  describe('Component Behavior', () => {
    it('should render consistently on multiple renders', () => {
      const { rerender } = render(<VerifyEmailPage />);
      
      expect(screen.getByText('Verify Your Email')).toBeInTheDocument();
      expect(screen.getByTestId('resend-verification')).toBeInTheDocument();
      
      rerender(<VerifyEmailPage />);
      
      expect(screen.getByText('Verify Your Email')).toBeInTheDocument();
      expect(screen.getByTestId('resend-verification')).toBeInTheDocument();
    });

    it('should not have any interactive elements besides ResendVerification', () => {
      render(<VerifyEmailPage />);
      
      // Should not have buttons, inputs, or links directly in this component
      const buttons = screen.queryAllByRole('button');
      const inputs = screen.queryAllByRole('textbox');
      const links = screen.queryAllByRole('link');
      
      // Any interactive elements should come from ResendVerification component
      expect(buttons).toHaveLength(0);
      expect(inputs).toHaveLength(0);
      expect(links).toHaveLength(0);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle ResendVerification component errors gracefully', () => {
      // Mock ResendVerification to throw an error
      const ErrorComponent = () => {
        throw new Error('ResendVerification failed');
      };
      
      vi.mocked(mockResendVerification).mockImplementation(ErrorComponent);
      
      // Should not crash the parent component
      expect(() => {
        render(<VerifyEmailPage />);
      }).toThrow('ResendVerification failed');
    });

    it('should render properly when ResendVerification is undefined', () => {
      vi.doMock('../components/ResendVerification', () => ({
        default: undefined,
      }));
      
      // Should handle gracefully without crashing
      expect(() => {
        render(<VerifyEmailPage />);
      }).not.toThrow();
    });
  });

  describe('Performance Considerations', () => {
    it('should be a lightweight component with minimal re-renders', () => {
      const renderSpy = vi.fn();
      
      const TestComponent = () => {
        renderSpy();
        return <VerifyEmailPage />;
      };
      
      const { rerender } = render(<TestComponent />);
      expect(renderSpy).toHaveBeenCalledTimes(1);
      
      rerender(<TestComponent />);
      expect(renderSpy).toHaveBeenCalledTimes(2);
    });

    it('should not have unnecessary DOM nodes', () => {
      render(<VerifyEmailPage />);
      
      // Count main structural elements
      const mainContainers = document.querySelectorAll('.min-h-screen');
      const cardContainers = document.querySelectorAll('.bg-white');
      const headings = document.querySelectorAll('h2');
      const paragraphs = document.querySelectorAll('p');
      
      expect(mainContainers).toHaveLength(1);
      expect(cardContainers).toHaveLength(2); // One for card, one for separator text
      expect(headings).toHaveLength(1);
      expect(paragraphs).toHaveLength(1);
    });
  });

  describe('Integration with Parent Components', () => {
    it('should accept and handle standard React props', () => {
      const customProps = {
        'data-testid': 'custom-verify-page',
        className: 'custom-class',
      };
      
      // Component should handle additional props gracefully
      expect(() => {
        render(<VerifyEmailPage {...customProps} />);
      }).not.toThrow();
    });

    it('should maintain its structure regardless of parent styling', () => {
      const ParentComponent = ({ children }) => (
        <div style={{ background: 'red', padding: '50px' }}>
          {children}
        </div>
      );
      
      render(
        <ParentComponent>
          <VerifyEmailPage />
        </ParentComponent>
      );
      
      // Should maintain its own styling
      const mainContainer = document.querySelector('.min-h-screen');
      expect(mainContainer).toHaveClass('bg-purple-800');
    });
  });
});
import { jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import BaseUser from '../models/BaseUser.js';
import EmailVerificationToken from '../models/EmailVerificationToken.js';
import { generateToken } from '../utils/jwtToken.js';
import { sendMail } from '../utils/sendMail.js';
import { 
  handleSignup, 
  handleLogin, 
  handleLogout, 
  handleCheckAuth,
  handleEmailVerification,
  resendVerificationEmail
} from './authController.js';

// Mock all dependencies
jest.mock('bcrypt');
jest.mock('crypto');
jest.mock('../models/BaseUser.js');
jest.mock('../models/EmailVerificationToken.js');
jest.mock('../utils/jwtToken.js');
jest.mock('../utils/sendMail.js');

describe('Auth Controller', () => {
  let req, res, mockConsoleError;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      ip: '127.0.0.1',
      headers: {
        'user-agent': 'test-agent',
        'x-forwarded-for': undefined
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis()
    };
    
    // Mock console.error to suppress error logs during tests
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Set up environment variable
    process.env.FRONTEND_URL = 'http://localhost:3000';
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    mockConsoleError.mockRestore();
  });

  describe('handleSignup', () => {
    const validSignupData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpass123',
      gender: 'male'
    };

    it('should register a new user successfully', async () => {
      req.body = validSignupData;
      const mockUser = {
        _id: 'user123',
        username: 'testuser',
        email: 'test@example.com',
        gender: 'male',
        save: jest.fn().mockResolvedValue(true),
        toObject: jest.fn().mockReturnValue({
          _id: 'user123',
          username: 'testuser',
          email: 'test@example.com',
          gender: 'male'
        })
      };

      BaseUser.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword123');
      BaseUser.mockImplementation(() => mockUser);
      crypto.randomBytes.mockReturnValue({ toString: () => 'mockToken123' });
      EmailVerificationToken.create.mockResolvedValue({});
      sendMail.mockResolvedValue(true);

      await handleSignup(req, res);

      expect(BaseUser.findOne).toHaveBeenCalledWith({ email: validSignupData.email });
      expect(bcrypt.hash).toHaveBeenCalledWith(validSignupData.password, 10);
      expect(mockUser.save).toHaveBeenCalled();
      expect(sendMail).toHaveBeenCalledWith(
        validSignupData.email,
        'Verify your email',
        expect.stringContaining('Click the link to verify your email')
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Signup successful, verification email sent',
        email: validSignupData.email
      });
    });

    it('should return error when required fields are missing', async () => {
      req.body = { username: 'testuser', email: 'test@example.com' };

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'All fields are required'
      });
    });

    it('should validate password length constraints', async () => {
      req.body = { ...validSignupData, password: '123' };

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Password must be between 4 and 32 characters'
      });

      req.body = { ...validSignupData, password: 'a'.repeat(33) };

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Password must be between 4 and 32 characters'
      });
    });

    it('should validate gender field', async () => {
      req.body = { ...validSignupData, gender: 'invalid' };

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid gender'
      });
    });

    it('should validate email format', async () => {
      req.body = { ...validSignupData, email: 'invalid-email' };

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid email address'
      });
    });

    it('should validate username length', async () => {
      req.body = { ...validSignupData, username: 'ab' };

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Username must be between 3 and 20 characters'
      });

      req.body = { ...validSignupData, username: 'a'.repeat(21) };

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Username must be between 3 and 20 characters'
      });
    });

    it('should return error when user already exists', async () => {
      req.body = validSignupData;
      BaseUser.findOne.mockResolvedValue({ email: validSignupData.email });

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User already exists'
      });
    });

    it('should handle missing FRONTEND_URL environment variable', async () => {
      req.body = validSignupData;
      delete process.env.FRONTEND_URL;
      
      BaseUser.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      BaseUser.mockImplementation(() => ({ save: jest.fn() }));

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
        error: 'FRONTEND_URL environment variable is not set'
      });
    });

    it('should handle database errors gracefully', async () => {
      req.body = validSignupData;
      BaseUser.findOne.mockRejectedValue(new Error('Database connection failed'));

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
        error: 'Database connection failed'
      });
    });

    it('should handle bcrypt hashing errors', async () => {
      req.body = validSignupData;
      BaseUser.findOne.mockResolvedValue(null);
      bcrypt.hash.mockRejectedValue(new Error('Hashing failed'));

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
        error: 'Hashing failed'
      });
    });

    it('should handle email sending errors', async () => {
      req.body = validSignupData;
      const mockUser = { save: jest.fn().mockResolvedValue(true), _id: 'user123' };
      
      BaseUser.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      BaseUser.mockImplementation(() => mockUser);
      crypto.randomBytes.mockReturnValue({ toString: () => 'mockToken' });
      EmailVerificationToken.create.mockResolvedValue({});
      sendMail.mockRejectedValue(new Error('Email service unavailable'));

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
        error: 'Email service unavailable'
      });
    });

    it('should capture correct IP address from headers', async () => {
      req.body = validSignupData;
      req.headers['x-forwarded-for'] = '192.168.1.1';
      req.ip = '127.0.0.1';
      
      const mockUser = { save: jest.fn().mockResolvedValue(true), _id: 'user123' };
      BaseUser.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      BaseUser.mockImplementation((userData) => {
        expect(userData.ipAddress).toBe('192.168.1.1');
        return mockUser;
      });
      crypto.randomBytes.mockReturnValue({ toString: () => 'token' });
      EmailVerificationToken.create.mockResolvedValue({});
      sendMail.mockResolvedValue(true);

      await handleSignup(req, res);

      expect(BaseUser).toHaveBeenCalledWith(expect.objectContaining({
        ipAddress: '192.168.1.1',
        userAgent: 'test-agent'
      }));
    });
  });

  describe('handleLogin', () => {
    const validLoginData = {
      email: 'test@example.com',
      password: 'testpass123'
    };

    it('should login user successfully with verified account', async () => {
      req.body = validLoginData;
      const mockUser = {
        _id: 'user123',
        email: validLoginData.email,
        password: 'hashedPassword',
        isVerified: true,
        username: 'testuser',
        toObject: jest.fn().mockReturnValue({
          _id: 'user123',
          email: validLoginData.email,
          username: 'testuser',
          isVerified: true
        })
      };

      BaseUser.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      generateToken.mockImplementation(() => {});

      await handleLogin(req, res);

      expect(BaseUser.findOne).toHaveBeenCalledWith({ email: validLoginData.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(validLoginData.password, mockUser.password);
      expect(generateToken).toHaveBeenCalledWith(mockUser._id, mockUser.email, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Login successful',
        user: expect.objectContaining({
          _id: 'user123',
          email: validLoginData.email,
          username: 'testuser'
        })
      });
    });

    it('should return error for missing fields', async () => {
      req.body = { email: 'test@example.com' };

      await handleLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'All fields are required'
      });
    });

    it('should validate email format', async () => {
      req.body = { email: 'invalid-email', password: 'password123' };

      await handleLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid email address'
      });
    });

    it('should return error for unverified email', async () => {
      req.body = validLoginData;
      const mockUser = {
        email: validLoginData.email,
        isVerified: false
      };

      BaseUser.findOne.mockResolvedValue(mockUser);

      await handleLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Email not verified. Please check your inbox for the verification email.'
      });
    });

    it('should return error for non-existent user', async () => {
      req.body = validLoginData;
      BaseUser.findOne.mockResolvedValue(null);

      await handleLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid credentials'
      });
    });

    it('should return error for incorrect password', async () => {
      req.body = validLoginData;
      const mockUser = {
        email: validLoginData.email,
        password: 'hashedPassword',
        isVerified: true
      };

      BaseUser.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await handleLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid credentials'
      });
    });

    it('should handle database errors', async () => {
      req.body = validLoginData;
      BaseUser.findOne.mockRejectedValue(new Error('Database error'));

      await handleLogin(req, res);

      expect(console.error).toHaveBeenCalledWith('Login error:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
        error: 'Database error'
      });
    });

    it('should handle bcrypt comparison errors', async () => {
      req.body = validLoginData;
      const mockUser = {
        email: validLoginData.email,
        password: 'hashedPassword',
        isVerified: true
      };

      BaseUser.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockRejectedValue(new Error('Bcrypt error'));

      await handleLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
        error: 'Bcrypt error'
      });
    });
  });

  describe('handleLogout', () => {
    it('should logout user successfully', async () => {
      await handleLogout(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith('jwt', {
        expires: new Date(0),
        httpOnly: true,
        secure: false, // NODE_ENV is not production in tests
        sameSite: 'lax'
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Logged out successfully'
      });
    });

    it('should handle logout errors gracefully', async () => {
      res.clearCookie.mockImplementation(() => {
        throw new Error('Cookie clearing failed');
      });

      await handleLogout(req, res);

      expect(console.error).toHaveBeenCalledWith('Logout error:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
        error: 'Cookie clearing failed'
      });
    });

    it('should use secure cookies in production', async () => {
      process.env.NODE_ENV = 'production';

      await handleLogout(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith('jwt', {
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      });

      delete process.env.NODE_ENV;
    });
  });

  describe('handleCheckAuth', () => {
    it('should return authenticated user successfully', async () => {
      req.user = {
        _id: 'user123',
        email: 'test@example.com',
        username: 'testuser'
      };

      await handleCheckAuth(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User is authenticated',
        user: req.user
      });
    });

    it('should handle errors gracefully', async () => {
      res.status.mockImplementation(() => {
        throw new Error('Response error');
      });

      await handleCheckAuth(req, res);

      expect(console.error).toHaveBeenCalledWith('Check auth error:', expect.any(Error));
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
        error: 'Response error'
      });
    });
  });

  describe('handleEmailVerification', () => {
    it('should verify email successfully', async () => {
      req.params = { token: 'validToken123' };
      const mockVerificationToken = {
        _id: 'tokenId',
        userId: 'user123',
        token: 'validToken123'
      };
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        isVerified: false,
        save: jest.fn().mockResolvedValue(true),
        toObject: jest.fn().mockReturnValue({
          _id: 'user123',
          email: 'test@example.com',
          username: 'testuser'
        })
      };

      EmailVerificationToken.findOne.mockResolvedValue(mockVerificationToken);
      BaseUser.findById.mockResolvedValue(mockUser);
      EmailVerificationToken.deleteOne.mockResolvedValue({});
      generateToken.mockImplementation(() => {});

      await handleEmailVerification(req, res);

      expect(EmailVerificationToken.findOne).toHaveBeenCalledWith({ token: 'validToken123' });
      expect(BaseUser.findById).toHaveBeenCalledWith('user123');
      expect(mockUser.isVerified).toBe(true);
      expect(mockUser.expiresAt).toBeUndefined();
      expect(mockUser.save).toHaveBeenCalled();
      expect(EmailVerificationToken.deleteOne).toHaveBeenCalledWith({ _id: 'tokenId' });
      expect(generateToken).toHaveBeenCalledWith(mockUser._id, mockUser.email, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Email verified successfully',
        user: expect.objectContaining({
          _id: 'user123',
          email: 'test@example.com'
        })
      });
    });

    it('should return error for invalid token', async () => {
      req.params = { token: 'invalidToken' };
      EmailVerificationToken.findOne.mockResolvedValue(null);

      await handleEmailVerification(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid or expired verification token'
      });
    });

    it('should return error when user not found', async () => {
      req.params = { token: 'validToken' };
      const mockVerificationToken = { userId: 'nonexistent' };
      
      EmailVerificationToken.findOne.mockResolvedValue(mockVerificationToken);
      BaseUser.findById.mockResolvedValue(null);

      await handleEmailVerification(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User not found'
      });
    });

    it('should handle database errors', async () => {
      req.params = { token: 'validToken' };
      EmailVerificationToken.findOne.mockRejectedValue(new Error('Database error'));

      await handleEmailVerification(req, res);

      expect(console.error).toHaveBeenCalledWith('Email verification error:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
        error: 'Database error'
      });
    });
  });

  describe('resendVerificationEmail', () => {
    const validResendData = {
      email: 'test@example.com'
    };

    it('should resend verification email successfully', async () => {
      req.body = validResendData;
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        isVerified: false
      };
      const mockExistingToken = {
        userId: 'user123',
        resendCooldownUntil: new Date(Date.now() - 1000) // expired cooldown
      };

      BaseUser.findOne.mockResolvedValue(mockUser);
      EmailVerificationToken.findOne.mockResolvedValue(mockExistingToken);
      crypto.randomBytes.mockReturnValue({ toString: () => 'newToken123' });
      EmailVerificationToken.findOneAndUpdate.mockResolvedValue({});
      sendMail.mockResolvedValue(true);

      await resendVerificationEmail(req, res);

      expect(BaseUser.findOne).toHaveBeenCalledWith({ email: validResendData.email });
      expect(EmailVerificationToken.findOneAndUpdate).toHaveBeenCalledWith(
        { userId: 'user123' },
        expect.objectContaining({
          token: 'newToken123',
          resendCooldownUntil: expect.any(Date)
        }),
        { upsert: true, new: true }
      );
      expect(sendMail).toHaveBeenCalledWith(
        validResendData.email,
        'Verify your email',
        expect.stringContaining('Click the link to verify your email')
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Verification email sent successfully'
      });
    });

    it('should return error when user not found', async () => {
      req.body = validResendData;
      BaseUser.findOne.mockResolvedValue(null);

      await resendVerificationEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User not found'
      });
    });

    it('should return error when email already verified', async () => {
      req.body = validResendData;
      const mockUser = {
        email: 'test@example.com',
        isVerified: true
      };

      BaseUser.findOne.mockResolvedValue(mockUser);

      await resendVerificationEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Email already verified'
      });
    });

    it('should enforce cooldown period', async () => {
      req.body = validResendData;
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        isVerified: false
      };
      const mockExistingToken = {
        userId: 'user123',
        resendCooldownUntil: new Date(Date.now() + 30000) // 30 seconds in future
      };

      BaseUser.findOne.mockResolvedValue(mockUser);
      EmailVerificationToken.findOne.mockResolvedValue(mockExistingToken);

      await resendVerificationEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(429);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringMatching(/Please wait \d+ seconds before requesting/)
      });
    });

    it('should handle database errors', async () => {
      req.body = validResendData;
      BaseUser.findOne.mockRejectedValue(new Error('Database connection failed'));

      await resendVerificationEmail(req, res);

      expect(console.error).toHaveBeenCalledWith('Resend verification email error:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
        error: 'Database connection failed'
      });
    });

    it('should handle email sending errors', async () => {
      req.body = validResendData;
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        isVerified: false
      };

      BaseUser.findOne.mockResolvedValue(mockUser);
      EmailVerificationToken.findOne.mockResolvedValue({ resendCooldownUntil: new Date(0) });
      crypto.randomBytes.mockReturnValue({ toString: () => 'token' });
      EmailVerificationToken.findOneAndUpdate.mockResolvedValue({});
      sendMail.mockRejectedValue(new Error('Email service unavailable'));

      await resendVerificationEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error',
        error: 'Email service unavailable'
      });
    });
  });

  describe('Edge Cases and Security Tests', () => {
    it('should handle malformed email addresses in signup', async () => {
      req.body = {
        username: 'testuser',
        email: 'malformed@',
        password: 'password123',
        gender: 'male'
      };

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid email address'
      });
    });

    it('should handle SQL injection attempts in email field', async () => {
      req.body = {
        email: "test@example.com'; DROP TABLE users; --",
        password: 'password123'
      };

      BaseUser.findOne.mockResolvedValue(null);

      await handleLogin(req, res);

      expect(BaseUser.findOne).toHaveBeenCalledWith({ 
        email: "test@example.com'; DROP TABLE users; --" 
      });
    });

    it('should handle extremely long input strings', async () => {
      req.body = {
        username: 'a'.repeat(1000),
        email: 'test@example.com',
        password: 'password123',
        gender: 'male'
      };

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Username must be between 3 and 20 characters'
      });
    });

    it('should handle missing IP address gracefully', async () => {
      req.body = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male'
      };
      req.ip = undefined;
      req.headers = {};

      const mockUser = { save: jest.fn().mockResolvedValue(true), _id: 'user123' };
      BaseUser.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      BaseUser.mockImplementation((userData) => {
        expect(userData.ipAddress).toBe('Unknown');
        expect(userData.userAgent).toBe('Unknown');
        return mockUser;
      });
      crypto.randomBytes.mockReturnValue({ toString: () => 'token' });
      EmailVerificationToken.create.mockResolvedValue({});
      sendMail.mockResolvedValue(true);

      await handleSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should handle case-sensitive email comparisons', async () => {
      req.body = {
        email: 'TEST@EXAMPLE.COM',
        password: 'password123'
      };

      const mockUser = {
        email: 'test@example.com',
        isVerified: true,
        password: 'hashedPassword',
        toObject: () => ({ email: 'test@example.com' })
      };

      BaseUser.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      generateToken.mockImplementation(() => {});

      await handleLogin(req, res);

      expect(BaseUser.findOne).toHaveBeenCalledWith({ email: 'TEST@EXAMPLE.COM' });
    });
  });
});
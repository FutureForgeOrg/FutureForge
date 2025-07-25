import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import BaseUser from './BaseUser.js';

describe('BaseUser Model Tests', () => {
  let mongoServer;
  let connection;

  beforeAll(async () => {
    // Start in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    connection = mongoose.connection;
  });

  afterAll(async () => {
    // Clean up and close connections
    if (connection) {
      await connection.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  beforeEach(async () => {
    // Clear all documents before each test
    await BaseUser.deleteMany({});
  });

  describe('Schema Validation - Required Fields', () => {
    test('should create user with all required fields', async () => {
      const validUser = new BaseUser({
        username: 'testuser123',
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const savedUser = await validUser.save();
      
      expect(savedUser._id).toBeDefined();
      expect(savedUser.username).toBe('testuser123');
      expect(savedUser.email).toBe('test@example.com');
      expect(savedUser.password).toBe('password123');
      expect(savedUser.role).toBe('user');
      expect(savedUser.gender).toBe('male');
      expect(savedUser.isVerified).toBe(false);
      expect(savedUser.ipAddress).toBe('192.168.1.1');
      expect(savedUser.userAgent).toBe('Mozilla/5.0 (Test Browser)');
      expect(savedUser.createdAt).toBeDefined();
      expect(savedUser.updatedAt).toBeDefined();
    });

    test('should fail without username', async () => {
      const userWithoutUsername = new BaseUser({
        email: 'test@example.com',
        password: 'password123',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      await expect(userWithoutUsername.save()).rejects.toThrow();
    });

    test('should fail without email', async () => {
      const userWithoutEmail = new BaseUser({
        username: 'testuser123',
        password: 'password123',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      await expect(userWithoutEmail.save()).rejects.toThrow();
    });

    test('should fail without password', async () => {
      const userWithoutPassword = new BaseUser({
        username: 'testuser123',
        email: 'test@example.com',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      await expect(userWithoutPassword.save()).rejects.toThrow();
    });

    test('should fail without ipAddress', async () => {
      const userWithoutIP = new BaseUser({
        username: 'testuser123',
        email: 'test@example.com',
        password: 'password123',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      await expect(userWithoutIP.save()).rejects.toThrow();
    });

    test('should fail without userAgent', async () => {
      const userWithoutUA = new BaseUser({
        username: 'testuser123',
        email: 'test@example.com',
        password: 'password123',
        ipAddress: '192.168.1.1'
      });

      await expect(userWithoutUA.save()).rejects.toThrow();
    });

    test('should fail without gender (required field)', async () => {
      const userWithoutGender = new BaseUser({
        username: 'testuser123',
        email: 'test@example.com',
        password: 'password123',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      await expect(userWithoutGender.save()).rejects.toThrow();
    });
  });

  describe('Username Validation', () => {
    test('should accept valid username', async () => {
      const validUser = new BaseUser({
        username: 'validuser123',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const savedUser = await validUser.save();
      expect(savedUser.username).toBe('validuser123');
    });

    test('should trim whitespace from username', async () => {
      const userWithSpaces = new BaseUser({
        username: '  spaceuser  ',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const savedUser = await userWithSpaces.save();
      expect(savedUser.username).toBe('spaceuser');
    });

    test('should reject username shorter than 2 characters', async () => {
      const shortUsernameUser = new BaseUser({
        username: 'a',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      await expect(shortUsernameUser.save()).rejects.toThrow(/Name must be at least 2 characters/);
    });

    test('should reject username longer than 50 characters', async () => {
      const longUsername = 'a'.repeat(51);
      const longUsernameUser = new BaseUser({
        username: longUsername,
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      await expect(longUsernameUser.save()).rejects.toThrow(/Name can't exceed 50 characters/);
    });

    test('should enforce unique username constraint', async () => {
      const userData = {
        username: 'uniqueuser',
        email: 'test1@example.com',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      };

      const firstUser = new BaseUser(userData);
      await firstUser.save();

      const duplicateUser = new BaseUser({
        ...userData,
        email: 'test2@example.com'
      });

      await expect(duplicateUser.save()).rejects.toThrow();
    });
  });

  describe('Email Validation', () => {
    test('should accept valid email formats', async () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'test123@test-domain.com'
      ];

      for (const email of validEmails) {
        const user = new BaseUser({
          username: `user${Math.random()}`,
          email: email,
          password: 'password123',
          gender: 'male',
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0 (Test Browser)'
        });

        const savedUser = await user.save();
        expect(savedUser.email).toBe(email.toLowerCase());
      }
    });

    test('should convert email to lowercase', async () => {
      const user = new BaseUser({
        username: 'testuser',
        email: 'TEST@EXAMPLE.COM',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const savedUser = await user.save();
      expect(savedUser.email).toBe('test@example.com');
    });

    test('should reject invalid email formats', async () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user@.com',
        'user.example.com',
        'user @example.com',
        'user@example',
        ''
      ];

      for (const email of invalidEmails) {
        const user = new BaseUser({
          username: `user${Math.random()}`,
          email: email,
          password: 'password123',
          gender: 'male',
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0 (Test Browser)'
        });

        await expect(user.save()).rejects.toThrow(/Please enter a valid email address/);
      }
    });

    test('should enforce unique email constraint', async () => {
      const userData = {
        username: 'user1',
        email: 'unique@example.com',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      };

      const firstUser = new BaseUser(userData);
      await firstUser.save();

      const duplicateEmailUser = new BaseUser({
        ...userData,
        username: 'user2'
      });

      await expect(duplicateEmailUser.save()).rejects.toThrow();
    });
  });

  describe('Password Validation', () => {
    test('should accept valid passwords', async () => {
      const validPasswords = [
        'pass',
        'password123',
        'VeryLongPasswordWithSpecialChars!@#$%',
        '1234'
      ];

      for (const password of validPasswords) {
        const user = new BaseUser({
          username: `user${Math.random()}`,
          email: `test${Math.random()}@example.com`,
          password: password,
          gender: 'male',
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0 (Test Browser)'
        });

        const savedUser = await user.save();
        expect(savedUser.password).toBe(password);
      }
    });

    test('should reject password shorter than 4 characters', async () => {
      const shortPasswordUser = new BaseUser({
        username: 'testuser',
        email: 'test@example.com',
        password: '123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      await expect(shortPasswordUser.save()).rejects.toThrow(/Password must be at least 4 characters long/);
    });
  });

  describe('Role Validation', () => {
    test('should default to user role', async () => {
      const user = new BaseUser({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const savedUser = await user.save();
      expect(savedUser.role).toBe('user');
    });

    test('should accept valid roles', async () => {
      const validRoles = ['user', 'admin'];

      for (const role of validRoles) {
        const user = new BaseUser({
          username: `user${Math.random()}`,
          email: `test${Math.random()}@example.com`,
          password: 'password123',
          role: role,
          gender: 'male',
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0 (Test Browser)'
        });

        const savedUser = await user.save();
        expect(savedUser.role).toBe(role);
      }
    });

    test('should reject invalid roles', async () => {
      const invalidRoles = ['superuser', 'moderator', 'guest', ''];

      for (const role of invalidRoles) {
        const user = new BaseUser({
          username: `user${Math.random()}`,
          email: `test${Math.random()}@example.com`,
          password: 'password123',
          role: role,
          gender: 'male',
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0 (Test Browser)'
        });

        await expect(user.save()).rejects.toThrow();
      }
    });
  });

  describe('Gender Validation', () => {
    test('should default to male gender', async () => {
      const user = new BaseUser({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const savedUser = await user.save();
      expect(savedUser.gender).toBe('male');
    });

    test('should accept valid genders', async () => {
      const validGenders = ['male', 'female', 'other'];

      for (const gender of validGenders) {
        const user = new BaseUser({
          username: `user${Math.random()}`,
          email: `test${Math.random()}@example.com`,
          password: 'password123',
          gender: gender,
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0 (Test Browser)'
        });

        const savedUser = await user.save();
        expect(savedUser.gender).toBe(gender);
      }
    });

    test('should reject invalid genders', async () => {
      const invalidGenders = ['unknown', 'prefer-not-to-say', 'non-binary', ''];

      for (const gender of invalidGenders) {
        const user = new BaseUser({
          username: `user${Math.random()}`,
          email: `test${Math.random()}@example.com`,
          password: 'password123',
          gender: gender,
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0 (Test Browser)'
        });

        await expect(user.save()).rejects.toThrow();
      }
    });
  });

  describe('Verification Status', () => {
    test('should default isVerified to false', async () => {
      const user = new BaseUser({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const savedUser = await user.save();
      expect(savedUser.isVerified).toBe(false);
    });

    test('should allow setting isVerified to true', async () => {
      const user = new BaseUser({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        isVerified: true,
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const savedUser = await user.save();
      expect(savedUser.isVerified).toBe(true);
    });

    test('should default expiresAt to null', async () => {
      const user = new BaseUser({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const savedUser = await user.save();
      expect(savedUser.expiresAt).toBeNull();
    });

    test('should allow setting custom expiresAt date', async () => {
      const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
      
      const user = new BaseUser({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        expiresAt: expirationDate,
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const savedUser = await user.save();
      expect(savedUser.expiresAt).toEqual(expirationDate);
    });
  });

  describe('IP Address and User Agent', () => {
    test('should accept valid IP addresses', async () => {
      const validIPs = [
        '192.168.1.1',
        '10.0.0.1',
        '172.16.0.1',
        '8.8.8.8',
        '2001:0db8:85a3:0000:0000:8a2e:0370:7334', // IPv6
        '::1' // IPv6 localhost
      ];

      for (const ip of validIPs) {
        const user = new BaseUser({
          username: `user${Math.random()}`,
          email: `test${Math.random()}@example.com`,
          password: 'password123',
          gender: 'male',
          ipAddress: ip,
          userAgent: 'Mozilla/5.0 (Test Browser)'
        });

        const savedUser = await user.save();
        expect(savedUser.ipAddress).toBe(ip);
      }
    });

    test('should accept various user agent strings', async () => {
      const validUserAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
        'PostmanRuntime/7.28.4',
        'curl/7.68.0',
        'Custom API Client 1.0'
      ];

      for (const userAgent of validUserAgents) {
        const user = new BaseUser({
          username: `user${Math.random()}`,
          email: `test${Math.random()}@example.com`,
          password: 'password123',
          gender: 'male',
          ipAddress: '192.168.1.1',
          userAgent: userAgent
        });

        const savedUser = await user.save();
        expect(savedUser.userAgent).toBe(userAgent);
      }
    });
  });

  describe('Timestamps', () => {
    test('should automatically set createdAt and updatedAt', async () => {
      const user = new BaseUser({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const beforeSave = new Date();
      const savedUser = await user.save();
      const afterSave = new Date();

      expect(savedUser.createdAt).toBeDefined();
      expect(savedUser.updatedAt).toBeDefined();
      expect(savedUser.createdAt.getTime()).toBeGreaterThanOrEqual(beforeSave.getTime());
      expect(savedUser.createdAt.getTime()).toBeLessThanOrEqual(afterSave.getTime());
      expect(savedUser.updatedAt.getTime()).toBeGreaterThanOrEqual(beforeSave.getTime());
      expect(savedUser.updatedAt.getTime()).toBeLessThanOrEqual(afterSave.getTime());
    });

    test('should update updatedAt on document modification', async () => {
      const user = new BaseUser({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const savedUser = await user.save();
      const originalUpdatedAt = savedUser.updatedAt;

      // Wait a moment to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));

      savedUser.username = 'updateduser';
      const updatedUser = await savedUser.save();

      expect(updatedUser.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
      expect(updatedUser.createdAt).toEqual(savedUser.createdAt);
    });
  });

  describe('TTL Index and Expiration', () => {
    test('should create user with expiration for unverified accounts', async () => {
      const expirationDate = new Date(Date.now() + 1000); // 1 second from now
      
      const user = new BaseUser({
        username: 'expireuser',
        email: 'expire@example.com',
        password: 'password123',
        gender: 'male',
        isVerified: false,
        expiresAt: expirationDate,
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const savedUser = await user.save();
      expect(savedUser.expiresAt).toEqual(expirationDate);
      expect(savedUser.isVerified).toBe(false);
    });

    test('should not expire verified users', async () => {
      const user = new BaseUser({
        username: 'verifieduser',
        email: 'verified@example.com',
        password: 'password123',
        gender: 'male',
        isVerified: true,
        expiresAt: null,
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const savedUser = await user.save();
      expect(savedUser.isVerified).toBe(true);
      expect(savedUser.expiresAt).toBeNull();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle very long field values within limits', async () => {
      const user = new BaseUser({
        username: 'a'.repeat(50), // Maximum allowed length
        email: 'test@example.com',
        password: 'a'.repeat(100), // Long password
        gender: 'female',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Very Long User Agent String)'.repeat(5)
      });

      const savedUser = await user.save();
      expect(savedUser.username).toBe('a'.repeat(50));
      expect(savedUser.password).toBe('a'.repeat(100));
    });

    test('should handle special characters in fields', async () => {
      const user = new BaseUser({
        username: 'user_with-special.chars123',
        email: 'special+chars@test-domain.co.uk',
        password: 'P@ssw0rd!#$%',
        gender: 'other',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test; "Special Chars"; \'Quotes\')'
      });

      const savedUser = await user.save();
      expect(savedUser.username).toBe('user_with-special.chars123');
      expect(savedUser.password).toBe('P@ssw0rd!#$%');
    });

    test('should handle empty strings for optional fields', async () => {
      const user = new BaseUser({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)',
        expiresAt: null
      });

      const savedUser = await user.save();
      expect(savedUser.expiresAt).toBeNull();
    });

    test('should validate mongoose ObjectId format', async () => {
      const user = new BaseUser({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      const savedUser = await user.save();
      expect(mongoose.Types.ObjectId.isValid(savedUser._id)).toBe(true);
    });
  });

  describe('Query and Index Performance', () => {
    test('should efficiently query by username', async () => {
      const users = [];
      for (let i = 0; i < 10; i++) {
        users.push(new BaseUser({
          username: `user${i}`,
          email: `user${i}@example.com`,
          password: 'password123',
          gender: 'male',
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0 (Test Browser)'
        }));
      }
      
      await BaseUser.insertMany(users);

      const startTime = Date.now();
      const foundUser = await BaseUser.findOne({ username: 'user5' });
      const endTime = Date.now();

      expect(foundUser).toBeDefined();
      expect(foundUser.username).toBe('user5');
      expect(endTime - startTime).toBeLessThan(100); // Should be fast due to unique index
    });

    test('should efficiently query by email', async () => {
      const users = [];
      for (let i = 0; i < 10; i++) {
        users.push(new BaseUser({
          username: `user${i}`,
          email: `user${i}@example.com`,
          password: 'password123',
          gender: 'male',
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0 (Test Browser)'
        }));
      }
      
      await BaseUser.insertMany(users);

      const foundUser = await BaseUser.findOne({ email: 'user7@example.com' });
      expect(foundUser).toBeDefined();
      expect(foundUser.email).toBe('user7@example.com');
    });
  });

  describe('Model Methods and Statics', () => {
    test('should support model instance methods', async () => {
      const user = new BaseUser({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        gender: 'male',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      });

      // Test that the document is a valid Mongoose document
      expect(user.isNew).toBe(true);
      expect(user.isModified('username')).toBe(true);
      
      await user.save();
      expect(user.isNew).toBe(false);
    });

    test('should support model static methods', async () => {
      // Test basic static methods
      const count = await BaseUser.countDocuments();
      expect(typeof count).toBe('number');

      const users = await BaseUser.find({});
      expect(Array.isArray(users)).toBe(true);
    });
  });
});
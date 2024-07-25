import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

describe('UsersService', () => {
  let service: UsersService;
  let model: any;

  const mockUser = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'Password123!',
  };

  const mockUserModel = {
    new: jest.fn().mockResolvedValue(mockUser),
    constructor: jest.fn().mockResolvedValue(mockUser),
    save: jest.fn().mockResolvedValue(mockUser),
    findOne: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key) => {
      if (key === 'JWT_SECRET') return 'secret';
      if (key === 'JWT_EXPIRY') return '1h';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService, // Use the mock ConfigService  
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('signin', () => {
    it('should return a token on successful signin', async () => {
      mockUserModel.findOne.mockResolvedValue({
        ...mockUser,
        password: await bcrypt.hash(mockUser.password, 10),
      });

      const result = await service.signin(mockUser.email, mockUser.password);
      expect(result).toHaveProperty('token');
    });

    it('should throw an UnauthorizedException for invalid credentials', async () => {
      mockUserModel.findOne.mockResolvedValue(null);
      await expect(service.signin(mockUser.email, mockUser.password)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw an UnauthorizedException for incorrect password', async () => {
      mockUserModel.findOne.mockResolvedValue({
        email: mockUser.email,
        password: await bcrypt.hash('wrongpassword', 10),
      });

      await expect(service.signin(mockUser.email, mockUser.password)).rejects.toThrow(UnauthorizedException);
    });
  });
});
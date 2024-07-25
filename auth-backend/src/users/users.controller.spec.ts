import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    signup: jest.fn(),
    signin: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('signup', () => {
    it('should successfully sign up a user', async () => {
      const signupDto = { email: 'test@example.com', name: 'Test User', password: 'password123' };
      mockUsersService.signup.mockReturnValue(Promise.resolve({ success: true }));

      const result = await usersController.signup(signupDto);
      expect(result).toEqual({ success: true });
      expect(mockUsersService.signup).toHaveBeenCalledWith(signupDto.email, signupDto.name, signupDto.password);
    });
  });

  describe('signin', () => {
    it('should successfully sign in a user', async () => {
      const signinDto = { email: 'test@example.com', password: 'password123' };
      mockUsersService.signin.mockReturnValue(Promise.resolve({ token: 'some-jwt-token' }));

      const result = await usersController.signin(signinDto);
      expect(result).toEqual({ token: 'some-jwt-token' });
      expect(mockUsersService.signin).toHaveBeenCalledWith(signinDto.email, signinDto.password);
    });
  });
});
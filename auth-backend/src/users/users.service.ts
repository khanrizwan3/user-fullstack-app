import { Injectable, Logger, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name); // Initialize logger

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  // Password validation method
  private validatePassword(password: string): void {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      throw new BadRequestException('Password must be at least 8 characters long.');
    }
    if (!hasLetter) {
      throw new BadRequestException('Password must contain at least one letter.');
    }
    if (!hasNumber) {
      throw new BadRequestException('Password must contain at least one number.');
    }
    if (!hasSpecialChar) {
      throw new BadRequestException('Password must contain at least one special character.');
    }
  }

  async signup(email: string, name: string, password: string) {
    this.logger.log(`Signup attempt`); // Log signup attempt  

    // Validate the password before hashing  
    this.validatePassword(password);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, name, password: hashedPassword });
    
    const savedUser = await user.save();
    this.logger.log(`User created`); // Log successful creation  
    return savedUser;
  }

  async signin(email: string, password: string) {
    this.logger.log(`Signin attempt`); // Log signin attempt
    
    const user = await this.userModel.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {

    // @todo implement jwt passport
      const token = jwt.sign(
        { id: user._id },
        this.configService.get<string>('JWT_SECRET'),
        { expiresIn: this.configService.get<string>('JWT_EXPIRY') },
      );
      
      this.logger.log(`User sign in `); // Log successful signin  
      return { token };
    }
    
    this.logger.warn(`Invalid credentials`); // Log warning on invalid credentials  
    throw new UnauthorizedException('Invalid credentials'); // Use UnauthorizedException for clarity  
  }
}

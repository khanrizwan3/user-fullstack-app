import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema'; 
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register the User model  
    JwtModule, // Import JwtModule here to make JwtService available  
    ConfigModule, // Import ConfigModule here  
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}

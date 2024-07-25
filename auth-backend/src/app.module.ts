import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    
    ConfigModule.forRoot(), // Load .env variables  
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI), // Use the environment variable  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserResolver } from './user.resolver';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'sqlite'),
    PassportModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,
  ],
})
export class UserModule {
}

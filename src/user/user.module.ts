import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Role ]),
    JwtModule.register({secret: "this is secret key"}),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [UserResolver, UserService,JwtStrategy],
})
export class UserModule {}

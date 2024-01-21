import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { LoginUserInput } from './dto/login-user.input';
import { AuthUser } from './auth/auth-user';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User,{name: 'GetUser'})
  user(@Args('id') id: string){
    return this.userService.getUser(id)
  }

  @Mutation(returns => User, { name: 'NewUser' })
  register(@Args('user') createUserInput: CreateUserInput){
    return this.userService.createNewUser(createUserInput)
  }

  @Mutation(returns => AuthUser, { name: 'Login' })
  login(@Args('user') loginUserInput: LoginUserInput){
    return this.userService.login(loginUserInput)
  }

  @Mutation(returns => User,{ name: "AuthUser" })
  @UseGuards(JwtAuthGuard)
  authUser(@CurrentUser() user: User){
    return user
  }
}
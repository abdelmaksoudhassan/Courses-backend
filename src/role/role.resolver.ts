import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from './entities/role.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/user/auth/guards/role.guard';
import { Roles } from 'src/user/auth/decorators/roles.decorator';
import { role_title } from 'src/user/auth/role.enum';

@Resolver()
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(returns => Role,{name: 'GetRole'})
  role(@Args('id') id: string){
    return this.roleService.getRole(id)
  }

  @Query(returns => [Role],{name: 'GetRoles'})
  roles(){
    return this.roleService.getRoles()
  }

  @Mutation(returns => Role, { name: 'NewRole' })
  @Roles(role_title.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  newRole(@Args('role') createRoleInput: CreateRoleInput){
    return this.roleService.createNewRole(createRoleInput)
  }
}

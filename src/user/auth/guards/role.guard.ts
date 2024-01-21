import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector){}

    matchRoles(roles: string[], userRole: string){
        return roles.some(role=> role===userRole)
    }
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles',context.getHandler())
        if(! roles){
            return true
        }
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;
        return this.matchRoles(roles,user.role.title)
    }
}
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "../user.service";
import { Strategy,ExtractJwt } from 'passport-jwt'
import { Payload } from "./payload";
import { User } from "../entities/user.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UserService){
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: "this is secret key"
        });
    }

    async validate(payload: Payload): Promise<User>{
        const user = this.userService.validateUser(payload)
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
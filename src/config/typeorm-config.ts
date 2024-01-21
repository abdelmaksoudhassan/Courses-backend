import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const typeOrmConfig:TypeOrmModuleOptions = {
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'root',
    database:'grahQL',
    entities:[join(__dirname,'./../**','*.entity.{js,ts}')],
    synchronize:true
}
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const typeOrmConfig:TypeOrmModuleOptions = {
    // type:'postgres',
    // host:'localhost',
    // port:5432,
    // username:'postgres',
    // password:'root',
    // database:'grahQL',
    // entities:[join(__dirname,'./../**','*.entity.{js,ts}')],
    // synchronize:true
    type:'postgres',
    host:'bxutq9ydddgpfwmcy9pc-postgresql.services.clever-cloud.com',
    port:50013,
    username:'unwdtmydyqquddhkd5nr',
    password:'XgfKQJK201ElNQcc465SZdQ2SYIEEK',
    database:'bxutq9ydddgpfwmcy9pc',
    entities:[join(__dirname,'./../**','*.entity.{js,ts}')],
    synchronize:true
}
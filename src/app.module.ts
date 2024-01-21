import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      installSubscriptionHandlers: true,
      subscriptions:{
        'subscriptions-transport-ws': {
          path: '/graphql'
        }
      }
    }),
    UserModule,
    RoleModule,
    CourseModule,
    LessonModule,
    MediaModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ]
})
export class AppModule {}
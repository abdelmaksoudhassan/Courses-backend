import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Media ]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}

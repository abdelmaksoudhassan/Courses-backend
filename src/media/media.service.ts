import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {
    constructor(@InjectRepository(Media) private readonly mediaRepository:Repository<Media>){}

    createMedia(fileName: string): Promise<Media>{
        const video = this.mediaRepository.create({ url: fileName })
        return this.mediaRepository.save(video)
    }
}

import { ArgumentMetadata, BadRequestException, Injectable, NotAcceptableException, PipeTransform } from '@nestjs/common';
import { deleteFile } from 'src/helpers/helpers';

@Injectable()
export class VideoPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if(! value){
      throw new BadRequestException('Please select file to upload')
    }
    if(value.size > 1024*1024*5){
        deleteFile(value.path)
        throw new NotAcceptableException('Video size is too large')
    }
    if(value.mimetype != 'video/mp4'){
        deleteFile(value.path)
        throw new BadRequestException('Media type not supported')
    }
    return value;
  }
}
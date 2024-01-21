import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/user/auth/decorators/roles.decorator';
import { role_title } from 'src/user/auth/role.enum';
import { RolesGuard } from './guards/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { VideoPipe } from './pipes/video.pipe';
import { Media } from './entities/media.entity';
import { Request, Response } from 'express';
import { createReadStream, statSync } from 'fs';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('/lesson')
  @Roles(role_title.instructor)
  @UseGuards(AuthGuard(),RolesGuard)
  @UseInterceptors(
    FileInterceptor('video',{
      storage: diskStorage({
        filename: function (req, file, cb) {
          var name = file.originalname;
          cb(null, (Date.now()+'-video-'+name).replace(/ /g,""))
        },
        destination: function (req, file, cb) {
          cb(null, './src/media/uploads')
        },
      })
    })
  )
  addVideo(@UploadedFile(VideoPipe) file:Express.Multer.File): Promise<Media>{
    const fileName = file.filename
    return this.mediaService.createMedia(fileName)
  }

  @Get('/lesson/:id')
  @Roles(role_title.student)
  @UseGuards(AuthGuard(),RolesGuard)
  playVideo(@Param('path') path: string, @Req() req: Request, @Res() res: Response){
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath = `./src/media/uploads/${path}`;
    const videoSize = statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  }
}
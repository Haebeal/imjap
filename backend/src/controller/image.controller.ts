import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
} from "@nestjs/common";
import { ImageService } from "~/service/image.service";

@Controller("images")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async getImages() {
    const images = await this.imageService.getImageList();
    return images;
  }

  @Get(":id")
  async getImage(@Param() params) {
    const blob = await this.imageService.downloadImage(params.id);
    // ファイルがダウンロードできるようStreamableFileオブジェクトに変換し、returnする
    return new StreamableFile(Buffer.from(await blob.arrayBuffer()), {
      type: blob.type,
      disposition: "inline",
    });
  }

  @Post()
  postImage(@Body() body) {
    return this.imageService.uploadImage(body.data);
  }
}

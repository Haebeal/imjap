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

  @Get(":id")
  async getImage(@Param() params) {
    const blob = await this.imageService.downloadFile(params.id);
    const arrayBuffer = await blob.arrayBuffer();
    return new StreamableFile(Buffer.from(arrayBuffer), {
      type: blob.type,
      disposition: "inline",
    });
  }

  @Post()
  postImage(@Body() body) {
    return this.imageService.uploadImage(body.data);
  }
}

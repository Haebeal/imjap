import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ImageService } from "~/service/image.service";

@Controller("images")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(":id")
  async getImage(@Param() id: string) {
    return id;
  }

  @Post()
  async postImage(@Body() body) {
    return await this.imageService.uploadImage(body.data);
  }
}

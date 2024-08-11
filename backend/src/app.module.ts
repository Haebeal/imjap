import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ImageController } from "~/controller/image.controller";
import { StorageRepository } from "~/repository/storage.repository";
import { ImageService } from "~/service/image.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService, StorageRepository],
})
export class AppModule {}

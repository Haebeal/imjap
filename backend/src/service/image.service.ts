import { Inject, Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { StorageRepository } from "~/repository/storage.repository";
import { decode } from "base64-arraybuffer";

@Injectable()
export class ImageService {
  constructor(
    @Inject(StorageRepository)
    private readonly storageRepository: StorageRepository
  ) {}

  async downloadFile(id: string) {
    const blob = await this.storageRepository.downloadFileById(id);
    return blob;
  }

  uploadImage(data: string) {
    const fileName = randomUUID();
    return this.storageRepository.uploadFile(
      fileName,
      decode(data.replace(/^data:\w+\/\w+;base64,/, "")),
      data.slice(data.indexOf(":") + 1, data.indexOf(";"))
    );
  }
}

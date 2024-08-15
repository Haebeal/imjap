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

  /**
   * 画像一覧を取得するメソッド
   * @returns 画像一覧
   */
  async getImageList() {
    const images = await this.storageRepository.getFileList();
    return images.map((image) => ({
      id: image.name,
    }));
  }

  /**
   * 画像をダウンロードするメソッド
   * @param id 画像ID
   * @returns 画像のBlobオブジェクト
   */
  async downloadImage(id: string) {
    const blob = await this.storageRepository.downloadFileById(id);
    return blob;
  }

  /**
   * 画像をアップロードするメソッド
   * @param data
   * @returns
   */
  uploadImage(data: string) {
    // 画像IDとしてランダムなUUIDを設定
    const fileName = randomUUID();
    return this.storageRepository.uploadFile(
      fileName,
      decode(data.replace(/^data:\w+\/\w+;base64,/, "")),
      data.slice(data.indexOf(":") + 1, data.indexOf(";"))
    );
  }
}

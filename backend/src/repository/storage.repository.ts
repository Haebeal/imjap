import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class StorageRepository {
  private supabase: SupabaseClient;

  // Supabaseのインスタンス作成
  constructor(private configService: ConfigService) {
    const supabase = createClient(
      this.configService.get<string>("SUPABASE_URL"),
      this.configService.get<string>("SUPABASE_ANON_KEY")
    );
    this.supabase = supabase;
  }

  /**
   * ファイルをダウンロードするメソッド
   * @param fileName ファイル名
   * @returns ファイルのBlobオブジェクト
   */
  async downloadFileById(fileName: string) {
    const { data, error } = await this.supabase.storage
      .from("images")
      .download(fileName);
    if (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
    return data;
  }

  /**
   * Base64でエンコードされたBlobをアップロードするメソッド
   * @param fileName ファイル名
   * @param arrayBuffer アップロードするファイルのArrayBufferオブジェクト
   * @param contentType アップロードするファイルのメディア種別
   * @returns
   */
  uploadFile(fileName: string, arrayBuffer: ArrayBuffer, contentType?: string) {
    return this.supabase.storage.from("images").upload(fileName, arrayBuffer, {
      contentType,
    });
  }
}

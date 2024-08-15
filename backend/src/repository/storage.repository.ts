import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class StorageRepository {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    // Supabaseのインスタンスを作成
    const supabase = createClient(
      this.configService.get<string>("SUPABASE_URL"),
      this.configService.get<string>("SUPABASE_ANON_KEY")
    );
    this.supabase = supabase;
  }

  /**
   * ファイル一覧を取得するメソッド
   * @param limit 取得数の上限
   * @returns ファイル情報の配列
   */
  async getFileList(limit?: number) {
    const { data, error } = await this.supabase.storage
      .from("images")
      .list(undefined, {
        limit,
      });
    if (error) {
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
    return data;
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

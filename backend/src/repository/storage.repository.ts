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

  // IDのファイルをダウンロードするメソッド
  async downloadFileById(id: string) {
    const { data, error } = await this.supabase.storage
      .from("images")
      .download(id);
    if (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
    return data;
  }

  // Base64でエンコードされたBlobをアップロードするメソッド
  uploadFile(fileName: string, arrayBuffer: ArrayBuffer, contentType: string) {
    return this.supabase.storage.from("images").upload(fileName, arrayBuffer, {
      contentType,
    });
  }
}

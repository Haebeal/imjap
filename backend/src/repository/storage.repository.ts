import { Injectable } from "@nestjs/common";
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

  // ファイルIDからファイルのURLを取得するメソッド
  getPublicUrl(id: string) {
    const { data } = this.supabase.storage.from("images").getPublicUrl(id);
    return data.publicUrl;
  }

  // Base64でエンコードされたBlobをアップロードするメソッド
  uploadFile(fileName: string, arrayBuffer: ArrayBuffer, contentType: string) {
    return this.supabase.storage.from("images").upload(fileName, arrayBuffer, {
      contentType,
    });
  }
}

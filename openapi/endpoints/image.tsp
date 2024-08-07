import "@typespec/http";

using TypeSpec.Http;

namespace imjap;

/**
 * 画像投稿機能に関するエンドポイント
 */
@tag("Images")
@route("images")
namespace ImageEndpoints {
  /**
   * 画像の投稿
   */
  @route("upload")
  @summary("画像の投稿")
  @post
  op postImage(@body image: PostImage):
  | Image;

  /**
   * 画像の取得
   */
  @route("{imageId}")
  @summary("画像の取得")
  @get
  op getImage(@path imageId: string):
  | Image;

}

model PostImage {
  /**
   * ファイル名
   */
  filename: string;

  /**
   * ファイルタイプ
   */
  filetype: string;

  /**
   * 画像データ(base64でエンコードされた文字列)
   */
  data: string
}

model Image {
  /**
   * 画像ID
   */
  fielId: string;

  /**
   * 画像URL
   */
  fileUrl: string;
}

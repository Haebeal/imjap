import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

import "./endpoints";

using TypeSpec.Http;

@service({
  title: "imjap",
})
@server("https://imjap-api.haebeal.net", "本番環境")
namespace imjap;

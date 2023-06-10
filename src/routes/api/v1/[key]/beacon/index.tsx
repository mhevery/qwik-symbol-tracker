import { type RequestHandler } from "@builder.io/qwik-city";
import { QSymbolBeaconPayload } from "~/types/beacon-API";

export const onPost: RequestHandler = async ({ exit, text, request }) => {
  console.log("API: POST: symbol");
  const payload = QSymbolBeaconPayload.parse(await request.json());
  console.log("  payload", payload);
  exit();
  text(200, "OK");
};

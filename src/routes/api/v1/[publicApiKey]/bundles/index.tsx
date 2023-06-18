import { type RequestHandler } from "@builder.io/qwik-city";
import { getBundleGrouping } from "./chunks";

export const onGet: RequestHandler = async ({ exit, json, params }) => {
  json(200, await getBundleGrouping(params.publicApiKey));
  exit();
};

import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import {
  createServerClient,
  type SupabaseClient,
} from "supabase-auth-helpers-qwik";
import type { Database } from "../types/supabase";

export type sharedMap = {
  supabase: ReturnType<typeof createServerClient>;
};

export interface RouteSharedMap extends Map<string, any> {
  get(name: "supabase"): SupabaseClient<Database>;
}

export const onRequest: RequestHandler = (event) => {
  const supabase = createServerClient(
    event.env.get("PUBLIC_SUPABASE_URL")!,
    event.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
    event
  );
  event.sharedMap.set("supabase", supabase);
};

export function getSupabase(sharedMap: Map<string, any>) {
  return (sharedMap as RouteSharedMap).get("supabase");
}

export const useSession = routeLoader$(async ({ sharedMap }) => {
  const supabase = getSupabase(sharedMap);
  const userResponse = await supabase.auth.getSession();
  const session = userResponse.data;
  return session;
});

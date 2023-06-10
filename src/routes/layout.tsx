import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import {
  createServerClient,
  type SupabaseClient,
} from "supabase-auth-helpers-qwik";
import type { Database } from "../types/supabase";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return <Slot />;
});

export const onRequest: RequestHandler = async (reqEv) => {
  const { sharedMap } = reqEv;
  const supabase = createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    reqEv
  );
  sharedMap.set("supabase", supabase);
};

export function getSupabase(sharedMap: Map<string, any>): SupabaseClient {
  return sharedMap.get("supabase") as SupabaseClient<Database>;
}

export const useUser = routeLoader$(async ({ sharedMap }) => {
  const supabase = getSupabase(sharedMap);
  const userResponse = await supabase.auth.getUser();
  //console.log("userResponse", userResponse);
  const user = userResponse.data;
  return user;
});

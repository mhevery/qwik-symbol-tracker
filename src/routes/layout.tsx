import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import { useSession } from "./plugin@supabase";

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
  const session = useSession();
  return (
    <div>
      <header>{/* <pre>{JSON.stringify(session, null, 2)}</pre> */}</header>
      <main>
        <Slot />
      </main>
      <footer>Build with ❤️ by Builder.io</footer>
    </div>
  );
});

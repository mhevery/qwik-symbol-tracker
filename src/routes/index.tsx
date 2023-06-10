import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "./layout";

export default component$(() => {
  const user = useUser();
  return (
    <>
      <h1>Qwiksand</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
        <button
          onClick$={async () => {
            const supabase = createClient(
              import.meta.env.PUBLIC_SUPABASE_URL,
              import.meta.env.PUBLIC_SUPABASE_ANON_KEY
            );
            const session = await supabase.auth.getSession();
            console.log("session", session);
          }}
        >
          check
        </button>
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { createClient } from "@supabase/supabase-js";
import { getDB } from "../db";
import { applicationTable } from "../db/schema";

export const useApplications = routeLoader$(async () => {
  const db = getDB();
  const apps = await db.select().from(applicationTable).all();
  return apps;
});

export default component$(() => {
  const apps = useApplications();
  return (
    <>
      <h1>Qwik Bundle Defrag</h1>
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
      <hr />
      <h2>Applications</h2>
      <a href="/app/new">Create new application</a>
      <ul>
        {apps.value.map((app) => (
          <li key={app.id}>
            <a href={`/app/${app.publicApiKey}`}>{app.name}</a>
          </li>
        ))}
      </ul>
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

import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { Auth } from "./index.react";


const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);



export default component$(() => {
  return (
    <div>
      <Auth
    </div>
  );
});

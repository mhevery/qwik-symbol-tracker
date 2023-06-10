import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { Auth } from "./index.react";


const supabase = createClient(
  "<INSERT PROJECT URL>",
  "<INSERT PROJECT ANON API KEY>"
);



export default component$(() => {
  return (
    <div>
      <Auth
    </div>
  );
});

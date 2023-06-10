/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { Auth } from "@supabase/auth-ui-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export default () =>
  qwikify$(() => {
    return (
      <Auth supabaseClient={supabase} appearance={{ theme: "ThemeSupa" }} />
    );
    s;
  });

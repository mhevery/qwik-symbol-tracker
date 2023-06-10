/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { Auth } from "@supabase/auth-ui-react";

export default () =>
  qwikify$(() => {
    return (
      <Auth supabaseClient={supabase} appearance={{ theme: "ThemeSupa" }} />
    );
    s;
  });

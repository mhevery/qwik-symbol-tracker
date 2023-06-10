/** @jsxImportSource react */
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { qwikify$ } from "@builder.io/qwik-react";

const supabase = createClient(
  "<INSERT PROJECT URL>",
  "<INSERT PROJECT ANON API KEY>"
);

const Auth = () => qwikify$(<Auth supabaseClient={supabase} />);

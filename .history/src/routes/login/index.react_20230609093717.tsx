/** @jsxImportSource react */
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { qwikify$ } from "@builder.io/qwik-react";

const Auth = () => qwikify$(Auth);

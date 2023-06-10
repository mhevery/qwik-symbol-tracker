import { component$, useStylesScoped$ } from "@builder.io/qwik";
import Auth from "./index.react";
import CSS from "./index.css?inline";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  useStylesScoped$(CSS);
  const location = useLocation();
  const redirectUrl = new URL("/auth/jwt", location.url).toString();
  return (
    <div class="auth">
      <Auth redirectUrl={redirectUrl} />
    </div>
  );
});

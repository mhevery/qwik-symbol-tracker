import { component$, useStylesScoped$ } from "@builder.io/qwik";
import Auth from "./index.react";
import CSS from "./index.css?inline";

export default component$(() => {
  useStylesScoped$(CSS);
  return (
    <div class="auth">
      <Auth />
    </div>
  );
});

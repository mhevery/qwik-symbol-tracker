import { component$ } from "@builder.io/qwik";
import Auth from "./index.react";

export default component$(() => {
  return (
    <div class="auth">
      <Auth />
    </div>
  );
});

import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { Auth } from "./index.react";

export default component$(() => {
  return (
    <div>
      <Form>
        <h1>Login</h1>
        <label>username</label>
        <input name="username" />
        <label>password</label>
        <input name="password" type="password" />
      </Form>
    </div>
  );
});

import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { getSupabase } from "~/routes/plugin@supabase";

export const useJwtAuthAction = routeAction$(
  async (data, { sharedMap, redirect }) => {
    const supabase = getSupabase(sharedMap);
    console.log("data", data);
    const response = await supabase.auth.setSession({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    });
    console.log("RESPONSE", response);
    if (false as any) {
      throw redirect(308, "/");
    }
  },
  zod$({
    access_token: z.string(),
    expires_in: z.coerce.number(),
    provider_refresh_token: z.string(),
    provider_token: z.string(),
    refresh_token: z.string(),
    token_type: z.string(),
  })
);

export default component$(() => {
  const jwtAuthAction = useJwtAuthAction();
  return (
    <div>
      <h1>Logging you in...</h1>
      <Form id="jwtProcessForm" action={jwtAuthAction}>
        <button type="submit">Process JWT</button>
      </Form>
      <script
        dangerouslySetInnerHTML={`(${processJwtToken})(window, document)`}
      />
    </div>
  );
});

function processJwtToken(window: Window, document: Document) {
  const form = document.getElementById("jwtProcessForm") as HTMLFormElement;
  const location = window.location;
  const url = new URL("?" + location.hash.substr(1), location.href);
  url.searchParams.forEach((value, key) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });
  //form.submit();
}

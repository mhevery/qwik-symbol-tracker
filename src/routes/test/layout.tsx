import { Slot, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div>
      <header>{/* <Clock /> */}</header>
      <Slot />
      <footer>
        [ <Link href="/test/">/test/</Link>
        {" | "}
        <Link href="/test/events/">/test/events/</Link>
        {" | "}
        <Link href="/test/diamond/">/test/diamond/</Link>
        {" | "}
        <Link href="/test/static/">/test/static/</Link> ]
        <hr />
        Build with ❤️ by Builder.io
      </footer>
    </div>
  );
});

export const Clock = component$(() => {
  const time = useSignal("loading....");
  useVisibleTask$(({ cleanup }) => {
    const update = () => (time.value = new Date().toLocaleTimeString());
    update();
    const id = setInterval(update, 1000);
    cleanup(() => clearInterval(id));
  });
  return <div>Current Time: {time.value}</div>;
});

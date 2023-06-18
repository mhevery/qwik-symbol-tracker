import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
  $,
} from "@builder.io/qwik";

export default component$(() => {
  const count = useSignal(0);
  useTask$(({ track }) => {
    console.log(
      "Count",
      track(() => count.value)
    );
  });
  useTask$(({ track }) => {
    const value = track(() => count.value);
    setTimeout(
      $(() => console.log("value", value)),
      1000
    );
  });
  useComputed$(() => count.value);
  return (
    <div>
      <button onClick$={() => console.log("Hello")}>console.greet</button>
      <button onClick$={() => count.value++}>Count {count.value}</button>
    </div>
  );
});

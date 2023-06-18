import { component$, useComputed$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const countA = useSignal(0);
  const countB = useSignal(0);
  const total = useComputed$(() => countA.value + countB.value);
  return (
    <div>
      <button onClick$={() => countA.value++}>A {countA.value}</button>
      <button onClick$={() => countB.value++}>B {countB.value}</button>
      Total: {total.value}
    </div>
  );
});

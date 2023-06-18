import {
  component$,
  useComputed$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useList = routeLoader$(() => {
  return ["Adam", "Misko", "Manu"];
});

export default component$(() => {
  const count = useSignal(0);
  const filter = useSignal("");
  useVisibleTask$(() => {
    console.log("TEST: visible task");
    setTimeout(() => count.value++, 1000);
  });
  const negativeCount = useComputed$(() => -count.value);
  const list = useList();
  const filteredList = useComputed$(() =>
    list.value.filter(
      (v) => v.toLowerCase().indexOf(filter.value.toLowerCase()) != -1
    )
  );
  return (
    <div>
      <h1>Qwik Defrag Test Page</h1>
      <div>
        Count: {count.value}/{negativeCount.value}
      </div>
      <button onClick$={() => count.value++}>+1</button>
      <hr />
      <input bind:value={filter} />
      <ul>
        {filteredList.value.map((name, idx) => (
          <ul key={idx}>{name}</ul>
        ))}
      </ul>
    </div>
  );
});

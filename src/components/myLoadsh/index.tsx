import { $, component$, useStore } from "@builder.io/qwik";
import now from "lodash/now";

export default component$(() => {
  const store = useStore({
    value: 1,
  });

  const add = $(() => {
    store.value = now();
  });

  return (
    <div>
      <h4>lodash</h4>
      <button onclick$={() => add()}>lodash/now：获取当前时间</button>
      <div>{store.value}</div>
    </div>
  );
});

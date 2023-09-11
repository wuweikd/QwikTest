import { $, component$, useOnDocument, useStore } from "@builder.io/qwik";
import md5 from "md5";

export default component$(() => {
  const store = useStore({
    value: "1111",
    md5Value: "",
  });

  const getMd5 = $(() => {
    store.md5Value = md5(store.value);
  });

  return (
    <div>
      <div>md5</div>
      <input
        type="text"
        value={store.value}
        onInput$={(event: any) => {
          store.value = event?.target?.value;
        }}
      />
      <button onClick$={getMd5}>获取输入的md5值</button>
      <div>{store.md5Value}</div>
    </div>
  );
});

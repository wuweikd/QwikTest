import {
  component$,
  useResource$,
  useStore,
  Resource,
  $,
} from "@builder.io/qwik";
import styles from "./productList.module.css";
import { productListMockData } from "~/mock/productList";

async function getDate() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productListMockData);
    }, 200);
  });
}

export default component$(() => {
  const store = useStore({
    city: "",
  });

  const dataResource = useResource$<any>(async ({ track, cleanup }) => {
    const cityName = track(() => store.city);
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    const res = await getDate();
    console.log("cityName--->", cityName);
    console.log("res--->", res);
    return res;
  });

  const openDetail = $(() => {
    console.log("xxxxx", (location.href = "/product"));
  });

  return (
    <div class={styles.productList}>
      <div>
        <span>请输入搜索产地：</span>
        <input
          name="city"
          onInput$={(ev: any) => (store.city = ev.target.value)}
        />
      </div>

      <Resource
        value={dataResource}
        onResolved={(data) => {
          return (
            <div class={styles.list}>
              {data.list.map((item: any, index: number) => (
                <div
                  key={index}
                  class={styles.item}
                  onclick$={() => openDetail(item)}
                >
                  <img height={450} src={item.pic} alt="" width={450} />
                  <div>商品名称：{item.name}</div>
                  <div>商品产地：{item.address}</div>
                </div>
              ))}
            </div>
          );
        }}
      ></Resource>
    </div>
  );
});

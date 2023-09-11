import {
  component$,
  useTask$,
  useOnDocument,
  $,
  useStore,
} from "@builder.io/qwik";
import ProductList from "~/components/productList/productList";
import { dpReport, start } from "../performance/lib/index";

export default component$(() => {
  const store = useStore({
    info: "",
  });
  useTask$(() => {
    console.info("useTask$");
  });

  function usePerformance() {
    useOnDocument(
      "DOMContentLoaded",
      $(() => {
        console.log("usePerformance 2");
        start({
          performanceKey: "xx",
          cb: (p) => {
            console.log("cb----");
            console.info(p);
            store.info = p.data.moreinfo;
          },
          hiidoUrl: "https://xxxx.xxxx.xxxx/c.gif",
        });
      }),
    );
  }

  usePerformance();
  const getReport = $(() => {
    dpReport();
  });

  return (
    <>
      <button>
        <h4 onclick$={getReport}>获取页面性能报告</h4>
      </button>
      <h5>{store.info}</h5>
      <h2>这是个QWIK 项目</h2>
      <h4>
        关于QWIK的运行性能：
        <a href="https://github.com/krausest/js-framework-benchmark/issues/1111">
          点击查看
        </a>
      </h4>
      <h4>关于QWIK的启动性能：</h4>
      <div>1，首先在服务端进行一个接口请求，接口时间指定为 200 ms</div>
      <div>
        2，接口将返回100条商品数据在首页渲染，首页将使用antd为第三方库模拟实际情况
      </div>
      <div>
        3, 点击商品将调用商品接口（接口200ms）查询详情，并进入商品详情页面。
      </div>
      <div>
        4, 为模拟商品详情页的复杂情况，商品页会同时加载5种常见的第三方sdk:
        echarts、JQuery、swiper、lodash，md5，同时会加载5*500K的商品图片。且会加载20个类似（不是同一个）的Echarts组件。
      </div>
      <div>5, 测试会在5G、4G、3G情况下，统计FCP、LCP、TTFB、FID 等指标</div>
      <div>6, 测试会不同级别CPU，统计FCP、LCP、TTFB、FID 等指标</div>
      <ProductList></ProductList>
    </>
  );
});

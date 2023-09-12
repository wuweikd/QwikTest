import MySwiper from "~/components/mySwiper/mySwiper";
import MyLoadsh from "~/components/myLoadsh";
import MyEcharts from "~/components/myEcharts";
import MyEcharts2 from "../../components/myEchart2";
import MyEcharts3 from "~/components/myEchart3";
import MyEcharts4 from "~/components/myEchart4";
import MyEcharts5 from "~/components/myEchart5";
import MyEcharts6 from "~/components/myEchart6";
import MyEcharts7 from "~/components/myEchart7";
import MyEcharts8 from "~/components/myEchart8";
import MyEcharts9 from "~/components/myEchart9";
import MyEcharts10 from "~/components/myEchart10";
import MyEcharts11 from "~/components/myEchart11";
import MyEcharts12 from "~/components/myEchart12";
import MyJquery from "~/components/myJquery";
import MyMd5 from "~/components/myMd5";
import ProductList from "~/components/productList/productList";
import { $, component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { start, dpReport } from "~/performance/lib";

const Product = component$(() => {
  const store = useStore({
    info: "",
  });
  function usePerformance() {
    useVisibleTask$(() => {
      start({
        performanceKey: "product",
        cb: (p) => {
          console.log("cb----");
          console.info(p);
          store.info = p.data.moreinfo;
        },
        hiidoUrl: "https://xxxx.xxxx.xxxx/c.gif",
      });
    });
  }
  usePerformance();

  const getReport = $(() => {
    dpReport();
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h1>商品详情页</h1>
      <button onclick$={getReport}>
        <h4>获取页面性能报告</h4>
      </button>
      <h5>{store.info}</h5>
      <MySwiper></MySwiper>
      <MyLoadsh></MyLoadsh>
      <MyJquery></MyJquery>
      <MyMd5></MyMd5>
      <MyEcharts></MyEcharts>
      <MyEcharts2></MyEcharts2>
      <MyEcharts3></MyEcharts3>
      <MyEcharts4></MyEcharts4>
      <MyEcharts5></MyEcharts5>
      <MyEcharts6></MyEcharts6>
      <MyEcharts7></MyEcharts7>
      <MyEcharts8></MyEcharts8>
      <MyEcharts9></MyEcharts9>
      <MyEcharts10></MyEcharts10>
      <MyEcharts11></MyEcharts11>
      <MyEcharts12></MyEcharts12>
      <ProductList></ProductList>
    </div>
  );
});

export default Product;

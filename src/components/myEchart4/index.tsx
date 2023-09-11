import * as echarts from "echarts";
import { $, component$, useOnDocument } from "@builder.io/qwik";

const initEcharts = () => {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById("e4"));
  // 绘制图表
  myChart.setOption({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
};

function useInitEcharts() {
  useOnDocument(
    "DOMContentLoaded",
    $(() => {
      initEcharts();
    }),
  );
}

export default component$(() => {
  useInitEcharts();
  return (
    <div>
      <div>echarts</div>
      <div id={"e4"} style={{ width: "500px", height: "300px" }}></div>
    </div>
  );
});

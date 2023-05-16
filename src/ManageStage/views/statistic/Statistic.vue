<script setup lang="ts">
// 由于仅在这里使用ecahrts 所以 没有进行全局挂载
import * as echarts from "echarts";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { createWebSocket, sendSock, closeSock } from "@/websocket";
import { ElMessage } from "element-plus";
import { ADMIN_PASSWORD, ADMIN_USER_NAME, getValue } from "@/cath";
// 获取图表信息
const getChartInfo = (resvalue: any) => {
  userDate.value.length = 0;
  const [resume, user] = resvalue;
  userDate.value.push(...user.split(","));
  resume.split(",").forEach((element: any, index: number) => {
    resumeDate.value[index].value = element;
  });
  nextTick(() => {
    const userChart = echarts.init(document.getElementById("userInfo") as HTMLElement);
    const resumeChart = echarts.init(
      document.getElementById("resumeInfo") as HTMLElement
    );

    /**绘制图表 */
    // 用户信息
    userChart.setOption({
      title: {
        text: "用户数量",
      },
      tooltip: {},
      xAxis: {
        data: ["求职者", "内推者"],
      },
      yAxis: {},
      series: [
        {
          name: "用户数量",
          type: "bar",
          data: userDate.value,
        },
      ],
    });
    // 简历数量及比例
    resumeChart.setOption({
      title: {
        text: "简历状态及比例",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "状态信息",
          type: "pie",
          radius: "50%",
          data: resumeDate.value,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  });
};
// 先创建连接
createWebSocket(getChartInfo, () => {
  ElMessage.error({ message: "网络连接失败，请重新连接网络" });
});

// 获取图像信息
sendSock({ userName: getValue(ADMIN_USER_NAME), password: getValue(ADMIN_PASSWORD) });

// 用户信息
const userDate = ref([] as any[]);
// 简历统计数据
const resumeDate = ref([
  { value: 0, name: "已投递" },
  { value: 0, name: "面试中" },
  { value: 0, name: "offer" },
  { value: 0, name: "结束" },
]);
onMounted(() => {
  const userChart = echarts.init(document.getElementById("userInfo") as HTMLElement);
  const resumeChart = echarts.init(document.getElementById("resumeInfo") as HTMLElement);

  /**绘制图表 */
  // 用户信息
  userChart.setOption({
    title: {
      text: "用户数量",
    },
    tooltip: {},
    xAxis: {
      data: ["求职者", "内推者"],
    },
    yAxis: {},
    series: [
      {
        name: "用户数量",
        type: "bar",
        data: userDate.value,
      },
    ],
  });
  // 简历数量及比例
  resumeChart.setOption({
    title: {
      text: "简历状态及比例",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "状态信息",
        type: "pie",
        radius: "50%",
        data: resumeDate.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });
});
onUnmounted(() => {
  // 关闭socket连接
  closeSock();
});
</script>

<template>
  <el-card header="用户信息与简历统计分析">
    <div class="warp">
      <el-card>
        <div
          id="userInfo"
          style="width: 40rem; min-width: 20rem; height: 40rem; min-height: 40rem"
        ></div>
      </el-card>
      <el-card>
        <div
          id="resumeInfo"
          style="width: 40rem; min-width: 20rem; height: 40rem; min-height: 40rem"
        ></div>
      </el-card>
    </div>
  </el-card>
</template>
<style scoped lang="scss">
.warp {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>

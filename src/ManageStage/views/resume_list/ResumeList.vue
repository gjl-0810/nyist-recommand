<script setup lang="ts">
import { reactive, ref, toRaw, watch } from "@vue/runtime-dom";
import { STEP_TO_STATUS } from "@/utils/instance";
import { ADMIN_PASSWORD, ADMIN_USER_NAME, getValue } from "@/cath";
import type { CascaderValue } from "element-plus/es/components/cascader-panel/src/types";
import { ElMessage } from "element-plus";
import type { RecommondResumeInfoList } from "@/http/reception/resume/resumeType";
import {
  adminGetCompanyList,
  adminGetRecommondPositonList,
} from "@/http/back/recommond/recommond";
import { adminGetResumePositionList } from "@/http/back/resume/resume";

const cascaderList = reactive({
  companyList: [] as { label: string; value: string }[],
  resumePositionList: [] as { label: string; value: string }[],
});
// const searchInfo = reactive({
//   companyName: "",
//   recommondPosition: "",
// });
const companyName = ref("");
const recommondPosition = ref("");
const tableDate = reactive({
  infoList: [] as RecommondResumeInfoList[],
});

const total = ref(0);
const pageInfo = reactive({
  currentPage: 1,
  pageSize: 10,
});
const handelPageSize = (value: number) => {
  pageInfo.pageSize = value;
};
const handelCurrentPage = (value: number) => {
  pageInfo.currentPage = value;
};
// companyName 改变
const handelComanyName = (value: CascaderValue) => {
  if (value) {
    companyName.value = toRaw(value).toString();
  } else {
    companyName.value = "";
  }
  recommondPosition.value = "";
};

// recommondPosition 改变
const handelRecommondPosition = (value: CascaderValue) => {
  recommondPosition.value = value ? toRaw(value).toString() : "";
};

// 获取companyList
const getCompanyList = () =>
  adminGetCompanyList(
    { username: getValue(ADMIN_USER_NAME), password: getValue(ADMIN_PASSWORD) },
    (res) => {
      res.data.companyList.forEach((index) => {
        cascaderList.companyList.push({
          label: index.companyName,
          value: index.companyName,
        });
      });
    }
  );
// 获取recommondPositionList

const getRecommondPositionList = () =>
  adminGetRecommondPositonList(
    {
      username: getValue(ADMIN_USER_NAME),
      password: getValue(ADMIN_PASSWORD),
      companyName: companyName.value,
    },
    (res) => {
      res.data.resumePositionList.forEach((index) => {
        cascaderList.resumePositionList.push({
          label: index.recommondPosition,
          value: index.recommondPosition,
        });
      });
    }
  );
// 获取tableList
const getResumeInfo = () => {
  adminGetResumePositionList(
    {
      username: getValue(ADMIN_USER_NAME),
      password: getValue(ADMIN_PASSWORD),
      companyName: companyName.value,
      resumePosition: recommondPosition.value,
      pagesize: pageInfo.pageSize,
      currentPage: pageInfo.currentPage - 1,
    },
    (res) => {
      const { message, resumePositionList } = res.data;
      total.value = res.data.total;
      tableDate.infoList.length = 0;
      tableDate.infoList.push(...resumePositionList);
      ElMessage({ message, type: "success", grouping: true });
    }
  );
};
Promise.all([getCompanyList(), getRecommondPositionList(), getResumeInfo()]);
// 简历列表
watch([recommondPosition, pageInfo], () => {
  getResumeInfo();
});
</script>
<template>
  <el-card>
    <el-table
      border
      highlight-current-row
      stripe
      height="29rem"
      :data="tableDate.infoList"
      style="width: 100%"
    >
      <el-table-column>
        <template #header>
          <span>
            公司名称：
            <el-cascader
              v-model="companyName"
              clearable
              placeholder="请输入/选择公司名称"
              :options="cascaderList.companyList"
              @change="(value:CascaderValue)=>handelComanyName(value)"
              filterable
            />
          </span>
          <span>
            职位列表：
            <el-cascader
              clearable
              v-model="recommondPosition"
              placeholder="请输入/选择职位"
              :options="cascaderList.resumePositionList"
              @change="(value:CascaderValue)=>handelRecommondPosition(value)"
              filterable
            />
          </span>
        </template>
        <el-table-column label="投递日期" prop="date" align="center" />
        <el-table-column label="投递者邮箱" prop="deliverEmail" align="center" />
        <el-table-column label="投递职位" prop="recommondPosition" align="center" />
        <el-table-column label="简历状态" prop="deliverStatus" align="center">
          <template #default="scope">
            {{ STEP_TO_STATUS[scope.row.deliverStatus] }}
          </template>
        </el-table-column>
      </el-table-column>
      <template #empty>
        <div>暂时没有投递记录哦</div>
      </template>
    </el-table>
    <el-pagination
      class="page"
      background
      layout="prev, pager, next,sizes"
      :current-page="pageInfo.currentPage"
      :page-size="pageInfo.pageSize"
      @size-change="handelPageSize"
      @current-change="handelCurrentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :total="total"
    />
  </el-card>
</template>
<style scoped lang="scss">
.icon {
  vertical-align: text-bottom;
}
.icon:hover {
  color: #409eff;
  cursor: pointer;
}
.step-footer {
  display: flex;
  justify-content: space-around;
}
</style>

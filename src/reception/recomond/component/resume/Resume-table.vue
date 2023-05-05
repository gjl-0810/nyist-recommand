<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { reactive, ref, toRaw, watch } from "@vue/runtime-dom";
import { Edit, InfoFilled } from "@element-plus/icons-vue";
import { TOKEN, USERNAME, getValue, setValue } from "@/cath";
import { setpActiveMap } from "@/reception/common/constance";
import type { CascaderValue } from "element-plus/es/components/cascader-panel/src/types";
import { ElMessage } from "element-plus";
import type { RecommondResumeInfoList } from "@/http/reception/resume/resumeType";
import {
  deleteResume,
  getCompanyInfo,
  getResumeInfoList,
  updateResume,
} from "@/http/reception/resume/resume";
import { STEP_TO_STATUS } from "@/utils/instance";

const cascaderList = ref([] as { label: string; value: string }[]);
const companyName = ref("");
const setpActive = ref(1);
// 直接结束
const handelOver = () => {
  // 直接结束
  setpActive.value = 4;
  // next
};
// 下一步
const handelNext = () => {
  setpActive.value++;
};
// 切换companyName
// 按邮箱
const search = ref("");
const tableDate = reactive({
  infoList: [] as RecommondResumeInfoList[],
});
const filterTableData = computed(
  () =>
    tableDate.infoList.filter(
      (data) =>
        !search.value ||
        data.deliverEmail.toLowerCase().includes(search.value.toLowerCase())
    )
  // toRaw(tableDate.infoList)
);
const total = ref(0);
const pageInfo = reactive({
  currentPage: 1,
  pageSize: 10,
});
// 保存编辑，删除相关信息
const editOrDeleteInfo = reactive({
  deliverUsername: "",
  deliverEmail: "", //投递者邮箱
  username: "", //内推者账户
  recommondPosition: "", //投递职位
});
const handelPageSize = (value: number) => {
  pageInfo.pageSize = value;
};
const handelCurrentPage = (value: number) => {
  pageInfo.currentPage = value;
};
// 删除
const handleDelete = (index: number, row: RecommondResumeInfoList) => {
  editOrDeleteInfo.deliverUsername = row.deliverUsername;
  editOrDeleteInfo.deliverEmail = row.deliverEmail;
  editOrDeleteInfo.username = row.username;
  editOrDeleteInfo.recommondPosition = row.recommondPosition;
  deleteResume(
    {
      deliverUsername: editOrDeleteInfo.deliverUsername,
      deliverEmail: editOrDeleteInfo.deliverEmail,
      username: editOrDeleteInfo.username,
      recommondPosition: editOrDeleteInfo.recommondPosition,
    },
    (res) => {
      const { message } = res.data;
      ElMessage({ message, type: "success", grouping: true });
      // 更新列表
      getResumeInfo();
    }
  );
};
//编辑简历状态时
const handleEdit = (index: number, row: RecommondResumeInfoList) => {
  editOrDeleteInfo.deliverUsername = row.deliverUsername;
  editOrDeleteInfo.deliverEmail = row.deliverEmail; //投递者邮箱
  editOrDeleteInfo.username = row.username; //内推者账户
  editOrDeleteInfo.recommondPosition = row.recommondPosition;
  setpActive.value = Number(row.deliverStatus);
};

// 获取companyList
getCompanyInfo({ username: getValue(USERNAME) }, (res) => {
  res.data.companyList.forEach((index) => {
    cascaderList.value.push({ label: index.companyName, value: index.companyName });
  });
});
// 获取tableList
const getResumeInfo = () => {
  getResumeInfoList(
    {
      username: getValue(USERNAME),
      companyName: companyName.value,
      pagesize: pageInfo.pageSize,
      currentPage: pageInfo.currentPage - 1,
    },
    (res) => {
      const { message, resumeInfoList } = res.data;
      total.value = res.data.total;
      tableDate.infoList.length = 0;
      tableDate.infoList.push(...resumeInfoList);
      ElMessage({ message, type: "success", grouping: true });
    }
  );
};
getResumeInfo();
// 简历列表
watch([companyName, pageInfo], () => {
  getResumeInfo();
});

// 简历状态更新
watch(setpActive, () => {
  updateResume(
    {
      deliverUsername: editOrDeleteInfo.deliverUsername,
      deliverEmail: editOrDeleteInfo.deliverEmail,
      username: editOrDeleteInfo.username,
      recommondPosition: editOrDeleteInfo.recommondPosition,
      deliverStatus: STEP_TO_STATUS[setpActive.value],
    },
    (res) => {
      const { message } = res.data;
      ElMessage({ message, type: "success", grouping: true });
      getResumeInfo();
    }
  );
});
</script>
<template>
  <el-table
    border
    highlight-current-row
    stripe
    height="29rem"
    :data="filterTableData"
    style="width: 100%"
  >
    <el-table-column align="center">
      <template #header>
        公司名称：
        <el-cascader
          clearable
          placeholder="请输入/选择公司名称"
          :options="cascaderList"
          @change="(value:CascaderValue)=>{companyName=toRaw(value).toString()}"
          filterable
        />
      </template>
      <el-table-column label="投递日期" prop="date" align="center" />
      <el-table-column label="投递者邮箱" prop="deliverEmail" align="center" />
      <el-table-column label="投递职位" prop="recommondPosition" align="center" />
      <el-table-column label="简历状态" prop="deliverStatus" align="center">
        <template #default="scope">
          {{ setpActiveMap[scope.row.deliverStatus] }}
          <el-popover :width="400" trigger="click">
            <template #reference>
              <el-icon
                @click="handleEdit(scope.$index, scope.row)"
                class="icon"
                size="large"
                ><Edit
              /></el-icon>
            </template>
            <el-card>
              <el-steps :active="setpActive" finish-status="success">
                <el-step title="已投递" />
                <el-step title="面试中" />
                <el-step title="offer" />
              </el-steps>
              <el-divider />
              <div class="step-footer">
                <el-popconfirm
                  width="220"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  @confirm="handelNext"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="确定进入下一流程?我们将会以邮件的形式通知投递者"
                >
                  <template #reference>
                    <el-button type="success">下一步</el-button>
                  </template>
                </el-popconfirm>
                <el-popconfirm
                  width="220"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  @confirm="handelOver"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="确认结束流程？我们将会以邮件的形式通知投递者"
                >
                  <template #reference>
                    <el-button type="danger">流程结束</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </el-card>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template #header>
          <el-input v-model="search" size="small" placeholder="请输入邮箱地址" />
        </template>
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
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

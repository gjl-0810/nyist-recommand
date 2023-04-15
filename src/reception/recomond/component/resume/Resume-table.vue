<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { reactive, ref } from "@vue/runtime-dom";
import { Edit, InfoFilled } from "@element-plus/icons-vue";

interface ResumeInfo {
  startDate: string;
  email: string;
  resumeStatus: string;
}
const cascaderList = ref([
  { value: "guide", label: "Guide" },
  { value: "guide", label: "Guide" },
  { value: "guide", label: "Guide" },
  { value: "guide", label: "Guide" },
]);
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
const search = ref("");
const tableDate = reactive({
  infoList: [
    { startDate: "asdasd", email: "asdasd", resumeStatus: "asdasdasd" },
    { startDate: "asdasd", email: "asdasd", resumeStatus: "asdasdasd" },
    { startDate: "asdasd", email: "asdasd", resumeStatus: "asdasdasd" },
    { startDate: "asdasd", email: "asdasd", resumeStatus: "asdasdasd" },
  ] as ResumeInfo[],
});
const filterTableData = computed(
  () =>
    tableDate.infoList.filter(
      (data) =>
        !search.value || data.email.toLowerCase().includes(search.value.toLowerCase())
    )
  // toRaw(tableDate.infoList)
);
const pageInfo = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});
const handelPageSize = (value: number) => {
  pageInfo.pageSize = value;
};
const handelCurrentPage = (value: number) => {
  pageInfo.currentPage = value;
};
// 删除
const handleDelete = (index: number, row: ResumeInfo) => {};
//编辑简历状态
const handleEdit = (index: number, row: ResumeInfo) => {};
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
          placeholder="请输入/选择公司名称"
          :options="cascaderList"
          filterable
        />
      </template>
      <el-table-column label="投递日期" prop="startDate" align="center" />
      <el-table-column label="投递者邮箱" prop="email" align="center" />
      <el-table-column label="简历状态" prop="resumeStatus" align="center">
        <template #default="scope">
          {{ scope.row.resumeStatus }}
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
    :total="pageInfo.total"
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

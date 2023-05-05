<script setup lang="ts">
import EditFile from "./EditFile.vue";
import { computed } from "@vue/reactivity";
import { reactive, ref, watch } from "@vue/runtime-dom";
import { Edit } from "@element-plus/icons-vue";
import { ADMIN_PASSWORD, ADMIN_USER_NAME, getValue } from "@/cath";
import { ElMessage } from "element-plus";
import { adminDeleteUser, getUserList } from "@/http/back/account/account";
import type { UserItem } from "@/http/back/account/accountType";
import type { AxiosProgressEvent } from "axios";
import {
  deletePdfFile,
  getResumeList,
  insertPdfFile,
  updatePdfFile,
} from "@/http/back/resume_templete/resumeTemplete";
import type { ResumeTemplete } from "@/http/back/resume_templete/resumeTempleteType";
// 按账号搜索
const search = ref("");
// 修改信息 dialog
const isDialog = ref(false);
const tableDate = reactive({
  infoList: [] as ResumeTemplete[],
});
const filterTableData = computed(() =>
  tableDate.infoList.filter(
    (data) =>
      !search.value || data.filePath.toLowerCase().includes(search.value.toLowerCase())
  )
);
const pageInfo = reactive({
  currentPage: 1,
  pageSize: 10,
});
const total = ref(0);

const handelPageSize = (value: number) => {
  pageInfo.pageSize = value;
};
const handelCurrentPage = (value: number) => {
  pageInfo.currentPage = value;
};

// 存储修改模板 和操作类型
const updateValue = reactive({
  key: "",
  path: "", //旧filePath
  fileId: 0,
});
// 编辑信息
const handelInfo = (key: string, row: ResumeTemplete) => {
  updateValue.path = row.filePath;
  updateValue.fileId = row.fileId;
  updateValue.key = key;
  isDialog.value = !isDialog.value;
};
const handleCheck = (keyValue: FormData, progress: (cb: AxiosProgressEvent) => void) => {
  switch (updateValue.key) {
    case "update":
      keyValue.set("username", getValue(ADMIN_USER_NAME));
      keyValue.set("password", getValue(ADMIN_PASSWORD));
      keyValue.set("oldPafPath", updateValue.path);
      keyValue.set("fileId", String(updateValue.fileId));
      updatePdfFile(keyValue, progress, (res) => {
        const { message } = res.data;
        isDialog.value = !isDialog.value;
        ElMessage.success({ message, grouping: true });
        getResumeTempleteList();
      });
      break;
    case "insert":
      keyValue.set("username", getValue(ADMIN_USER_NAME));
      keyValue.set("password", getValue(ADMIN_PASSWORD));
      keyValue.set("fileId", String(updateValue.fileId));
      insertPdfFile(keyValue, progress, (res) => {
        const { message } = res.data;
        isDialog.value = !isDialog.value;
        ElMessage.success({ message, grouping: true });
        getResumeTempleteList();
      });
      break;
  }
};
//删除简历
const handleDeleteResumeTemplete = (row: ResumeTemplete) => {
  deletePdfFile(
    {
      username: getValue(ADMIN_USER_NAME),
      password: getValue(ADMIN_PASSWORD),
      oldPafPath: row.filePath,
      fileId: row.fileId,
    },
    (res) => {
      ElMessage.success({ message: res.data.message });
      getResumeTempleteList();
    }
  );
};
// 获取tableList
const getResumeTempleteList = () => {
  getResumeList(
    {
      username: getValue(ADMIN_USER_NAME),
      password: getValue(ADMIN_PASSWORD),
      limit: pageInfo.pageSize,
      offset: pageInfo.currentPage - 1,
    },
    (res) => {
      const { message, resumeTemplete } = res.data;
      total.value = res.data.total;
      tableDate.infoList.length = 0;
      tableDate.infoList.push(...resumeTemplete);
      ElMessage({ message, type: "success", grouping: true });
    }
  );
};
getResumeTempleteList();
// 简历模板列表
watch([pageInfo], () => {
  getResumeTempleteList();
});
</script>
<template>
  <el-card>
    <el-table
      border
      highlight-current-row
      stripe
      height="29rem"
      :data="filterTableData"
      style="width: 100%"
    >
      <el-table-column align="center" header="用户列表">
        <el-table-column label="模板Path" prop="filePath" align="center" />
        <el-table-column label="模板Id" prop="fileId" align="center">
          <template #default="scope">
            {{ scope.row.fileId }}
            <el-icon
              v-if="scope.row.filePath"
              @click="handelInfo('update', scope.row)"
              class="icon"
              size="large"
              ><Edit
            /></el-icon>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template #header>
            <span>操作</span>
          </template>
          <template #default="scope">
            <el-button
              v-if="scope.row.filePath !== ''"
              size="small"
              type="danger"
              @click="handleDeleteResumeTemplete(scope.row)"
              >删除</el-button
            >
            <el-button
              v-else
              size="small"
              type="success"
              @click="handelInfo('insert', scope.row)"
              >新增</el-button
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
    <el-dialog v-model="isDialog" width="30rem" center>
      <EditFile
        v-if="isDialog"
        :keyValue="updateValue.key"
        :handel-cb="handleCheck"
        :handel-dialog="
          () => {
            isDialog = !isDialog;
          }
        "
      ></EditFile>
    </el-dialog>
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
</style>

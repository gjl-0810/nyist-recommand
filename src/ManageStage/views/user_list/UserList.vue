<script setup lang="ts">
import EditPage from "./Edit.vue";
import { computed } from "@vue/reactivity";
import { reactive, ref, watch } from "@vue/runtime-dom";
import { Edit } from "@element-plus/icons-vue";
import { ADMIN_PASSWORD, ADMIN_USER_NAME, getValue } from "@/cath";
import { ElMessage } from "element-plus";
import {
  adminDeleteUser,
  adminUpdateUserEmail,
  adminUpdateUserNickName,
  adminUpdateUserPwd,
  getUserList,
} from "@/http/back/account/account";
import type { UserItem } from "@/http/back/account/accountType";
// 按账号搜索
const search = ref("");
// 修改信息 dialog
const isUpdated = ref(false);
const tableDate = reactive({
  infoList: [] as UserItem[],
});
const filterTableData = computed(() =>
  tableDate.infoList.filter(
    (data) =>
      !search.value ||
      data.userUsername.toLowerCase().includes(search.value.toLowerCase())
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

// 存储修改用户的username 和修改类型
const updateValue = reactive({
  key: "",
  username: "",
});
// 编辑信息
const handelInfo = (key: string, row: UserItem) => {
  updateValue.username = row.userUsername;
  updateValue.key = key;
  isUpdated.value = !isUpdated.value;
};
const handleCheck = (keyValue: string) => {
  switch (updateValue.key) {
    case "newPassword":
      adminUpdateUserPwd(
        {
          password: getValue(ADMIN_PASSWORD),
          username: getValue(ADMIN_USER_NAME),
          userNewPassword: keyValue,
          userUsername: updateValue.username,
        },
        (res) => {
          const { message } = res.data;
          isUpdated.value = !isUpdated.value;
          ElMessage.success({ message, grouping: true });
        }
      );
      break;
    case "newNickName":
      adminUpdateUserNickName(
        {
          password: getValue(ADMIN_PASSWORD),
          username: getValue(ADMIN_USER_NAME),
          userNickName: keyValue,
          userUsername: updateValue.username,
        },
        (res) => {
          const { message } = res.data;
          isUpdated.value = !isUpdated.value;
          ElMessage.success({ message, grouping: true });
        }
      );
      break;
    case "newEmail":
      adminUpdateUserEmail(
        {
          password: getValue(ADMIN_PASSWORD),
          username: getValue(ADMIN_USER_NAME),
          userEmail: keyValue,
          userUsername: updateValue.username,
        },
        (res) => {
          const { message } = res.data;
          isUpdated.value = !isUpdated.value;
          ElMessage.success({ message, grouping: true });
        }
      );
      break;
  }
  getUserInfoList();
};
//删除账号
const handleDeleteUser = (row: UserItem) => {
  adminDeleteUser(
    {
      username: getValue(ADMIN_USER_NAME),
      password: getValue(ADMIN_PASSWORD),
      userUsername: row.userUsername,
      userPassword: row.userPassword,
    },
    (res) => {
      ElMessage.success({ message: res.data.message });
      getUserInfoList();
    }
  );
};
// 获取tableList
const getUserInfoList = () => {
  getUserList(
    {
      username: getValue(ADMIN_USER_NAME),
      password: getValue(ADMIN_PASSWORD),
      limit: pageInfo.pageSize,
      offset: pageInfo.currentPage - 1,
    },
    (res) => {
      const { message, userList } = res.data;
      total.value = res.data.total;
      tableDate.infoList.length = 0;
      tableDate.infoList.push(...userList);
      ElMessage({ message, type: "success", grouping: true });
    }
  );
};
getUserInfoList();
// 用户列表
watch([pageInfo], () => {
  getUserInfoList();
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
        <el-table-column label="用户账号" prop="userUsername" align="center" />
        <el-table-column label="用户密码" prop="userPassword" align="center">
          <template #default="scope">
            {{ scope.row.userPassword }}
            <el-icon
              @click="handelInfo('newPassword', scope.row)"
              class="icon"
              size="large"
              ><Edit
            /></el-icon>
          </template>
        </el-table-column>
        <el-table-column label="用户昵称" prop="userNickName" align="center">
          <template #default="scope">
            {{ scope.row.userNickName }}
            <el-icon
              @click="handelInfo('newNickName', scope.row)"
              class="icon"
              size="large"
              ><Edit
            /></el-icon>
          </template>
        </el-table-column>
        <el-table-column label="用户邮箱" prop="userEmail" align="center">
          <template #default="scope">
            {{ scope.row.userEmail }}
            <el-icon @click="handelInfo('newEmail', scope.row)" class="icon" size="large"
              ><Edit
            /></el-icon>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template #header>
            <el-input v-model="search" size="small" placeholder="请输入用户账号" />
          </template>
          <template #default="scope">
            <el-button size="small" type="danger" @click="handleDeleteUser(scope.row)"
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
    <el-dialog v-model="isUpdated" width="30rem" center>
      <EditPage
        v-if="isUpdated"
        :keyValue="updateValue.key"
        :handel-cb="handleCheck"
      ></EditPage>
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

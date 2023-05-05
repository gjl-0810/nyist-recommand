<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ADMIN_USER_NICK_NAME, clearValue, getValue } from "@/cath";
import router from "@/router";
import { ElMessage } from "element-plus";
import { reactive, ref, toRefs } from "vue";
import EditPwd from "@/ManageStage/components/EditPwd.vue";
const adminNickName = getValue(ADMIN_USER_NICK_NAME);
type headerDateType = {
  iconSrc: string;
  content: string;
};
const headerDate = reactive<headerDateType>({
  iconSrc: "",
  content: "南阳理工微软工作室内推系统",
});
const { iconSrc, content } = toRefs(headerDate);
const handleCommand = (command: string | number | object) => {
  switch (command) {
    case "legout": {
      clearValue();
      router.push("/adminLogin");
      ElMessage({ type: "success", message: "已退出登录！" });
      break;
    }
    case "editPwd": {
      handelClose();
      break;
    }
  }
};
//控制修改密码框
const isDisable = ref(false);
const handelClose = () => {
  isDisable.value = !isDisable.value;
};
</script>
<template>
  <el-card>
    <header class="header">
      <img :src="iconSrc" alt="图标" />
      <span>{{ content }}</span>
      <el-dropdown @command="handleCommand" class="dropMenu">
        <el-avatar class="avater">{{ adminNickName }}</el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="editPwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="legout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </header>
  </el-card>
  <el-dialog v-model="isDisable" width="30rem" center>
    <EditPwd :handel="handelClose" />
  </el-dialog>
</template>
<style lang="scss">
.header {
  padding: 0 1rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.dropMenu {
  cursor: pointer;
  .avater {
    background-color: #409eff;
  }
}
</style>

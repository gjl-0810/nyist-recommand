<script setup lang="ts">
import { adminGetCheckCode, adminUnLoginUpdatePwd } from "@/http/back/account/account";
import {
  getCheckCode,
  getRegisteCheckCode,
  unLoginUpdatePwd,
} from "@/http/reception/util/util";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
/**props 控制对话框*/
const props = defineProps<{
  isDialog: boolean;
  handelDialogClose: () => void;
}>();
const path = useRoute();

// 获取验证码
const handelGetCheckCode = () => {
  if (fromInfo.username !== "") {
    if (path.path === "/login") {
      getCheckCode({ username: fromInfo.username }, (res) => {
        ElMessage.success({ message: res.data.message });
      });
    } else {
      adminGetCheckCode({ username: fromInfo.username }, (res) => {
        ElMessage.success({ message: res.data.message });
      });
    }
  } else {
    ElMessage.error({ message: "请先填写账号" });
  }
};
/**表单数据 */
const fromInfo = reactive({
  username: "",
  checkCode: "" as string,
  newPassword: "",
});
const rules = reactive<FormRules>({
  username: [{ required: true, type: "any", message: "请填写账号" }],
  checkCode: [{ required: true, type: "any", message: "请输入验证码" }],
  newPassword: [{ required: true, type: "any", message: "请输入新密码" }],
});
// 修改密码
const upPassword = ref<FormInstance>();
const onUpdatePwd = (Form: FormInstance | undefined) => {
  if (!Form) return;
  if (Form) {
    Form.validate((valide) => {
      if (valide) {
        if (path.path === "/login") {
          unLoginUpdatePwd(
            {
              username: fromInfo.username,
              checkCode: fromInfo.checkCode,
              newPassword: fromInfo.newPassword,
            },
            (res) => {
              ElMessage.success({ message: res.data.message });
              // 关闭对话框
              props.handelDialogClose();
            }
          );
        } else {
          adminUnLoginUpdatePwd(
            {
              username: fromInfo.username,
              checkCode: fromInfo.checkCode,
              newPassword: fromInfo.newPassword,
            },
            (res) => {
              ElMessage.success({ message: res.data.message });
              props.handelDialogClose();
            }
          );
        }
      }
    });
  }
};
</script>
<template>
  <el-dialog v-model="props.isDialog" header="修改密码" width="30rem">
    <el-form
      ref="upPassword"
      label-position="left"
      :model="fromInfo"
      :rules="rules"
      scroll-to-error
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model.number="fromInfo.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="验证码" prop="checkCode">
        <el-input
          style="width: 72%"
          v-model="fromInfo.checkCode"
          placeholder="请输入验证码"
        />
        <el-button @click="handelGetCheckCode">获取验证码</el-button>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model.number="fromInfo.newPassword" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item>
        <el-button
          class="Update-password-button"
          type="primary"
          @click="onUpdatePwd(upPassword)"
          >修改密码</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style scoped lang="scss">
.Update-password-button {
  margin: 0 auto;
  width: 10rem;
}
</style>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ADMIN_USER_NAME, getValue } from "@/cath";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { adminUpdatePwd } from "@/http/back/account/account";
import router from "@/router";
const upPassword = ref<FormInstance>();
const updateInfo = reactive({
  password: "",
  newPassword: "",
  newPasswordCompelete: "",
});
const handeluPdatePassword = (Form: FormInstance | undefined) => {
  if (!Form) return;
  if (Form) {
    Form.validate((valide) => {
      if (valide) {
        if (updateInfo.newPassword !== updateInfo.newPasswordCompelete) {
          ElMessage.error({ message: "两次密码不相同" });
          return;
        } else  {
            adminUpdatePwd(
            {
              password: updateInfo.password,
              username: getValue(ADMIN_USER_NAME),
              newPassword: updateInfo.newPassword,
            },
            (res) => {
              props.handel();
              localStorage.clear();
              router.replace("/adminLogin");
              ElMessage.success({ message: res.data.message });
            }
          );
        }
      }
    });
  }
};
const rules = reactive<FormRules>({
  password: [{ required: true, type: "string", message: "请填写原密码" }],
  newPassword: [{ required: true, type: "string", message: "请输入新密码" }],
  newPasswordCompelete: [{ required: true, type: "string", message: "请再次输入新密码" }],
});

const props = defineProps<{
    // 关闭弹窗
  handel: () => void;
}>();
</script>
<template>
  <div>
    <el-form
      ref="upPassword"
      label-position="left"
      :model="updateInfo"
      :rules="rules"
      scroll-to-error
    >
      <el-form-item label="原密码" prop="password">
        <el-input
          type="password"
          show-password
          clearable
          v-model="updateInfo.password"
          placeholder="请输入原密码"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          type="password"
          show-password
          clearable
          v-model="updateInfo.newPassword"
          placeholder="请输入新密码"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPasswordCompelete">
        <el-input
          v-model="updateInfo.newPasswordCompelete"
          show-password
          type="password"
          clearable
          placeholder="请再次输入新密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button class="Button" type="primary" @click="handeluPdatePassword(upPassword)"
          >修改密码</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped lang="scss"></style>

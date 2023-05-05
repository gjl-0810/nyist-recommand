<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
const props = defineProps<{
  //回调函数 将网络请求放在外部
  handelCb: <T extends string>(key: T) => void;
  //哪个输入框
  keyValue: string;
}>();

const upPassword = ref<FormInstance>();
const nameToInstanceMap: {
  [index: string]: { label: string; prop: string; placeholder: string; value: string };
} = {
  newNickName: {
    label: "新昵称",
    prop: "newNickName",
    placeholder: "请输入新昵称",
    value: "修改昵称",
  },
  newPassword: {
    label: "新密码",
    prop: "newPassword",
    placeholder: "请输入新密码",
    value: "修改密码",
  },
  newEmail: {
    label: "新邮箱",
    prop: "newEmail",
    placeholder: "请输入新邮箱",
    value: "修改邮箱",
  },
};
const updateInfo = reactive<{
  [index: string]: string;
}>({
  newNickName: "",
  newPassword: "",
  newEmail: "",
});

const handeluPdatePassword = (Form: FormInstance | undefined) => {
  if (!Form) return;
  if (Form) {
    Form.validate((valide) => {
      if (valide) {
        switch (props.keyValue) {
          case "newNickName": {
            props.handelCb(updateInfo.newNickName);
            break;
          }
          case "newPassword": {
            props.handelCb(updateInfo.newPassword);
            break;
          }
          case "newEmail": {
            props.handelCb(updateInfo.newEmail);
            break;
          }
        }
      }
    });
  }
};
const rules = reactive<FormRules>({
  newPassword: [
    { required: true, type: "string", message: "请填写新合法密码" },
    { max: 20, min: 8, message: "密码长度至少8位" },
  ],
  newNickName: [
    { required: true, type: "string", message: "请输入新合法昵称" },
    { max: 5, min: 1, message: "昵称长度在1~5之间" },
  ],
  newEmail: [
    { required: true, type: "string", message: "请输入新合法邮箱" },
    { max: 20, min: 8, message: "邮箱长度至少8位" },
  ],
});
</script>
<template>
  <el-form
    ref="upPassword"
    label-position="left"
    :model="updateInfo"
    :rules="rules"
    scroll-to-error
  >
    <el-form-item
      :label="nameToInstanceMap[props.keyValue].label"
      :prop="nameToInstanceMap[props.keyValue].prop"
    >
      <el-input
        v-model="updateInfo[props.keyValue]"
        :placeholder="nameToInstanceMap[props.keyValue].placeholder"
      />
    </el-form-item>
    <el-form-item>
      <div class="btn">
        <el-button
          class="Button"
          type="primary"
          @click="handeluPdatePassword(upPassword)"
          >{{ nameToInstanceMap[props.keyValue].value }}</el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>
<style scoped lang="scss">
.btn {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>

<script setup lang="ts">
import { registe } from "@/http/reception/account";
import type { RegisteType } from "@/http/reception/receptionType";
import { getRegisteCheckCode } from "@/http/reception/util/util";
import router from "@/router";
import { STATUS_MAP } from "@/utils/instance";
import { createWebSocket, sendSock } from "@/websocket";
import { ElMessage, type FormInstance } from "element-plus";
import { reactive, ref } from "vue";
createWebSocket(null,()=>{});
const formInline = reactive<RegisteType>({
  username: "",
  password: "",
  newPassword:'',
  checkCode:'',
  email: "",
  isRecommond: 0,
  nickName:'',
});

const formRef = ref<FormInstance>();
const onSubmit = (formRef:  FormInstance | undefined) => {
  if(!formRef) return;
  formRef.validate((valid) => {
    if(valid){
      if(formInline.password!==formInline.newPassword){
        ElMessage.error({message:"两次密码不同，请核查！"})
      }
      else{
        registe(formInline,
          res=>{
            ElMessage.success(res.data.message)
            router.push('/login');
            sendSock('as')
      })
      }
    }else
    return false;
  })
}
// 获取验证码
const handelGetCheckCode = ()=>{
  getRegisteCheckCode({ email: formInline.email }, (res) => {
      ElMessage.success({ message: res.data.message });
    });
}
</script>
<template>
  <el-form :model="formInline" class="form" ref="formRef">
    <el-form-item
      label="账号"
      prop="username"
      required
      :rules="[{ required: true, type: 'any', message: '请输入学号' }]"
    >
      <el-input v-model="formInline.username" type="string" placeholder="请输入学号" />
    </el-form-item>
    <el-form-item
      label="密码"
      prop="password"
      required
      :rules="[{ required: true, type: 'any', message: '请输入密码' }]"
    >
      <el-input
        type="password"
        clearable
        v-model="formInline.password"
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item
      label="新密码"
      prop="newPassword"
      clearable
      required
      :rules="[{ required: true, type: 'any', message: '请输入合法密码' }]"
    >
      <el-input
        type="password"
        clearable
        v-model="formInline.newPassword"
        placeholder="请输入新密码"
      />
    </el-form-item>
    <el-form-item
      label="邮箱"
      prop="email"
      required
      :rules="[{ required: true, type: 'email', message: '请填写邮箱' }]"
    >
      <el-input
        v-model="formInline.email"
        type="email"
        placeholder="目前支持qq、163邮箱"
      />
    </el-form-item>
    <el-form-item
      label="验证码"
      prop="checkCode"
      clearable
      required
      :rules="[{ required: true, type: 'any', message: '请输入合法验证码' }]"
    >
      <el-input
        style="width: 71%"
        v-model="formInline.checkCode"
        placeholder="请输入验证码"
      />
      <el-button @click="handelGetCheckCode">验证码</el-button>
    </el-form-item>

    <el-form-item
      label="昵称"
      prop="nickName"
      required
      :rules="[{ required: true, type: 'string', message: '请填写昵称' }]"
    >
      <el-input v-model="formInline.nickName" type="email" placeholder="请填写昵称" />
    </el-form-item>

    <el-form-item>
      <div class="status">
        <el-radio-group v-model="formInline.isRecommond" v-for="radomItem in STATUS_MAP">
          <el-radio :label="radomItem.label" size="large">{{ radomItem.value }}</el-radio>
        </el-radio-group>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button class="registerButton" type="primary" @click="onSubmit(formRef)"
        >注册</el-button
      >
    </el-form-item>
    <div class="handel-exchange">
      <el-link type="success" @click="router.push('/login')">已有账号，去登录</el-link>
    </div>
  </el-form>
</template>

<style lang="scss">
.form {
  width: 20rem;
}

.registerButton {
  margin: 0 auto;
  width: 15rem;
}
.status {
  width: 20rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.handel-exchange {
  width: 100%;
  display: flex;
  justify-content: end;
}
</style>

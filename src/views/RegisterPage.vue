<script setup lang="ts">
import { registe } from "@/http/reception/account";
import type { RegisteType } from "@/http/reception/receptionType";
import router from "@/router";
import { STATUS_MAP } from "@/utils/instance";
import { ElMessage, type FormInstance } from "element-plus";
import { reactive, ref } from "vue";

const formInline = reactive<RegisteType>({
  username: "",
  password: "",
  email: "",
  isRecommond: 0,
  nickName:'',
  userContactInfo:''
});

const formRef = ref<FormInstance>();
const onSubmit = (formRef:  FormInstance | undefined) => {
  if(!formRef) return;
  formRef.validate((valid) => {
    if(valid){
      registe(formInline,
          res=>{
            ElMessage.success(res.data.message)
            router.push('/login')
      })
    }else
    return false;
  })
}
</script>
<template>
  <el-form :model="formInline" class="form" ref="formRef">
    <el-form-item
      label="账号"
      prop="username"
      required
      :rules="[{ required: true, type: 'string', message: '请输入学号' }]"
    >
      <el-input v-model="formInline.username" type="string" placeholder="请输入学号" />
    </el-form-item>
    <el-form-item
      label="密码"
      prop="password"
      type="password"
      clearable
      required
      :rules="[{ required: true, type: 'string', message: '请输入密码' }]"
    >
      <el-input v-model="formInline.password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item
      label="邮箱"
      prop="email"
      required
      :rules="[{ required: true, type: 'string', message: '请填写邮箱' }]"
    >
      <el-input
        v-model="formInline.email"
        type="email"
        placeholder="目前支持qq、163邮箱"
      />
    </el-form-item>
    <el-form-item
      label="昵称"
      prop="nickName"
      required
      :rules="[{ required: true, type: 'string', message: '请填写昵称' }]"
    >
      <el-input v-model="formInline.nickName" type="email" placeholder="请填写昵称" />
    </el-form-item>
    <el-form-item
      label="联系方式"
      prop="userContactInfo"
      required
      :rules="[{ required: true, type: 'string', message: '请填写联系方式' }]"
    >
      <el-input
        v-model="formInline.userContactInfo"
        type="email"
        placeholder="请填写联系方式"
      />
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
  </el-form>
</template>

<style lang="scss">
.form {
  width: 20rem;
}

.registerButton {
  margin: 0 auto;
  width: 10rem;
}
.status {
  width: 20rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>

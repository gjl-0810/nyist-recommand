<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox, type FormInstance, type TabsPaneContext } from "element-plus";
import {updateEmail, updateNickName, updatePassword} from '@/http/reception/account'
import { USERNAME, clearValue, getValue } from "@/cath";
import { Setting, Edit, Connection } from "@element-plus/icons-vue";
import router from "@/router";
import {useAccountInfoStore} from '@/stores/accountInfo'
const accountInfoStore =useAccountInfoStore()
const activeName = ref("updatePassword");
const upNickName = ref<FormInstance>();
const upPassword = ref<FormInstance>();
const upEmail = ref<FormInstance>();
const tabChange = (name:string)=>{
  activeName.value = name
}
const updateInfo = reactive({
  password: "",
  newPassword: "",
  newPasswordCompelete: "",
  nickName: "",
  email:'',
});
const {newPassword,newPasswordCompelete} = updateInfo
const handeluPdatePassword = (upPassword: FormInstance | undefined) => {
  if (!upPassword) return;
  upPassword.validate(()=>{
    if(newPassword!==newPasswordCompelete){
      ElMessageBox({message:'两次密码不相同'})
    }
    else
    updatePassword({password:updateInfo.password,username:getValue(USERNAME),
    newPassword:updateInfo.newPassword},res=>{
      clearValue();
      router.replace('/login')
      ElMessage.success({message:res.data.message})
      // 清除缓存，重新登录
    })
  })
};
const handelUpdateNickName = (upNickName: FormInstance | undefined) => {
  if (!upNickName) return;
  upNickName.validate(()=>{
    // 进行网络请求
    updateNickName({password:updateInfo.password,username:getValue(USERNAME),
    nickName:updateInfo.nickName},res=>{
      const {nickName,message} = res.data;
      ElMessage.success({message})
      accountInfoStore.handelNickName(nickName);
    })
  })
};
const handelUpdateEmail = (upEmail: FormInstance | undefined) => {
  if (!upEmail) return;
  upEmail.validate(()=>{
    // 进行网络请求
    updateEmail({password:updateInfo.password,username:getValue(USERNAME),
    email:updateInfo.email},res=>{
      const {email,message} = res.data;
      ElMessage.success({message})
      accountInfoStore.handelEmail(email);
    })
  })
};
</script>
<template>
  <el-tabs v-model="activeName" @tab-change="tabChange">
    <el-tab-pane label="修改密码" name="updatePassword" class="tab">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Setting /></el-icon>
          <span>修改密码</span>
        </span>
      </template>
      <el-form
        ref="upPassword"
        label-position="left"
        :model="updateInfo"
        class="update-form"
        scroll-to-error
      >
        <el-form-item
          label="原密码"
          prop="password"
          required
          :rules="[{ required: true, type: 'string', message: '请填写原密码' }]"
        >
          <el-input v-model="updateInfo.password" placeholder="请输入原密码" />
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPassword"
          required
          :rules="[{ required: true, type: 'string', message: '请输入新密码' }]"
        >
          <el-input v-model="updateInfo.newPassword" placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPasswordCompelete"
          required
          :rules="[{ required: true, type: 'string', message: '请再次输入新密码' }]"
        >
          <el-input
            v-model="updateInfo.newPasswordCompelete"
            placeholder="请再次输入新密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="Button"
            type="primary"
            @click="handeluPdatePassword(upPassword)"
            >修改密码</el-button
          >
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="修改昵称" name="updateNickName" class="tab">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Edit /></el-icon>
          <span>修改昵称</span>
        </span>
      </template>
      <el-form
        ref="upNickName"
        label-position="left"
        :model="updateInfo"
        class="update-form"
        scroll-to-error
      >
        <el-form-item
          label="密码&nbsp&nbsp&nbsp&nbsp"
          prop="password"
          required
          :rules="[{ required: true, type: 'string', message: '请填写密码' }]"
        >
          <el-input v-model="updateInfo.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item
          label="新昵称"
          prop="nickName"
          required
          :rules="[{ required: true, type: 'string', message: '请填写新昵称' }]"
        >
          <el-input v-model="updateInfo.nickName" placeholder="请填写新昵称" />
        </el-form-item>
        <el-form-item>
          <el-button
            class="Button"
            type="primary"
            @click="handelUpdateNickName(upNickName)"
            >修改昵称</el-button
          >
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="修改邮箱" name="updateEmail" class="tab">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Connection /></el-icon>
          <span>修改邮箱</span>
        </span>
      </template>
      <el-form
        ref="upEmail"
        label-position="left"
        :model="updateInfo"
        class="update-form"
        scroll-to-error
      >
        <el-form-item
          label="密码&nbsp&nbsp&nbsp&nbsp"
          prop="password"
          required
          trigger="blur"
          :rules="[{ required: true, type: 'string', message: '请填写密码' }]"
        >
          <el-input v-model="updateInfo.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item
          label="新邮箱"
          prop="email"
          required
          :rules="{ required: true, message: '请填写新邮箱', type: 'string' }"
        >
          <el-input v-model="updateInfo.email" placeholder="请填写新邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button class="Button" type="primary" @click="handelUpdateEmail(upEmail)"
            >修改邮箱</el-button
          >
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
.tab {
  display: flex;
  justify-content: center;
  align-items: center;
}
.update-form {
  width: 20rem;
  padding: 2rem;
  box-shadow: var(--el-box-shadow-light);
  .Button {
    margin: 0 auto;
  }
}
.custom-tabs-label .el-icon {
  vertical-align: middle;
}
.custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>

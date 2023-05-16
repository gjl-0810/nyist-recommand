<script setup lang="ts">
import { Iphone, Location, OfficeBuilding, Tickets, User } from "@element-plus/icons-vue";
import { computed, ref, reactive, onMounted } from "vue";
import { getAccountInfo } from "@/http/reception/account";
import { useAccountInfoStore } from "@/stores/accountInfo";
import { USERNAME, getValue } from "@/cath";
const accountInfoStore = useAccountInfoStore();
const accountInfo = reactive({
  username: "",
  contact: "",
  isRecommond: (null as unknown) as boolean,
});
const size = ref("");
const iconStyle = computed(() => {
  const marginMap: { [index: string]: string } = {
    large: "8px",
    default: "6px",
    small: "4px",
  };
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  };
});
// 获取信息
onMounted(() => {
  getAccountInfo(getValue(USERNAME), (res) => {
    const { username, nickName, isRecommond, email, contact } = res.data;
    accountInfo.contact = contact;
    accountInfo.username = username;
    accountInfo.isRecommond = isRecommond;
    accountInfoStore.handelEmail(email);
    accountInfoStore.handelNickName(nickName);
  });
});
</script>
<template>
  <el-descriptions class="margin-top" title="账号信息" :size="size" border>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          用户名
        </div>
      </template>
      {{ accountInfo.username }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <tickets />
          </el-icon>
          昵称
        </div>
      </template>
      {{ accountInfoStore.nickName }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          身份
        </div>
      </template>
      {{ accountInfo.isRecommond ? "内推者" : "求职者" }}
    </el-descriptions-item>
  </el-descriptions>
</template>
<style scoped lang="scss"></style>

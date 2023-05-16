<script lang="ts" setup>
import { computed, reactive, ref, toRaw, watch } from "vue";
import { TAG_MAP } from "@/reception/seeker/components/personal-main/personal-deliver/instance";
import {  ADMIN_PASSWORD, ADMIN_USER_NAME, USERNAME, getValue } from "@/cath";
import { ElMessage, type CascaderValue } from "element-plus";
import type { ResSeekerCompanyInfo } from "@/http/reception/recepRecommondType";
import createPosition from './Create-position.vue'
import { adminDeletePosition, adminGetPosition, adminGetPositionList, adminGetRecommondPositonList, adminGetRecommondUserList } from "@/http/back/recommond/recommond";
import type { SeekerCompanyInfo } from "@/http/back/recommond/recommondType";
const searchUsername = ref('');
const searchRecommondPosition = ref('');
const cascaderList = reactive({
  userList: [] as { label: string; value: string }[],
  resumePositionList: [] as { label: string; value: string }[],
});
const handelUsername = (value:CascaderValue)=>{
   searchUsername.value = value ? toRaw(value).toString() :'';
}
const handelRecommondPosition = (value: CascaderValue) => {
  searchRecommondPosition.value = value ? toRaw(value).toString() :'';
};
/**编辑
 */
 const feditForm = reactive({
  companyName: "", //公司名称
  position:'', //公司位置
  jobDescription:  "", //岗位描述
  count:  1, //招聘人数
  endDate:  "", //招聘截止日期
  email: "", //公司地址邮件
  isList:1, //是否上市
  fromSalary:  1, //薪资起点
  toSalary:  1, //薪资终点
  recommondPosition:  "", //推荐岗位
  positionRecommonder: "", //推荐者职位
  username:'',           //推荐者账号
});
const search = ref("");
const tableDate = reactive({
  infoList:[]  as ResSeekerCompanyInfo[]
});
const filterTableData =computed(() =>
 tableDate.infoList.filter(
    (data) =>
      !search.value || data.companyName.toLowerCase().includes(search.value.toLowerCase())
  )
// toRaw(tableDate.infoList)
);
const total = ref(0);
const pageInfo = reactive({
  currentPage: 1,
  pageSize: 10,
});
const handelPageSize = (value: number) => {
  pageInfo.pageSize = value;
};
const handelCurrentPage = (value: number) => {
  pageInfo.currentPage = value;
};
watch([searchRecommondPosition,searchUsername,pageInfo], () => {
  adminGetTable()
});
// 获取职位详细列表
const adminGetTable = ()=> adminGetPositionList(
  {
    username: getValue(ADMIN_USER_NAME),
    password:getValue(ADMIN_PASSWORD),
    pagesize: pageInfo.pageSize,
    currentPage: pageInfo.currentPage-1,
    recommondPosition:searchRecommondPosition.value,
    recommondUsername:searchUsername.value,
  },
  (res) => {
    const { message, companyInfo } = res.data;
    ElMessage({ type: "success", grouping: true, message });
    total.value = res.data.total;
    tableDate.infoList.length =0;
    tableDate.infoList.push(...companyInfo);
  }
);
// 获取职位列表
const adminRecommondPositonList = ()=>adminGetRecommondPositonList({
  username:getValue(ADMIN_USER_NAME),
  password:getValue(ADMIN_PASSWORD),
  companyName:''
},res=>{
  res.data.resumePositionList.forEach((index) => {
        cascaderList.resumePositionList.push({
          label: index.recommondPosition,
          value: index.recommondPosition,
        });
      });
})
// 获取职位创建者列表
const adminUserList = ()=>adminGetRecommondUserList({
  username:getValue(ADMIN_USER_NAME),
  password:getValue(ADMIN_PASSWORD),
},res=>{
  res.data.userList.forEach((index) => {
        cascaderList.userList.push({
          label: index.username,
          value: index.username,
        });
      });
})
Promise.all([adminRecommondPositonList(),adminGetTable(),adminUserList()]);
/**编辑 */
const handleEdit = ( row: SeekerCompanyInfo)=>{
  /**获取职位信息 */
  feditForm.username = row.username;
  adminGetPosition({
    username: row.username,
    companyName:row.companyName,
    recommondPosition:row.recommondPosition,
  },rse=>{
    const {message, companyName, //公司名称
    position, //公司位置
    jobDescription, //岗位描述
    recommondPosition,//推荐岗位
    count, //招聘人数
    endDate, //招聘截止日期
    email, //公司地址邮件
    isList, //是否上市
    salary, //薪资end
    positionRecommonder, //推荐者职位
    } = rse.data;
    const [from,to] = salary.split('-');
    ElMessage({message,grouping:true});
    feditForm.companyName=companyName;
    feditForm.position=position;
    feditForm.jobDescription=jobDescription;
    feditForm.recommondPosition=recommondPosition;
    feditForm.count=Number(count);
    feditForm.endDate=endDate;
    feditForm.email=email;
    feditForm.isList=isList;
    feditForm.fromSalary=Number(from), //薪资起点
    feditForm.toSalary=Number(to);
    feditForm.positionRecommonder=positionRecommonder;
    setTimeout(() => {
    handelDialog()
    }, 100);
  })
}
/**删除 */
const handleDelete = ( row: SeekerCompanyInfo) => {
  adminDeletePosition(
    {
      username: row.username,
      recommondPosition: row.recommondPosition,
      companyName: row.companyName,
    },
    (res) => {
      const { message } = res.data;
      ElMessage({ type: "success", grouping: true, message });
      // 重新请求
      adminGetTable();
    }
  );
};

/**create/edit dialog */
 const dialogInfo = reactive({
  dialog: false,
});
const handelDialog = () => {
  dialogInfo.dialog = !dialogInfo.dialog;
};
</script>
<template>
  <el-table
    border
    highlight-current-row
    stripe
    height="29rem"
    :data="filterTableData"
    style="width: 100%"
  >
    <el-table-column label="已创建公司">
      <template #header>
        <span>
          内推者账号：
          <el-cascader
            v-model="searchUsername"
            clearable
            placeholder="请输入/选择内推者账号"
            :options="cascaderList.userList"
            @change="(value:CascaderValue)=>handelUsername(value)"
            filterable
          />
        </span>
        <span>
          职位：
          <el-cascader
            clearable
            v-model="searchRecommondPosition"
            placeholder="请输入/选择职位位置"
            :options="cascaderList.resumePositionList"
            @change="(value:CascaderValue)=>handelRecommondPosition(value)"
            filterable
          />
        </span>
      </template>
      <el-table-column label="创建日期" prop="startDate" align="center" />
      <el-table-column label="公司名称" prop="companyName" align="center" />
      <el-table-column label="内推职位" prop="recommondPosition" align="center" />
      <el-table-column label="招聘状态" prop="recruitmentStatus" align="center">
        <template #default="{ row }">
          <el-tag :type="TAG_MAP[row.recruitmentStatus as string]">{{
            row.recruitmentStatus
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template #header>
          <el-input v-model="search" size="small" placeholder="请输入公司名称" />
        </template>
        <template #default="scope">
          <el-button size="small" type="warning" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            confirm-button-text="是"
            cancel-button-text="否"
            icon-color="#626AEF"
            title="确认删除?"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table-column>

    <template #empty>
      <div>没有投递记录哦，快去投递吧</div>
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
  <createPosition
    v-if="dialogInfo.dialog"
    :companyName="feditForm.companyName"
    :position="feditForm.position"
    :jobDescription="feditForm.jobDescription"
    :recommondPosition="feditForm.recommondPosition"
    :count="feditForm.count"
    :endDate="feditForm.endDate"
    :email="feditForm.email"
    :isList="feditForm.isList"
    :fromSalary="feditForm.fromSalary"
    :toSalary="feditForm.toSalary"
    :positionRecommonder="feditForm.positionRecommonder"
    :username="feditForm.username"
    :handelclose="handelDialog"
    :dialog="dialogInfo.dialog"
  />
</template>

<style lang="scss" scoped>
.page {
  margin: 2rem auto;
}
</style>

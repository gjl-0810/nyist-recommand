<script lang="ts" setup>
import { computed, reactive, ref, toRaw, toRef, watch } from "vue";
import { TAG_MAP } from "@/reception/seeker/components/personal-main/personal-deliver/instance";
import { TOKEN, USERNAME, getValue, setValue } from "@/cath";
import {  getPosition, getPositionList } from "@/http/reception/recepRecommond";
import { ElMessage, type CascaderValue } from "element-plus";
import type { ResSeekerCompanyInfo } from "@/http/reception/recepRecommondType";
import { deletePosition } from "@/http/reception/recepRecommond";
import createPosition from './Create-position.vue'
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
});
interface User {
  startDate: string; //开始时间
  companyName: string; //公司名称
  recruitmentStatus: string; //招聘状态
  recommondPosition: string; //推荐职位
}
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
const pageInfo = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});
const handelPageSize = (value: number) => {
  pageInfo.pageSize = value;
};
const handelCurrentPage = (value: number) => {
  pageInfo.currentPage = value;
};
watch([pageInfo], () => {
  getPositionList(
    {
      currentPage: pageInfo.currentPage-1,
      username: getValue(USERNAME),
      pagesize: pageInfo.pageSize,
    },
    (res) => {
      const { message, token, total, companyInfo } = res.data;
      ElMessage({ type: "success", grouping: true, message });
      token && setValue(TOKEN, token);
      tableDate.infoList.length=0;
      (pageInfo.total = total), (tableDate.infoList.push(...companyInfo));
    }
  );
});
getPositionList(
  {
    currentPage: pageInfo.currentPage-1,
    username: getValue(USERNAME),
    pagesize: pageInfo.pageSize,
  },
  (res) => {
    const { message, token, total, companyInfo } = res.data;
    ElMessage({ type: "success", grouping: true, message });
    token && setValue(TOKEN, token);
    (pageInfo.total = total), (tableDate.infoList.push(...companyInfo));

  }
);
/**编辑 */
const handleEdit = (index: number, row: User)=>{
  /**获取职位信息 */
  getPosition({
    username: getValue(USERNAME),
    companyName:row.companyName,
    recommondPosition:row.recommondPosition,
  },rse=>{
    const {message,token, companyName, //公司名称
    position, //公司位置
    jobDescription, //岗位描述
    recommondPosition,//推荐岗位
    count, //招聘人数
    endDate, //招聘截止日期
    email, //公司地址邮件
    isList, //是否上市
    fromSalary, //薪资from
    toSalary, //薪资end
    positionRecommonder, //推荐者职位
    } = rse.data;
    ElMessage({message,grouping:true});
    token&&setValue(TOKEN,token);
    feditForm.companyName=companyName;
    feditForm.position=position;
    feditForm.jobDescription=jobDescription;
    feditForm.recommondPosition=recommondPosition;
    feditForm.count=Number(count);
    feditForm.endDate=endDate;
    feditForm.email=email;
    feditForm.isList=isList;
    feditForm.fromSalary=2, //薪资起点
    feditForm.toSalary=3;
    feditForm.positionRecommonder=positionRecommonder;
    setTimeout(() => {
    handelDialog()
    }, 100);
  })
}
/**删除 */
const handleDelete = (index: number, row: User) => {
  deletePosition(
    {
      username: getValue(USERNAME),
      recommondPosition: row.recommondPosition,
      companyName: row.companyName,
    },
    (res) => {
      const { message, token } = res.data;
      ElMessage({ type: "success", grouping: true, message });
      token && setValue(TOKEN, token);
      // 重新请求
      getPositionList(
        {
          currentPage: pageInfo.currentPage,
          username: getValue(USERNAME),
          pagesize: pageInfo.pageSize,
        },
        (res) => {
          const { message, token, total, companyInfo } = res.data;
          ElMessage({ type: "success", grouping: true, message });
          token && setValue(TOKEN, token);
          tableDate.infoList.length=0;
          (pageInfo.total = total), (tableDate.infoList.push(...companyInfo));
        }
      );
    }
  );
};

/**create dialog */
/**
 * dialog
 */
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
    <el-table-column label="已创建公司" align="center">
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
          <el-button
            size="small"
            type="warning"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
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
    :total="pageInfo.total"
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
    :handelclose="handelDialog"
    :dialog="dialogInfo.dialog"
  />
</template>

<style lang="scss" scoped>
.page {
  margin: 2rem auto;
}
</style>

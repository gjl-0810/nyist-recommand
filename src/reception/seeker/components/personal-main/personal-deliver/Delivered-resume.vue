<template>
  <el-table
    border
    highlight-current-row
    stripe
    height="29rem"
    :data="filterTableData"
    style="width: 100%"
  >
    <el-table-column label="投递日期" prop="date" align="center" />
    <el-table-column label="公司名称" prop="name" align="center" />
    <el-table-column label="投递状态" prop="status" align="center">
      <template #default="{ row }">
        <el-tag :type="TAG_MAP[row.status as string]">{{ row.status }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="请输入公司名称" />
      </template>
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
    <template #empty>
      <div>没有投递记录哦，快去投递吧</div>
    </template>
  </el-table>
  <el-pagination
    class="page"
    background
    layout="prev, pager, next,sizes"
    :current-page="pageInfo.current"
    @size-change="handelPageSize"
    @current-change="handelCurrentPage"
    :page-sizes="[10, 20, 30, 40, 50]"
    :total="pageInfo.total"
  />
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { TAG_MAP } from "./instance";

interface User {
  date: string;
  name: string;
  status: string;
}

const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};
const tableData: User[] = reactive([
  {
    date: "2016-05-03",
    name: "Tom",
    status: "已投递",
  },
  {
    date: "2016-05-02",
    name: "John",
    status: "已投递",
  },
  {
    date: "2016-05-04",
    name: "Morgan",
    status: "已投递",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    status: "已投递",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    status: "已投递",
  },
  {
    date: "2016-05-02",
    name: "John",
    status: "已投递",
  },
  {
    date: "2016-05-04",
    name: "Morgan",
    status: "已投递",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    status: "已投递",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    status: "已投递",
  },
  {
    date: "2016-05-02",
    name: "John",
    status: "已投递",
  },
]);
const pageInfo = reactive({
  current: 1,
  total: 1000,
  pageSize: 10,
});
const handelPageSize = (value: number) => {
  pageInfo.pageSize = value;
};
const handelCurrentPage = (value: number) => {
  pageInfo.current = value;
};
</script>
<style lang="scss" scoped>
.page {
  margin: 2rem auto;
}
</style>

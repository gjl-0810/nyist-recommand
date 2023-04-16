<script lang="ts" setup>
import { regionData } from "@/reception/seeker/components/home-main/instance";
import type { CascaderValue } from "element-plus/es/components/cascader-panel";
import type { FormInstance } from "element-plus/es/components/form";
import { reactive, ref } from "vue";
import { computed, toRaw } from "@vue/reactivity";
import dayjs from "dayjs";
import { createPosition, editPosition } from "@/http/reception/recepRecommond";
import { ElMessage } from "element-plus";
import { TOKEN, USERNAME, getValue, setValue } from "@/cath";
import { fromPairs } from "lodash";
const positionRef = ref<FormInstance>();
/**编辑 */
const formProps = defineProps<{
  handelclose: () => void;
  dialog: boolean;
  companyName?: string; //公司名称
  position?: string; //公司位置
  jobDescription?: string; //岗位描述
  count?: number; //招聘人数
  endDate?: string; //招聘截止日期
  email?: string; //公司地址邮件
  isList?: number; //是否上市
  fromSalary?: number; //薪资起点
  toSalary?: number; //薪资终点
  recommondPosition?: string; //推荐岗位
  positionRecommonder?: string; //推荐者职位
}>();
const form = reactive({
  companyName: formProps.companyName || "", //公司名称
  position: formProps.position || "", //公司位置
  jobDescription: formProps.jobDescription || "", //岗位描述
  count: formProps.count || 1, //招聘人数
  endDate: formProps.endDate || "", //招聘截止日期
  email: formProps.email || "", //公司地址邮件
  isList: formProps.isList || 1, //是否上市
  fromSalary: formProps.fromSalary || 1, //薪资起点
  toSalary: formProps.toSalary || 1, //薪资终点
  recommondPosition: formProps.recommondPosition || "", //推荐岗位
  positionRecommonder: formProps.positionRecommonder || "", //推荐者职位
});
const handelNumber = (value: number) => {
  form.count = value;
};

// 地址选择
const select = (arg: CascaderValue) => {
  console.log(toRaw(arg).toString());
  form.position = String(toRaw(arg));
};
// 薪资改变 from
const handelFromSalary = (currentValue: number | undefined, oldValue: number) => {
  if (currentValue) {
    switch (Boolean(currentValue)) {
      case currentValue > form.toSalary && currentValue < 1000:
        form.toSalary = currentValue;
      case currentValue <= 0:
        form.fromSalary = oldValue;
      default:
        form.fromSalary = currentValue;
    }
  } else {
    form.fromSalary = oldValue;
  }
};
// 薪资改变 to
const handelToSalary = (currentValue: number | undefined, oldValue: number) => {
  if (currentValue) {
    switch (Boolean(currentValue)) {
      case currentValue < form.fromSalary && currentValue < 1000:
        form.fromSalary = currentValue;
      case currentValue <= 0:
        form.toSalary = oldValue;
      default:
        form.toSalary = currentValue;
    }
  } else {
    form.toSalary = oldValue;
  }
};

const arrangeSalary = computed(() => `${form.fromSalary} k~ ${form.toSalary}k`);
/**
 * 日期
 */
const handelDate = (value: Date) => {
  form.endDate = dayjs(value).format("YYYY-MM-DD");
};
const nowDate = new Date();
const now = dayjs(new Date()).format("YYYY-MM-DD");
const disableDate = (date: Date) => {
  return date.getTime() <= nowDate.getTime();
};
/**
 * 提交 创建表单
 */
const handleSubmit = (formValidate: FormInstance | undefined) => {
  if (!formValidate) return;
  formValidate.validate(() => {
    createPosition(
      {
        companyName: form.companyName,
        position: form.position,
        positionRecommonder: form.positionRecommonder,
        recommondPosition: form.recommondPosition,
        recruitmentStatus: "招聘中",
        count: form.count,
        endDate: form.endDate,
        email: form.email,
        isList: form.isList,
        salary: arrangeSalary.value,
        jobDescription: form.jobDescription,
        startDate: now,
        username: getValue(USERNAME),
      },
      (res) => {
        const { message, token } = res.data;
        token && setValue(TOKEN, token);
        ElMessage({ message, type: "success", grouping: true });
        formProps.handelclose();
      }
    );
  });
  // 提交表单
  //关闭dialog
};
/**编辑表单 */
const edit = (formValidate: FormInstance | undefined) => {
  if (!formValidate) return;
  formValidate.validate(() => {
    editPosition(
      {
        companyName: form.companyName,
        position: form.position,
        positionRecommonder: form.positionRecommonder,
        recommondPosition: form.recommondPosition,
        recruitmentStatus: "招聘中",
        count: form.count,
        endDate: form.endDate,
        email: form.email,
        isList: form.isList,
        salary: arrangeSalary.value,
        jobDescription: form.jobDescription,
        startDate: now,
        username: getValue(USERNAME),
      },
      (res) => {
        const { message, token } = res.data;
        token && setValue(TOKEN, token);
        ElMessage({ message, type: "success", grouping: true });
        formProps.handelclose();
      }
    );
  });
};
const isEdit = computed(() => Boolean(formProps.companyName));
</script>
<template>
  <el-dialog
    v-model="formProps.dialog"
    title="请填写岗位基本信息"
    width="40rem"
    center
    align-center
    :before-close="formProps.handelclose"
  >
    <keep-alive>
      <el-form :model="form" label-width="8rem" ref="positionRef">
        <el-form-item
          label="公司名称"
          prop="companyName"
          required
          :rules="{ required: true, type: 'string', message: '请填写公司名称' }"
        >
          <el-input
            v-model="form.companyName"
            :disabled="Boolean(formProps.companyName)"
          />
        </el-form-item>
        <el-form-item
          label="公司位置"
          prop="position"
          required
          :rules="{ required: true, type: 'string', message: '请选择工作地点',validate:(a:any,value:string)=>{return value!== null} }"
        >
          <el-cascader
            placeholder="请输入/选择地址"
            filterable
            clearable
            :options="regionData"
            @change="select"
          />
        </el-form-item>
        <el-form-item
          label="职位名称"
          prop="recommondPosition"
          required
          :rules="{ required: true, type: 'string', message: '请填写职位名称' }"
        >
          <el-input
            v-model="form.recommondPosition"
            :disabled="Boolean(formProps.recommondPosition)"
          />
        </el-form-item>
        <el-form-item
          label="职位描述"
          prop="jobDescription"
          required
          :rules="{ required: true, type: 'string', message: '请填写岗位描述' }"
        >
          <el-input
            v-model="form.jobDescription"
            placeholder="前端/后端/...."
            :rows="3"
            type="textarea"
          />
        </el-form-item>
        <el-form-item
          label="招聘人数"
          prop="count"
          required
          :rules="{ required: true, type: 'number', message: '请填写招聘人数' }"
        >
          <el-input-number
            v-model="form.count"
            :min="1"
            :max="1000"
            @change="handelNumber"
          />
        </el-form-item>
        <el-form-item label="薪资范围" required>
          <el-form-item
            prop="fromSalary"
            required
            :rules="{ required: true, message: '请填写起始薪资', type: 'number' }"
          >
            <el-input-number
              v-model="form.fromSalary"
              :min="1"
              :max="1000"
              @change="handelFromSalary"
            /> </el-form-item
          >~
          <el-form-item
            prop="toSalary"
            required
            :rules="{ required: true, message: '请填写薪资', type: 'number' }"
          >
            <el-input-number
              v-model="form.toSalary"
              :min="1"
              :max="1000"
              @change="handelToSalary"
            />
          </el-form-item>
          <el-text>{{ arrangeSalary }}</el-text>
        </el-form-item>

        <el-form-item
          label="截止招聘日期"
          prop="endDate"
          required
          :rules="{ required: true, type: 'date', message: '请选择截止日期' }"
        >
          <el-col :span="11">
            <el-date-picker
              @change="handelDate"
              v-model="form.endDate"
              :disabled-date="disableDate"
              type="date"
              placeholder="请选择截止日期"
              style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item
          label="公司邮箱"
          prop="email"
          required
          :rules="{ required: true, type: 'email', message: '请填写正确邮箱' }"
        >
          <el-input placeholder="支持qq,网易" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item
          label="公司是否上市"
          prop="isList"
          required
          :rules="{ type: 'number', message: '请选择是否上市' }"
        >
          <el-radio-group v-model="form.isList">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="positionRecommonder" label="您当前的职位">
          <el-input
            placeholder="teamLeader/...."
            v-model="form.positionRecommonder"
          ></el-input>
        </el-form-item>
      </el-form>
    </keep-alive>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="formProps.handelclose">取消</el-button>

        <el-button
          type="primary"
          @click="isEdit ? edit(positionRef) : handleSubmit(positionRef)"
          >{{ isEdit ? "编辑" : "提交" }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>

<template>
  <div>
    <van-form @submit="onSubmit" style="margin: 1rem">
      <!-- 行业 -->
      <van-field
        v-model="industry"
        name="industry"
        label="行业"
        placeholder="从事行业"
        :rules="[
          {
            pattern: /^.{2,10}$/,
            message: '中文（2到10位）',
          },
        ]"
      />
      <!-- 职位 -->
      <van-field
        v-model="position"
        name="position"
        label="职位"
        placeholder="意向职位"
        :rules="[
          {
            pattern: /^.{2,10}$/,
            message: '中文（2到10位）',
          },
        ]"
      />
      <!-- 期望城市 -->
      <van-field
        readonly
        clickable
        name="city"
        :value="city"
        label="期望城市"
        placeholder="点击选择省市"
        @click="showArea = true"
      />
      <!-- 省市弹出框 -->
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          :columns-num="2"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>
      <van-field
        v-model="salary"
        name="salary"
        label="薪资"
        placeholder="期望月工资"
        type="digit"
        :rules="[
          {
            pattern: /^.{2,10}$/,
            message: '请填写符合实际的薪资',
          },
        ]"
      />
      <!-- 提交按钮 -->
      <div style="margin: 1rem">
        <van-button
          native-type="submit"
          color="rgb(0,125,98)"
          size="large"
          style="height: 2.5rem"
          >保存</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
export default {
  name: "Work816WantedJob",

  data() {
    return {
      industry: "",
      position: "",
      city: "",
      salary: "",
      areaList,
      showArea: false,
    };
  },
  created() {
    let { industry, position, city, salary } = this.nowResume.wantedJob;
    this.industry = industry;
    this.position = position;
    this.city = city;
    this.salary = salary;
  },
  mounted() {},

  methods: {
    onSubmit() {
      let wantedJob = {
        industry: this.industry,
        position: this.position,
        city: this.city,
        salary: this.salary,
      };

      this.changeWantedJob(wantedJob);
      this.$toast.success("保存成功");
    },
  },
};
</script>

<style scoped>
</style>
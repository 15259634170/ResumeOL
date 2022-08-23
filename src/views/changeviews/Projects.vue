<template>
  <div>
    <van-form @submit="onSubmit" style="margin: 1rem">
      <!-- 项目名 -->
      <van-field
        v-model="pname"
        name="pname"
        label="项目名称"
        placeholder="请输入项目名称"
        :rules="[{ required: true, message: '请填写项目名称' }]"
      />
      <!-- 技术点 -->
      <van-field
        v-model="tech"
        name="tech"
        label="技术点"
        placeholder="请输入使用的技术"
        :rules="[{ required: true, message: '请填写技术名称' }]"
      />
      <!-- 项目介绍 -->
      <van-field
        v-model="introduce"
        name="introduce"
        label="项目介绍"
        placeholder="请输入项目介绍"
        type="textarea"
        autosize
        :rules="[{ required: true, message: '请填写项目介绍' }]"
      />
      <!-- 开始时间 -->
      <van-field
        readonly
        clickable
        name="start"
        :value="start"
        label="开始时间"
        placeholder="点击选择日期"
        @click="showStart = true"
        :rules="[{ required: true, message: '请填写开始时间' }]"
      />
      <van-popup
        v-model="showStart"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          title="选择年月"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirm"
        />
      </van-popup>
      <!-- 结束时间 -->
      <van-field
        readonly
        clickable
        name="end"
        :value="end"
        label="结束时间"
        placeholder="点击选择日期"
        @click="showEnd = true"
        :rules="[{ required: true, message: '请填写开始时间' }]"
      />
      <van-popup v-model="showEnd" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          title="选择年月"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirmEnd"
        />
      </van-popup>
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
    <!-- 项目经历 -->
    <div style="margin: 1rem 1rem 0 1rem" v-if="nowResume.project.length">
      <el-timeline>
        <el-timeline-item
          v-for="item in nowResume.project"
          :key="item.pid"
          :timestamp="item.start + '——' + item.end"
          placement="top"
        >
          <h5>{{ item.pname }}</h5>
          <van-button
            icon="cross"
            type="primary"
            size="mini"
            style="float: right; margin-top: -10px"
            @click="del(item.pid)"
          />
          <h6 style="padding: 5px 0">技术点：{{ item.tech }}</h6>
          <p>{{ item.introduce }}</p>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: "Work816Projects",

  data() {
    return {
      pid: 3,
      start: "",
      showStart: false,
      end: "",
      showEnd: false,
      pname: "",
      tech: "",
      introduce: "",
      minDate: new Date(1970, 0, 1),
      currentDate: new Date(),
      maxDate: new Date(),

    };
  },

  mounted() {},

  methods: {
    onSubmit() {
      let project = {
        pid: this.pid++,
        start: this.start,
        end: this.end,
        pname: this.pname,
        tech: this.tech,
        introduce: this.introduce,
      };
      this.addProject(project);
      this.start = this.end = this.pname = this.tech = this.introduce = "";
      this.$toast.success("保存成功");
    },
    // 开始和结束时间格式化方法
    onConfirm(date) {
      this.start = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      this.showStart = false;
    },
    onConfirmEnd(date) {
      this.end = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      this.showEnd = false;
    },
    // 删除
    del(pid) {
      this.delProject(pid);
      this.$toast.success("删除成功");
    },
  },
};
</script>

<style scoped>
</style>
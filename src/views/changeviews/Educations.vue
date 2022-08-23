<template>
  <div>
    <van-form @submit="onSubmit" style="margin: 1rem">
      <!-- 名称 -->
      <van-field
        v-model="school"
        name="school"
        label="学校名称"
        placeholder="请输入学校名称"
        :rules="[{ required: true, message: '请填写学校名称' }]"
      />
      <!-- 类别 -->
      <van-field
        v-model="type"
        name="type"
        label="学校类别"
        placeholder="请输入学校类别"
        :rules="[{ required: true, message: '请填写学校类别' }]"
      />
      <!-- 专业 -->
      <van-field
        v-model="major"
        name="major"
        label="专业"
        placeholder="请输入专业"
        :rules="[{ required: true, message: '请填写专业' }]"
      />
      <!-- 开始时间 -->
      <van-field
        readonly
        clickable
        name="start"
        label="开始时间"
        placeholder="点击选择日期"
        :value="start"
        :rules="[{ required: true, message: '请填写开始时间' }]"
        @click="showStart = true"
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
        :rules="[{ required: true, message: '请填写开始时间' }]"
        @click="showEnd = true"
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
    <!-- 显示已有的记录 -->
    <div style="margin: 1rem 1rem 0 1rem" v-if="nowResume.education.length">
      <el-timeline>
        <el-timeline-item
          v-for="item in nowResume.education"
          placement="top"
          :key="item.eid"
          :timestamp="item.start + '——' + item.end"
        >
          <span>{{ item.school }} {{ item.type }} {{ item.major }}</span>
          <!-- 删除小图标 -->
          <van-button
            icon="cross"
            type="primary"
            size="mini"
            style="float: right; margin-top: -10px"
            @click="del(item.eid)"
          />
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: "Work816Educations",

  data() {
    return {
      eid: 2,
      school: "",
      type: "",
      start: "",
      showStart: false, //开始日期弹窗控制
      end: "",
      showEnd: false, //结束日期弹窗控制
      major: "",
      minDate: new Date(1970, 0, 1), //能够选择的最早日期
      currentDate: new Date(), //现在时间
      maxDate: new Date(), //能够选择的最早日期
    };
  },

  mounted() {},

  methods: {
    // 保存
    onSubmit() {
      let education = {
        eid: this.eid++, //避免id相同
        start: this.start,
        end: this.end,
        school: this.school,
        type: this.type,
        major: this.major,
      };
      this.addEducation(education);
      this.start = this.end = this.school = this.type = this.major = "";
      this.$toast.success("保存成功");
    },
    // 用于格式化开始日期
    onConfirm(date) {
      this.start = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      this.showStart = false;
    },
    // 用于格式化结束日期
    onConfirmEnd(date) {
      this.end = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      this.showEnd = false;
    },
    // 删除
    del(eid) {
      this.delEducation(eid);
      this.$toast.success("删除成功");
    },
  },
};
</script>

<style scoped>
</style>
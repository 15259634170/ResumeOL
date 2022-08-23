<template>
  <div>
    <van-form @submit="onSubmit" style="margin: 1rem">
      <!-- 技能掌握 -->
      <van-field
        v-model="skill"
        name="skill"
        label="技能掌握"
        placeholder="请输入你掌握的技能"
        type="textarea"
        autosize
        :rules="[{ required: true, message: '请填写你掌握的技能' }]"
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
export default {
  name: "Work816Skills",

  data() {
    return {
      skill: "",
    };
  },
  created() {
    this.skill = this.nowResume.skill;
  },
  mounted() {},

  methods: {
    onSubmit() {
      this.changeSkill(this.skill);
      this.$toast.success("保存成功");
    },
  },
};
</script>

<style scoped>
</style>
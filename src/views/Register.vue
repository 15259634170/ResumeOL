<template>
  <div>
    <header>
      <h1 style="text-align: center">Register</h1>
    </header>
    <main>
      <van-form @submit="onSubmit">
        <!-- 账号 -->
        <van-field
          v-model="userName"
          required
          name="userName"
          label="账号"
          placeholder="数字（6-11位）"
          :rules="[
            {
              pattern: /^[0-9]{6,11}$/,
              message: '请输入6到11位数字组成的账号',
            },
          ]"
        />
        <!-- 密码 -->
        <van-field
          v-model="password"
          required
          name="password"
          label="密码"
          placeholder="数字/字母（6-16位）"
          :type="showPwd ? 'text' : 'password'"
          :right-icon="showPwd ? 'eye-o' : 'closed-eye'"
          :rules="[
            {
              pattern: /^[A-Za-z0-9]{6,16}$/,
              message: '请输入数字或字母组成的6到16位密码',
            },
          ]"
          @click-right-icon="handleRightIcon"
        />
        <!-- 姓名 -->
        <van-field
          v-model="fullName"
          required
          name="fullName"
          label="姓名"
          placeholder="中文姓名（2-6位）"
          :rules="[
            {
              pattern: /^[\u4E00-\u9FA5]{2,6}$/,
              message: '请输入2到6个字的中文姓名',
            },
          ]"
        />
        <!-- 性别 -->
        <van-field
          name="radio"
          label="性别"
          required
          :rules="[{ required: true, message: '请选择性别' }]"
        >
          <template #input>
            <van-radio-group v-model="gender" direction="horizontal">
              <van-radio name="男">男</van-radio>
              <van-radio name="女">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- 年龄 -->
        <van-field
          v-model="age"
          type="digit"
          label="年龄"
          name="age"
          required
          maxlength="2"
          :rules="[
            {
              pattern: /^((1[6-9])|([2-9]\d)|([1-9]\d{2,}))$/,
              message: '请输入正确年龄',
            },
          ]"
        />
        <!-- 手机号 -->
        <van-field
          v-model="tel"
          type="digit"
          label="手机号"
          name="tel"
          required
          :rules="[
            {
              pattern: /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/,
              message: '请输入正确手机号',
            },
          ]"
        />
        <!-- 所在城市 -->
        <van-field
          readonly
          clickable
          name="city"
          :value="city"
          label="所在城市"
          placeholder="点击选择省市"
          @click="showArea = true"
        />
        <!-- 省市弹出框 -->
        <!-- edge 浏览器无法使用弹出的选择框，也许是浏览器问题，其他的可以 -->
        <van-popup v-model="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            :columns-num="2"
            @confirm="onConfirm"
            @cancel="showArea = false"
          />
        </van-popup>
        <!-- 提交注册按钮 -->
        <div style="margin: 1rem">
          <van-button
            native-type="submit"
            color="rgb(0,125,98)"
            size="large"
            style="height: 2.5rem"
            >注册</van-button
          >
        </div>
      </van-form>
    </main>
  </div>
</template>

<script>
// 引入vant的地址数据
import { areaList } from "@vant/area-data";
import { Toast } from "vant";
export default {
  name: "Work816Register",

  data() {
    return {
      userName: "",
      password: "",
      showPwd: false,
      fullName: "",
      gender: "",
      age: "",
      tel: "",
      city: "",
      showArea: false,
      areaList: areaList,
    };
  },

  mounted() {},

  methods: {
    onSubmit() {
      // 判断用户是否已存在
      let resume = this.getResume(this.userName);
      if (resume) {
        this.$toast.fail("用户名已存在");
      } else {
        // 注册时将所有信息初始化
        let obj = {
          userName: this.userName,
          password: this.password,
          basicInfo: {
            fullName: this.fullName,
            gender: this.gender,
            age: this.age,
            tel: this.tel,
            city: this.city,
            imgSrc: [],
            state: "",
            email: "",
          },
          wantedJob: {
            industry: "",
            position: "",
            city: "",
            salary: "",
          },
          education: [],
          project: [],
          skill: "",
        };
        // 添加用户
        this.addResume(obj);
        // 注册完成后将所有输入框置空
        this.userName =
          this.password =
          this.fullName =
          this.gender =
          this.age =
          this.tel =
          this.city =
            "";
        // 提示（注册成功）
        Toast.success("注册成功");
      }
    },
    handleRightIcon() {
      this.showPwd = !this.showPwd;
    },
  },
};
</script>

<style scoped>
</style>
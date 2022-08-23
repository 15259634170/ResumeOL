<template>
  <div>
    <van-form @submit="onSubmit" style="margin: 1rem">
      <!-- 姓名 -->
      <van-field
        v-model="fullName"
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
      <van-field name="radio" label="性别">
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
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          :columns-num="2"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>

      <!-- 求职状态-->
      <van-field
        readonly
        clickable
        name="picker"
        :value="state"
        label="求职状态"
        placeholder="点击选择求职状态"
        @click="showPicker = true"
      />
      <!-- 求职状态弹出框 -->
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="stateFormat"
          @cancel="showPicker = false"
        />
      </van-popup>
      <!-- 邮箱 -->
      <van-field
        v-model="email"
        name="email"
        label="邮箱"
        placeholder="请输入邮箱"
        :rules="[
          {
            required: false,
            validator,
            message: '格式错误',
          },
        ]"
      />
      <!-- 头像 -->
      <!-- <van-uploader v-model="fileList" multiple :max-count="2" /> -->
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader v-model="imgSrc" multiple :max-count="1" />
        </template>
      </van-field>
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
  name: "Work816BasicInfo",

  data() {
    return {
      fullName: "",
      gender: "",
      age: "",
      tel: "",
      city: "",
      showArea: false,
      areaList: areaList,
      state: "",
      columns: [
        // 第一列
        {
          values: ["在上学", "已毕业"],
        },
        // 第二列
        {
          values: ["看机会", "找实习", "找工作"],
        },
      ],
      showPicker: false,
      email: "",
      imgSrc: [],
    };
  },

  created() {
    // 将当前用户基本信息结构赋值，并赋值给data中对应数据
    let { fullName, gender, age, tel, city, state, email, imgSrc } =
      this.nowResume.basicInfo;
    this.fullName = fullName;
    this.gender = gender;
    this.age = age;
    this.tel = tel;
    this.city = city;
    this.state = state;
    this.email = email;
    this.imgSrc = imgSrc;
  },
  mounted() {},

  methods: {
    // 邮箱验证函数
    validator(val) {
      if (val == "") {
        return true;
      }
      return /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(val);
    },
    // 表单提交
    onSubmit() {
      let basicInfo = {
        fullName: this.fullName,
        gender: this.gender,
        age: this.age,
        tel: this.tel,
        city: this.city,
        imgSrc: this.imgSrc,
        state: this.state,
        email: this.email,
      };

      this.changeBasicInfo(basicInfo);
      this.$toast.success("保存成功");
    },
    // 状态格式化
    stateFormat(values) {
      this.state = values.join("/");
      this.showPicker = false;
    },
  },
};
</script>

<style scoped>
</style>
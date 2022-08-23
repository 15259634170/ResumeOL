<template>
  <div>
    <header><h1 style="text-align: center">Login</h1></header>
    <main>
      <van-form @submit="onSubmit">
        <!-- 账号框 -->
        <van-field
          v-model="userName"
          name="userName"
          label="账号"
          placeholder="请输入账号"
          :rules="[
            {
              required: true,
              pattern: /^[0-9]{6,11}$/,
              message: '请填写正确用户名',
            },
          ]"
        />
        <!-- 密码框。vant自带的小眼睛用edge第一次点击可以打开关闭，然后就不行了，
          谷歌浏览器和手机连接热点访问页面也无法使用，
          所以自己动态绑定type和right(右方图标)弄出小眼睛 -->
        <van-field
          v-model="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          clear-trigger="always"
          :type="showPwd ? 'text' : 'password'"
          :right-icon="showPwd ? 'eye-o' : 'closed-eye'"
          :rules="[
            {
              required: true,
              pattern: /^[A-Za-z0-9]{6,16}$/,
              message: '请填写正确密码',
            },
          ]"
          @click-right-icon="handleRightIcon"
        />
        <!-- 登录按钮 -->
        <div class="form-button">
          <van-button native-type="submit" color="rgb(67,70,95)"
            >登录</van-button
          >
        </div>
      </van-form>
    </main>
  </div>
</template>

<script>
export default {
  name: "Work816Login",

  data() {
    return {
      userName: "",
      password: "",
      showPwd: false,
    };
  },

  mounted() {},

  methods: {
    onSubmit() {
      let resume = this.getResume(this.userName);
      if (resume == undefined) {
        this.$toast.fail("用户不存在");
      } else {
        if (this.password == resume.password) {
          this.setNowResume(this.userName);
          sessionStorage.setItem("userName", this.userName);
          this.routerJump("home");
          this.userName = this.password = "";
          this.$toast({
            message: "欢迎",
            icon: "like-o",
          });
        } else {
          this.$toast.fail("密码错误");
        }
      }
    },
    // 小眼睛
    handleRightIcon() {
      this.showPwd = !this.showPwd;
    },
  },
};
</script>

<style scoped>
.form-button {
  margin: 1rem;
  display: flex;
  justify-content: space-around;
}
.form-button > button {
  height: 2.2rem;
  width: 11rem;
}
</style>
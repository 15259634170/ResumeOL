<template>
<!-- 所有页面的头部部分，根据路由来觉醒显示的文字和按钮事件 -->
  <div>
    <header>
      <van-nav-bar
        :title="title"
        :left-text="leftText"
        :right-text="rightText"
        :left-arrow="leftArrow"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        class="header-nav"
      />
    </header>
    <!-- 路由缓存,根据路由的meta.keepAlive决定是否缓存 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: "Work816Resume",

  data() {
    return {};
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
    title() {
      let title = {
        login: "登录",
        register: "注册",
        home: "我的简历",
        info: "基本信息",
        wanted:"求职意向",
        educations:"教育背景",
        projects:"项目经历",
        skills:"技能掌握"
      };
      return title[this.routeName];
    },
    // 左侧文本
    leftText() {
      let leftText = { login: "", home: "登出", other: "返回" };
      if (leftText[this.routeName] == undefined) {
        return leftText.other;
      }
      return leftText[this.routeName];
    },
    // 右侧文本
    rightText() {
      let rightText = {
        login: "注册",
        home: "保存",
        other: "",
      };
      if (rightText[this.routeName] == undefined) {
        return rightText.other;
      }
      return rightText[this.routeName];
    },
    // 左侧箭头是否显示
    leftArrow() {
      let leftArrow = true;
      if (this.routeName == "login") {
        leftArrow = false;
      }
      return leftArrow;
    },
  },
  mounted() {},

  methods: {
    // 左侧按钮点击事件
    onClickLeft() {
      if (this.routeName == "register" || this.routeName == "home") {
        if (this.routeName == "home") {
          sessionStorage.removeItem("userName");
          this.setNowResume("");
        }
        this.routerJump("login");
      } else {
        this.routerJump("home");
      }
    },
    // 右侧按钮点击事件
    onClickRight() {
      if (this.routeName == 'login') {
        this.routerJump("register")
      }else if(this.routeName == 'home') {
        // post 将数据提交到服务器，mock.js拦截请求以测试是否成功
        this.$axios.post('/api/test',this.routeName)
        .then(res => this.$toast.success(res.data.msg))
        .catch(err => console.log(err))
      }
    },
  },
};
</script>

<style scoped>
.header-nav {
  background-color: #ffd4a9;
}
</style>
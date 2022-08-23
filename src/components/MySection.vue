<!-- 组件，用于首页各个信息部分，接受to(路由跳转地址)和title（cell标题）参数 -->
<template>
  <div id="wrapper">
    <!-- 头部 -->
    <van-cell
      :title="title"
      value=""
      is-link
      style="font-size: larger; font-weight: 600"
      :to="to"
    />
    <!-- 详细信息 -->
    <div style="background-color: white" @click="edit(to)">
      <!-- 插槽、默认显示vant空状态-->
      <slot>
        <van-empty
          description="点击编辑"
          image-size="5rem"
          style="padding: 0 0 10px 0"
        />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Work816MySection",
  props: ["title", "to"],
  data() {
    return {};
  },

  mounted() {},

  methods: {
    // 路由跳转，这样才能在空状态下点击跳转路由，但是非空状态也因此可以点击跳转
    edit(route) {
      this.routerJump(route);
    },
  },
};
</script>

<style scoped>
#wrapper {
  margin-top: 1rem;
  border: 1px solid white;
  background-color: white;
  box-shadow: 0 2px rgba(216, 197, 197, 0.4), 0 -2px rgba(216, 197, 197, 0.526);
}
</style>
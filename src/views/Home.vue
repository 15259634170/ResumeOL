<template>
  <!-- 各个部分都添加了v-if以避免无法显示空状态，及访问不到未定义的变量的错误 -->
  <div id="wrapper" v-if="nowResume">
    <!-- 基本信息 -->
    <section class="wrapper-info" @click="routerJump('info')">
      <div class="info-div">
        <div>
          <span class="info-name">
            {{ nowResume.basicInfo.fullName }}
          </span>
          <span class="info-gender">
            {{ nowResume.basicInfo.gender }}
          </span>
          <span> {{ nowResume.basicInfo.age }}岁 </span>
        </div>
        <div>
          <van-icon name="phone-o" />
          <span>
            {{ nowResume.basicInfo.tel }}
          </span>
        </div>
        <div v-if="nowResume.basicInfo.city">
          <van-icon name="location-o" />
          <span>
            {{ nowResume.basicInfo.city }}
          </span>
        </div>
      </div>
      <div>
        <van-image
          round
          width="5rem"
          height="5rem"
          fit="cover"
          alt="pic"
          :src="imgSrc"
        >
          <template v-slot:error>
            <van-icon name="manager" size="3.5rem" />
          </template>
        </van-image>
      </div>
    </section>
    <!-- 求职意向 -->
    <my-section title="求职意向" to="wanted">
      <div
        style="padding: 0.5rem 0"
        v-if="Object.values(nowResume.wantedJob).some((item) => item != '')"
      >
        <p>行业：{{ nowResume.wantedJob.industry }}</p>
        <p>职位：{{ nowResume.wantedJob.position }}</p>
        <p>城市：{{ nowResume.wantedJob.city }}</p>
        <p>职位：{{ nowResume.wantedJob.salary }}</p>
      </div>
    </my-section>
    <!-- 教育背景 -->
    <my-section title="教育背景" to="educations">
      <div style="margin: 1rem 1rem 0 1rem" v-if="nowResume.education.length">
        <el-timeline>
          <el-timeline-item
            v-for="item in nowResume.education"
            :key="item.eid"
            :timestamp="item.start + '——' + item.end"
            placement="top"
          >
            <span>{{ item.school }} {{ item.type }} {{ item.major }}</span>
          </el-timeline-item>
        </el-timeline>
      </div>
    </my-section>
    <!-- 项目经历 -->
    <my-section title="项目经历" to="projects">
      <div style="margin: 1rem 1rem 0 1rem" v-if="nowResume.project.length">
        <el-timeline>
          <el-timeline-item
            v-for="item in nowResume.project"
            :key="item.pid"
            :timestamp="item.start + '——' + item.end"
            placement="top"
          >
            <h5>{{ item.pname }}</h5>
            <h6 style="padding: 5px 0">技术点：{{ item.tech }}</h6>
            <p>{{ item.introduce }}</p>
          </el-timeline-item>
        </el-timeline>
      </div>
    </my-section>
    <!-- 技能评价 -->
    <my-section title="技能掌握" to="skills">
      <div style="margin: 1rem" v-if="nowResume.skill">
        <p>{{ nowResume.skill }}</p>
      </div>
    </my-section>
  </div>
</template>

<script>
import MySection from "../components/MySection.vue";
export default {
  name: "Work816Home",
  // 注册组件
  components: {
    "my-section": MySection,
  },
  data() {
    return {};
  },
  computed: {
    // 图片用的src接受base64格式，在编辑页面添加头像，在本页面即可显示
    imgSrc() {
      if (!this.nowResume.basicInfo.imgSrc.length) {
        return "";
      }
      return this.nowResume.basicInfo.imgSrc[0].content;
    },
  },
  mounted() {},

  methods: {},
};
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  background-color: rgba(92, 244, 244, 0.364);
}
.wrapper-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 60px;
  background-color: rgb(109, 248, 202);
}
.info-div > div,
.info-div {
  padding: 0.4rem;
}
.info-name {
  font-size: 1.4rem;
  font-weight: bolder;
}

.info-gender {
  margin: auto 0.7rem;
}

p {
  line-height: 1.4rem;
  text-indent: 2em;
}
h5 {
  font-size: 14px;
}
h6 {
  font-size: 12px;
}
</style>
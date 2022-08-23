import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 测试数据
    resumeList: [
      {
        'userName': '123456',
        'password': '123456',
        'basicInfo': {
          fullName: '吴晋福',
          gender: '男',
          age: '21',
          tel: '15259634170',
          city: '福建/漳州',
          imgSrc: [],
          state: '',
          email: ''
        },
        'wantedJob': {
          industry: "互联网",
          position: "前端开发",
          city: "福建/漳州",
          salary: "3000"
        },
        'education': [
          {
            eid: 1,
            start: '2019年9月',
            end: '2023年6月',
            school: '莆田学院',
            type: '本科',
            major: '软件工程'
          },

        ],
        'project': [
          {
            pid: 1,
            start: '2022年8月',
            end: '2022年9月',
            pname: '个人应聘信息登记项目',
            tech: 'Vue2,Vant2',
            introduce: '用于作业及锻炼技能较长长度测试。用于作业及锻炼技能较长长度测试。用于作业及锻炼技能较长长度测试。用于作业及锻炼技能较长长度测试。'
          },
          {
            pid: 2,
            start: '2022年8月',
            end: '2020年9月',
            pname: '个人应聘信息登记项目',
            tech: 'Vue2,Vant2',
            introduce: '用于作业及锻炼技能较长长度测试。用于作业及锻炼技能较长长度测试。用于作业及锻炼技能较长长度测试。用于作业及锻炼技能较长长度测试。'
          }
        ],
        'skill': "（1）熟悉HTML、CSS、JavaScript。（2）了解HTML5、CSS3、ES6标准。（3）熟悉Vue2.js（4）能够熟练运用ElementUI、Boostrap、VantUI等组件库进行辅助开发（5）英语CET4证书。"
      },
    ],
    // 目前登录用户的userName
    nowResume: ''
  },
  getters: {
    // 通过userName 获取对象
    getResume: (state) => (userName) => {
      return state.resumeList.filter(
        (value) => value.userName == userName
      )[0]
    },
    // 获取目前登录的对象
    getNowResume: (state, getters) => getters.getResume(state.nowResume),
  },
  mutations: {
    
    // 添加，注册
    addResume(state, resume) {
      state.resumeList.push(resume);
    },
    // 设置当前登录对象的userName
    setNowResume(state, userName) {
      state.nowResume = userName;
    },
    // 以下方法用于各个部分信息的修改
    changeBasicInfo(state, basicInfo) {
      // 获取当前登录对象的在数组中的index,暂时想不出怎么把这n个index减掉
      let index = state.resumeList.findIndex((value) => value.userName == state.nowResume)
      // 在数组中修改当前登录用户的信息
      state.resumeList[index].basicInfo = basicInfo;
    },
    changeWantedJob(state, wantedJob) {
      let index = state.resumeList.findIndex((value) => value.userName == state.nowResume)
      state.resumeList[index].wantedJob = wantedJob;
    },
    addEducation(state, education) {
      let index = state.resumeList.findIndex((value) => value.userName == state.nowResume)
      state.resumeList[index].education.push(education)
    },
    delEducation(state,id) {
      let index = state.resumeList.findIndex((value) => value.userName == state.nowResume)
      let index2 = state.resumeList[index].education.findIndex((value) => value.eid ==id)
      state.resumeList[index].education.splice(index2,1)
    },
    addProject(state, project) {
      let index = state.resumeList.findIndex((value) => value.userName == state.nowResume)
      state.resumeList[index].project.push(project)
    },
    delProject(state,id) {
      let index = state.resumeList.findIndex((value) => value.userName == state.nowResume)
      let index2 = state.resumeList[index].project.findIndex((value) => value.pid ==id)
      state.resumeList[index].project.splice(index2,1)
    },
    changeSkill(state,skill) {
      let index = state.resumeList.findIndex((value) => value.userName == state.nowResume)
      state.resumeList[index].skill = skill
    }
  },
  actions: {
    addResume(context, resume) {
      context.commit('addResume', resume)
    },
    setNowResume(context, userName) {
      context.commit('setNowResume', userName)
    },
    changeBasicInfo(context, basicInfo) {
      context.commit('changeBasicInfo', basicInfo)
    },
    changeWantedJob(context, wantedJob) {
      context.commit('changeWantedJob', wantedJob)
    },
    addEducation(context,education) {
      context.commit('addEducation',education)
    },
    delEducation(context,id) {
      context.commit('delEducation',id)
    },
    addProject(context,project) {
      context.commit('addProject',project)
    },
    delProject(context,id) {
      context.commit('delProject',id)
    },
    changeSkill(context,skill) {
      context.commit('changeSkill',skill)
    }
  },
  modules: {
  }
})

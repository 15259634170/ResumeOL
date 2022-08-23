// 将vuex的辅助函数全局混入，就可以不用每个页面引入
import { mapState, mapGetters, mapActions } from "vuex";
const mixins = {
    created() {
    },
    computed: {
        ...mapGetters(['getResume', 'getNowResume']),
        nowResume() {
            return this.getNowResume;
        },
        nowIndex() {
            return mapState.resumeList.findIndex((value) => value.userName == mapState.nowResume)
        }
    },
    data() {
        return {
            
        };
    },
    methods: {
        ...mapActions([
            'addResume',
            'setNowResume',
            'changeBasicInfo',
            'changeWantedJob',
            'addEducation',
            'delEducation',
            'addProject',
            'delProject',
            'changeSkill'
        ]),
        // 路由跳转
        routerJump(route) {
            this.$router.push(route);
        },
        // 格式化地址
        onConfirm(values) {
            this.city = values
              .filter((item) => !!item)
              .map((item) => item.name)
              .join("/");
            this.showArea = false;
        },
    },
};

export default mixins;
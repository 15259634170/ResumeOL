import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './mixins'
import axios from 'axios'
import '@/mock'
// ele组件
import { Timeline, TimelineItem } from 'element-ui'
Vue.use(Timeline);
Vue.use(TimelineItem);

// 使用到的vant组件，按需引入
import { Form } from 'vant';
import { Field } from 'vant';
import { Button } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { NumberKeyboard } from 'vant';
import { Area } from 'vant';
import { Popup } from 'vant';
import { NavBar } from 'vant';
import { Icon } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Uploader } from 'vant';
import { Image as VanImage } from 'vant';
import { Empty } from 'vant';
import { Step, Steps } from 'vant';
import { Picker } from 'vant';
import { DatetimePicker } from 'vant';
import { Toast } from 'vant';

Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(NumberKeyboard);
Vue.use(Area);
Vue.use(Popup);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Uploader);
Vue.use(VanImage);
Vue.use(Empty);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Picker);
Vue.use(DatetimePicker);
Vue.use(Toast);

// 全局混入
Vue.mixin(mixin)
// axios
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

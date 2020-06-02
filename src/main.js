import Vue from "vue";
import axios from "axios";
import "@progress/kendo-ui";
import "@progress/kendo-vue-intl";
import "@progress/kendo-theme-material/dist/all.css";
import { Input } from "@progress/kendo-vue-inputs";
import { ButtonsInstaller } from "@progress/kendo-buttons-vue-wrapper";
import { PopupsInstaller } from "@progress/kendo-popups-vue-wrapper";

import App from "./App.vue";

Vue.prototype.$http = axios;

Vue.use(ButtonsInstaller);
Vue.use(PopupsInstaller);
Vue.component("k-input", Input);

Vue.config.productionTip = false;

new Vue({ render: (h) => h(App) }).$mount("#app");

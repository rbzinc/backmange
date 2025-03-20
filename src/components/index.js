// 引入项目中全部的全局组件
import SvgIcon from "./Svgicon/index.vue";
// import Category from './Category/index.vue'

// 引入 element-plus 提供的全部图标组件
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 全局对象
const allGloablComponent = { SvgIcon };

// 对外暴露插件对象
export default {
    // 务必叫做 install 方法
    install(app) {
        // 注册项目全部的全局组件
        Object.keys(allGloablComponent).forEach((key) => {
            // 注册为全局组件
            app.component(key, allGloablComponent[key]);
        });

        // 将 element-plus 提供的图标注册为全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component);
        }
    },
};
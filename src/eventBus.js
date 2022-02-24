import Vue from 'vue'

const app =  new Vue();
// 事件总线
/**
 * 事件一： showContextmenu  
 * 含义：点击右键，设置 自定义的右键菜单是否显示
 * 参数：
 * - 参数一：true / false
 * - 参数二：横坐标的位置 x  可以不传
 * - 参数三：纵坐标的位置 y  可以不传
 * - 参数四：app 单个网页应用  可以不传
 * 
 */
Vue.prototype.$bus = app;
 // new Vue()产生一个vue实例对象，这个实例对象跟普通的vue组件实例一样，有$on，$off，$emit方法
 // 把这个实例对象赋给原型的$bus，这样$bus这个对象也拥有这些方法，每个组件实例都能调用这些方法来监听、触发、取消事件。

 export default app;
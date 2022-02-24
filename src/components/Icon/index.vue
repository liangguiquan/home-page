<template>
  <i class="iconfont" :class="fontClass"></i>
</template>

<script>
const classMap = {
  home: "icon-home",
  success: "icon-success",
  close: "icon-close",
  baidu: "icon-baidu",
  bing: "icon-bing",
  google: "icon-google",
  link: "icon-link",
  code: "icon-code",
  weixin: "icon-weixin",
  mail: "icon-email",
  github: "icon-github",
  arrowUp: "icon-arrowUp",
  arrowDown: "icon-arrowDown",
  arrowDown: "icon-arrowLeft",
  arrowDown: "icon-arrowRight",
  add: "icon-add",
  search: "icon-search",
  empty: "icon-empty",
  translation: "icon-translation",
  delete: "icon-jiandao",
  edit: "icon-edit",
  setting: "icon-setting",
  login: "icon-login",
  download: "icon-download",
};
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    // 图标类样式
    fontClass() {
      return classMap[this.type];
    },
  },
};
</script>

<style scoped>
@import "//at.alicdn.com/t/font_1809371_4pq1xvh8mat.css";

.iconfont {
  color: inherit;
  font-size: inherit;
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
}
</style>
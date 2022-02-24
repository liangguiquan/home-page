<template>
  <div class="aside-container">
    <div class="setting-btn-container">
      <Icon type="setting" @click.native="handleChangeShow" />
    </div>
    <div class="login-btn-container">
      <Icon type="login" />
    </div>
  </div>
</template>

<script>
import Icon from "../Icon";
export default {
  components: {
    Icon,
  },
  data(){
      return {
          show: false,   // 是否显示settingPanel
      }
  },

  methods: {
      // 改变this.show的值，用于控制settingPanel的显示
    handleChangeShow(){
        this.show = !this.show;
        this.$emit("change", this.show);
    }
  },
};
</script>

<style lang="less" scoped>
.aside-container {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  height: 100%;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 0;
  .setting-btn-container {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    transition: 0.5s;
    margin-bottom: 6px;
    // background-color: darkorange;
    &:hover {
      transform: rotateZ(120deg);
    }
    .iconfont {
      cursor: pointer;
    }
  }
  .login-btn-container {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.5);
    .iconfont {
      cursor: pointer;
    }
  }
}
</style>
<template>
  <div class="colorPicker-container">
    <span class="title">{{ title }}</span>
    <span
      class="color-item"
      style="background-color: rgb(24, 144, 255); border-color: transparent"
    ></span>
    <span
      class="color-item"
      style="background-color: rgb(46, 204, 113); border-color: transparent"
    ></span>
    <span
      class="color-item"
      style="background-color: rgb(51, 197, 197); border-color: transparent"
    ></span>
    <span
      class="color-item"
      style="background-color: rgb(155, 89, 182); border-color: transparent"
    >
    </span>
    <span
      class="color-item"
      style="background-color: rgb(241, 196, 15); border-color: transparent"
    ></span>
    <span
      class="color-item"
      style="background-color: rgb(230, 126, 34); border-color: transparent"
    ></span>
    <span
      class="color-item"
      style="background-color: rgb(231, 76, 60); border-color: transparent"
    ></span>
    <el-color-picker
      size="mini"
      :value="color"
      @change="handleChange"
    ></el-color-picker>
  </div>
</template>

<script>
export default {
  props: {
    // color选择器的标题
    title: {
      type: String,
      default: "颜色选择器",
    },
    // 传入的颜色值
    value: {
      type: String,
      default: "#70c000",
    },
  },

  computed: {
    color() {
      if (this.value) {
        return this.value;
      }
    },
  },

  methods: {
    handleChange(newColor) {
      console.log(newColor);
      this.$emit("change", newColor);
    },
  },
};
</script>

<style lang="less" scoped>
.color-item {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid;
  background-clip: content-box;
  padding: 2px;
  box-sizing: content-box;
  box-shadow: 0 0 5px #00000026;
}
</style>

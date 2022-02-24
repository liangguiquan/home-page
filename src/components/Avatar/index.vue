<template>
  <img class="avatar-img avatar-container" :src="url" :style="{
      width: size + 'px',
      height: size + 'px'
  }" />
</template>

<script>
export default {
  name: "Avatar",
  props: {
    url: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 150,
    },
  },
};
</script>

<style scoped>
/* 带有作用域的样式 */
.avatar-img {
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>
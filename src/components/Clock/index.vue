<template>
  <div class="clock-container">{{ `${hour}:${minute}` }}</div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      hour: '',
      minute: '',
    };
  },
  methods: {
    getCurrent() {
        let date = new Date();
        this.hour = date.getHours().toString().padStart(2, '0');
        this.minute = date.getMinutes().toString().padStart(2, '0');
    },
  },
  created() {
    this.timer = setInterval(() => {
    //   console.log("时间更新了");
      this.getCurrent();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>


<style lang="less" scoped>
@import '~@/styles/var.less';
    .clock-container{
        color: rgba(255, 255, 255, 0.8);
        font-size: 50px;
        font-weight: lighter;
        box-sizing: border-box;
        height: 80px;
    }
</style>
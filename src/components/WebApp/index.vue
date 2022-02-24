<template>
  <div
    class="app-item-container"
    @click="handleClick()"
    v-on:contextmenu.prevent="handleRightClick"
  >
    <div class="app-item">
      <img class="app-icon" :src="app.iconUrl" :alt="app.title" />
      <p class="app-title" v-show="showTitle">{{ app.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // title: {
    //   type: String,
    //   required: true,
    // },
    // iconUrl: {
    //   type: String,
    //   required: true,
    // },
    // link: {
    //   type: String,
    //   default: "",
    // },
    // size: {
    //     type: String,
    //     default: 'small',
    // },
    app: {
      type: Object,
    },
  },
  data() {
    return {
      showTitle: true, // 是否显示应用名称
    };
  },

  methods: {
    // 点击右键事件
    handleRightClick(e) {
      this.$bus.$emit("showContextmenu", true, e.pageX, e.pageY, this.app); // 通过事件总线，设置自定义右键菜单的显示
    },
    handleClick() {
      if (this.app.link !== "") {
        window.open(this.app.link);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.app-item-container {
  width: calc(@app-icon-size + @app-icon-spacing);
  height: calc(@app-icon-size + @app-icon-spacing);
  justify-self: center;
  --hover-addsize: 8px;
  .app-item {
    //   box-sizing: border-box;
    //   border: 1px solid #000;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    //   background-color: rgb(162, 238, 232);
    .app-icon {
      width: @app-icon-size;
      height: @app-icon-size;
      border-radius: @app-icon-radius;
      object-fit: cover;
      transition: 0.15s;
      &:hover {
        box-shadow: 0 0 14px rgba(0, 0, 0, 0.5);
        width: calc(@app-icon-size + var(--hover-addsize));
        height: calc(@app-icon-size + var(--hover-addsize));
      }
    }
    .app-title {
      padding-top: 6px;
      font-size: @app-title-fontsize;
      max-width: @app-icon-size;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: @app-title-color;
    }
  }
  &.middle {
    width: calc((@app-icon-size + @app-icon-spacing) * 2 + @app-gap-column);
    height: calc((@app-icon-size + @app-icon-spacing) * 2 + @app-gap-row);
    grid-column: auto / span 2;
    grid-row: auto / span 2;
    .app-item {
      .app-icon {
        width: calc((@app-icon-size* 2) + @app-icon-spacing + @app-gap-column);
        height: calc((@app-icon-size* 2) + @app-icon-spacing + @app-gap-row);
        border-radius: @app-icon-radius;
        object-fit: cover;
        transition: 0.15s;
        &:hover {
          box-shadow: 0 0 14px rgba(0, 0, 0, 0.5);
          width: calc((@app-icon-size* 2) + @app-icon-spacing + @app-gap-column + var(--hover-addsize));
          height: calc((@app-icon-size* 2) + @app-icon-spacing + @app-gap-row + var(--hover-addsize));
        }
      }
      .app-title{
          max-width: calc((@app-icon-size + @app-icon-spacing) * 2 + @app-gap-column);
      }
    }
  }
  &.large {
    width: calc((@app-icon-size + @app-icon-spacing) * 4 + (@app-gap-column * 3));
    height: calc((@app-icon-size + @app-icon-spacing) * 2 + @app-gap-row);
    grid-column: auto / span 4;
    grid-row: auto / span 2;
    .app-item {
      .app-icon {
        width: calc((@app-icon-size * 4) + (@app-icon-spacing * 3) + (@app-gap-column * 3));
        height: calc((@app-icon-size* 2) + @app-icon-spacing + @app-gap-row);
        border-radius: @app-icon-radius;
        object-fit: cover;
        transition: 0.15s;
        &:hover {
          box-shadow: 0 0 14px rgba(0, 0, 0, 0.5);
          width: calc((@app-icon-size * 4) + (@app-icon-spacing * 3) + (@app-gap-column * 3) + var(--hover-addsize));
          height: calc((@app-icon-size* 2) + @app-icon-spacing + @app-gap-row + var(--hover-addsize));
        }
      }
      .app-title{
          max-width: calc((@app-icon-size + @app-icon-spacing) * 4 + @app-gap-column * 3);
      }
    }
  }
}
</style>
<template>
  <div class="home-container">
    <Clock />
    <Search />
    <div class="app-container">
      <div class="app-items">
        <WebApp
          v-for="item in data"
          :key="item.id"
          :app=item
        />
        <AddApp title="添加" />
      </div>
    </div>
    <Contextmenu />
    <Aside @change="handleShowSettingPanel" />
    <SettingPanel v-if="showSettingPanel" />
  </div>
</template>

<script>
import Clock from "../../components/Clock";
import Search from "../../components/Search";
import WebApp from "../../components/WebApp";
import AddApp from "../../components/AddApp";
import Contextmenu from "../../components/Contextmenu";
import Aside from "../../components/Aside";
import SettingPanel from "../../components/SettingPanel";



import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Clock,
    Search,
    WebApp,
    AddApp,
    Contextmenu,
    Aside,
    SettingPanel,
  },
  data() {
    return {
      showSettingPanel: false,
    };
  },

      methods: {
        handleShowSettingPanel(show){
          this.showSettingPanel = show;
        }
    },

  mounted(){
      document.body.addEventListener('click', () =>{
          this.$bus.$emit("showContextmenu", false); // 通过事件总线 取消自定义右键菜单的显示
      }, false);
      console.log(this.data);
  },

    computed: { ...mapState("webApps", ["data"])},
//   computed: { ...mapState("webApps", { WebApps: "data" }) },

};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.home-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("https://w.wallhaven.cc/full/m9/wallhaven-m9orl1.jpg");
  background-size: cover;
  background-position: center;
  overflow: hidden;

  .app-container {
    width: 66%;
    box-sizing: border-box;
    padding-top: 70px;
  }
  .app-items {
    // background-color: rgb(143, 40, 61);
    box-sizing: border-box;
    justify-content: center;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      calc(@app-icon-size + @app-icon-spacing)
    );
    grid-template-rows: repeat(
      auto-fill,
      calc(@app-icon-size + @app-icon-spacing)
    );
    grid-auto-flow: row dense;
    row-gap: @app-gap-row;
    column-gap: @app-gap-column;
  }
  // .settingPanel-container {

  // }
}
</style>
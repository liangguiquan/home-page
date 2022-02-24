<template>
  <div class="settingPanel-container" id="settingPanel-container">
    <el-collapse v-model="activeName" accordion>
      <!-- 主题 -->
      <el-collapse-item title="主题" name="1">
        <!-- 深色模式 -->
        <div class="content-row">
          <span>深色模式</span>
          <el-switch
            v-model="darkMode"
            :active-color="primaryColor"
            inactive-color="#ccc"
          >
          </el-switch>
        </div>

        <!-- 跟随系统 -->
        <!-- <div class="el-collapse-item-row">
          <span>跟随系统</span>
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </div> -->

        <!-- 主题颜色 -->
        <ColorPicker class="content-row" title="主题颜色" :value="primaryColor" @change="handlePrimaryColorChange" />
      
      </el-collapse-item>

      <!-- 图标 -->
      <el-collapse-item title="图标" name="2">
        <!-- 图标名称 -->
        <div class="content-row">
          <span>图标名称</span>
          <el-switch
            v-model="showIconName"
            :active-color="primaryColor"
            inactive-color="#ccc"
          >
          </el-switch>
        </div>

        <!-- 图标大小 -->
        <div class="content-row">
          <span class="demonstration">图标大小</span>
          <el-slider
            v-model="iconSize"
            :show-tooltip="false"
            :min="40"
            :max="100"
          ></el-slider>
          <span>{{ iconSize + "px" }}</span>
        </div>

        <!-- 图标圆角 -->
        <div class="content-row">
          <span class="demonstration">图标圆角</span>
          <el-slider
            v-model="iconRadius"
            :show-tooltip="false"
            :min="0"
            :max="100"
          ></el-slider>
          <span>{{ iconRadius + "px" }}</span>
        </div>

        <!-- 文字大小 -->
        <div class="content-row">
          <span class="demonstration">文字大小</span>
          <el-slider
            v-model="iconFontSize"
            :show-tooltip="false"
            :min="12"
            :max="20"
          ></el-slider>
          <span>{{ iconFontSize + "px" }}</span>
        </div>

        <!-- 文字颜色 -->
        <ColorPicker class="content-row" title="文字颜色" :value="iconFontColor" @change="handleIconFontColorChange" />

        <!-- 行间距 -->
        <div class="content-row">
          <span class="demonstration">行间距</span>
          <el-slider
            v-model="rowGap"
            :show-tooltip="false"
            :min="0"
            :max="20"
          ></el-slider>
          <span>{{ rowGap + "px" }}</span>
        </div>

        <!-- 列间距 -->
        <div class="content-row">
          <span class="demonstration">列间距</span>
          <el-slider
            v-model="columnGap"
            :show-tooltip="false"
            :min="0"
            :max="20"
          ></el-slider>
          <span>{{ columnGap + "px" }}</span>
        </div>

        <!-- 不透明度 -->
        <div class="content-row">
          <span class="demonstration">不透明度</span>
          <el-slider
            v-model="opacity"
            :show-tooltip="false"
            :min="0"
            :max="100"
          ></el-slider>
          <span>{{ opacity + "%" }}</span>
        </div>

        <!-- 最大宽度 -->
        <div class="content-row">
          <span class="demonstration">最大宽度</span>
          <el-slider
            v-model="maxWidth"
            :show-tooltip="false"
            :min="850"
            :max="1600"
          ></el-slider>
          <span>{{ maxWidth + "px" }}</span>
        </div>
      </el-collapse-item>

      <!-- 壁纸 -->
      <el-collapse-item title="壁纸" name="3">
        <!-- 壁纸预览 -->
        <div class="wallpaper-container">
          <div class="wallpaper">
            <img :src="wallPaperUrl" alt="" />
          </div>
          <div class="btn">
            <span>更改壁纸</span>
          </div>

          <div class="download">
            <Icon type="download" />
          </div>
        </div>

        <div class="content-row">
          <span class="demonstration">遮罩浓度</span>
          <el-slider
            v-model="wallPaperMask"
            :show-tooltip="false"
            :min="0"
            :max="100"
          ></el-slider>
          <span>{{ wallPaperMask + "%" }}</span>
        </div>
        <div class="content-row">
          <span class="demonstration">模糊度</span>
          <el-slider
            v-model="wallPaperBlur"
            :show-tooltip="false"
            :min="0"
            :max="100"
          ></el-slider>
          <span>{{ wallPaperBlur + "px" }}</span>
        </div>
      </el-collapse-item>

      <!-- 搜索栏 -->
      <el-collapse-item title="搜索栏" name="4">
        <!-- 在新标签页打开网站 -->
        <!-- <div class="content-row">
          <span class="newTab">在新标签页打开网站</span>
          <el-switch
            v-model="darkMode"
            :active-color="primaryColor"
            inactive-color="#ccc"
          >
          </el-switch>
        </div> -->

        <!-- 搜索栏圆角 -->
        <div class="content-row">
          <span class="demonstration">圆角大小</span>
          <el-slider
            v-model="searchbarRadius"
            :show-tooltip="false"
            :min="0"
            :max="100"
          ></el-slider>
          <span>{{ searchbarRadius + "px" }}</span>
        </div>

        <!-- 搜索栏高度 -->

        <div class="content-row">
          <span class="demonstration">高度</span>
          <el-slider
            v-model="searchbarHeight"
            :show-tooltip="false"
            :min="36"
            :max="80"
          ></el-slider>
          <span>{{ searchbarHeight + "px" }}</span>
        </div>
        <!-- 搜索栏透明度 -->

        <div class="content-row">
          <span class="demonstration">透明度</span>
          <el-slider
            v-model="searchbarOpacity"
            :show-tooltip="false"
            :min="0"
            :max="100"
          ></el-slider>
          <span>{{ searchbarOpacity + "%" }}</span>
        </div>
      </el-collapse-item>

      <!-- 时间/日期 -->
      <el-collapse-item title="时间/日期" name="5">
      <!-- 时间的字体大小 -->
        <div class="content-row">
          <span class="demonstration">字体大小</span>
          <el-slider
            v-model="timeFontSize"
            :show-tooltip="false"
            :min="0"
            :max="100"
          ></el-slider>
          <span>{{ timeFontSize + "px" }}</span>
        </div>
        <!-- 字体颜色 -->
        <ColorPicker class="content-row" title="字体颜色" :value="timeColor" @change="handleTimeColorChange" />
        <!-- 显示秒 -->
        <div class="content-row">
          <span>显示秒</span>
          <el-switch
            v-model="darkMode"
            :active-color="primaryColor"
            inactive-color="#ccc"
          >
          </el-switch>
        </div>
        <!-- 显示月日 -->
        <div class="content-row">
          <span>显示月日</span>
          <el-switch
            v-model="darkMode"
            :active-color="primaryColor"
            inactive-color="#ccc"
          >
          </el-switch>
        </div>
        <!-- 显示周 -->
        <div class="content-row">
          <span>显示周</span>
          <el-switch
            v-model="darkMode"
            :active-color="primaryColor"
            inactive-color="#ccc"
          >
          </el-switch>
        </div>
        <!-- 显示农历 -->
        <div class="content-row">
          <span>显示农历</span>
          <el-switch
            v-model="darkMode"
            :active-color="primaryColor"
            inactive-color="#ccc"
          >
          </el-switch>
        </div>

      </el-collapse-item>

      <!-- 重置设置 -->
      <el-collapse-item title="重置设置" name="6">
        <div>
          <span>
          重置设置
          </span>
          <span>
          把所有的设置都重置为默认配置
          </span>
          <span>重置</span>
        </div>

      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import Icon from "../Icon";
import ColorPicker from "../ColorPicker";

export default {
  components: {
    Icon,
    ColorPicker,
  },
  data() {
    return {
      activeName: "1",
      darkMode: "false",
      showIconName: "true", // 图标名称是否显示
      iconFontSize: 14, // 图标文字大小
      iconFontColor: "#000", // 图标文字颜色
      iconRadius: 14, // 图标圆角
      iconSize: 60, // 图标大小
      rowGap: 6, // 行间距
      columnGap: 6, // 列间距
      opacity: 100, // 不透明度
      maxWidth: 1350, // 最大宽度

      primaryColor: "#70c000", // 主题颜色

      wallPaperMask: 0, // 壁纸的遮罩浓度，百分比
      wallPaperBlur: 0, // 壁纸的模糊程度，百分比
      wallPaperUrl: "https://w.wallhaven.cc/full/m9/wallhaven-m9orl1.jpg",

      searchbarOpacity: 0,
      searchbarHeight: 48,
      searchbarRadius: 50,

      timeFontSize: 14,  // 时间文字大小
      timeColor: "#fff",  // 时间文字颜色

    };
  },

  methods: {
    format(percentage) {
      return `${percentage}px`;
    },

    handlePrimaryColorChange(newColor){
      // console.log(newColor);
      this.primaryColor = newColor;
    },
    handleIconFontColorChange(newColor){
      this.iconFontColor = newColor;
    },
    handleTimeColorChange(newColor){
      this.timeColor = newColor;
    }

  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.settingPanel-container {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 420px;
  height: 100vh;
  padding: 14px;
  overflow: auto;
  // background-color: #f5f5f5;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  &::-webkit-scrollbar { width: 0 !important };
  .el-collapse-item {
    box-sizing: border-box;
    padding: 0 20px;
    background-color: #fff;

    .content-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 0;
      span:nth-child(1) {
        display: inline-block;
        width: 60px;
        height: 24px;
      }
      span:last-child {
        display: inline-block;
        width: 44px;
        height: 24px;
        text-align: right;
      }

      span.newTab {
        width: 125px;
      }
    }
  }
  .is-active {
    box-shadow: 0 0 30px #0000001a;
    margin: 20px 0;
  }


  .wallpaper-container {
    position: relative;
    // background-color: @primary;
    background-size: 100%;
    background-position: center;
    // border-radius: 4px;
    // overflow: hidden;
    width: 100%;
    height: 200px;
    .wallpaper {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .btn {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.6);
      width: 100px;
      height: 40px;
      border-radius: 4px;
      font-size: 14px;
      color: rgba(255, 255, 255, 00.8);
      text-align: center;
      line-height: 40px;
    }
    .download {
      position: absolute;
      right: 8px;
      top: 8px;
      width: 30px;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 50%;
      font-size: 16px;
      // display: flex;
      text-align: center;
      line-height: 30px;
      color: rgba(255, 255, 255, 00.8);
    }
  }
}
</style>


// 不带scoped的style样式，可以修改element-ui的默认样式
<style >
/* #settingPanel-container .el-collapse-item-row span.el-color-picker__color-inner{
    border-radius: 10px;
    background-color: red !important;
    border: 1px solid #000;
  } */
</style>
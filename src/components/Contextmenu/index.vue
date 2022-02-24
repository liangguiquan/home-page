<template>
  <div class="contextmenu-container" v-show="show" :style="style">
    <!-- 尺寸选择 -->
    <div class="size">
      <el-radio-group v-model="size">
        <el-radio class="menuItem" label="small">小</el-radio>
        <el-radio class="menuItem" label="middle">中</el-radio>
        <el-radio class="menuItem" label="large">大</el-radio>
      </el-radio-group>
    </div>

    <!-- 编辑 -->
    <div class="edit menuItem" @click="handleEdit">
      <Icon type="edit" />
      <span>编辑</span>
    </div>
    <!-- 删除 -->
    <div class="delete menuItem" @click="handleDelete">
      <Icon type="delete" />
      <span>删除</span>
    </div>

    <!-- 编辑应用 -->
    <el-dialog
      :append-to-body="true"
      title="编辑应用"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="网页名称">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网页链接">
          <el-input v-model="form.link" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="icon-preview">
            <img :src="form.iconUrl" alt="" />
          </div>
          <!-- // 上传组件 -->
          <Upload v-model="form.iconUrl" @change="handleUploadSuccess" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// https://api.codelife.cc/api/website/title?url=https://www.baidu.com  获取网站icon的请求地址
import Icon from "../Icon";
import Upload from "../../components/Upload";
export default {
  components: {
    Icon,
    Upload,
  },
  data() {
    return {
      size: "small",
      show: false,
      style: {},
      form: {
        link: "",
        title: "",
        iconUrl: "",
        size: "small",
      },
      dialogFormVisible: false, // 是否显示编辑应用的对话框
    };
  },

  created() {
    this.$bus.$on("showContextmenu", this.handleShowContextmenu);
  },

  methods: {
    handleEdit() {
      this.dialogFormVisible = true;
      this.show = false;
    },
    handleDelete() {},
    handleShowContextmenu(flag, x, y, app) {
      // console.log(flag, x, y, app);
      this.show = flag;

      // 设置右键菜单的位置
      this.style = {
        left: x + "px",
        top: y + "px",
      };
      if (app) {
        this.form = { ...app };
      }
    },
    handleUploadSuccess() {
      console.log("success");
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.contextmenu-container {
  width: 110px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  padding: 16px 16px;
  border-radius: 14px;
  .menuItem {
    height: 30px;
    font-size: 14px;
    cursor: pointer;
  }
  .edit,
  .delete {
    position: relative;
    color: @words;
    .iconfont {
      margin-right: 8px;
    }
  }
}
.icon-preview {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.icon-upload {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 30px;
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
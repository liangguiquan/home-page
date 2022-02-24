<template>
  <div class="addApp-container">
    <!-- 添加按钮 -->
    <div class="icon-container" @click="dialogFormVisible = true">
      <div class="icon">
        <Icon type="add" />
      </div>
      <p class="title">{{ title }}</p>
    </div>

    <el-dialog
      :append-to-body="true"
      title="添加应用"
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
          <!-- // 上传组件 -->
          <Upload
            uploadTitle="网页图标"
            v-model="form.iconUrl"
            @change="handleUploadSuccess"
          />
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
import Icon from "../Icon";
import Upload from "../../components/Upload";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    Icon,
    Upload,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        title: "",
        link: "",
        iconUrl: "",
        size: "small",
        id: uuidv4(),
      },
      formLabelWidth: "120px",
    };
  },

  methods: {
    // handleClick() {
    //   this.dialogFormVisible = true;
    // },

    handleUploadSuccess(res) {
      this.form.iconUrl = res.url;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.icon-container {
  width: calc(@app-icon-size + @app-icon-spacing);
  height: calc(@app-icon-size + @app-icon-spacing);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  --hover-addsize: 8px;
  .icon {
    position: relative;
    width: @app-icon-size;
    height: @app-icon-size;
    border-radius: @app-icon-radius;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.15s;
    &:hover {
      box-shadow: 0 0 14px rgba(0, 0, 0, 0.5);
      width: calc(@app-icon-size + var(--hover-addsize));
      height: calc(@app-icon-size + var(--hover-addsize));
    }
    .iconfont {
      font-size: 24px;
      color: rgba(255, 255, 255, 0.7);
    }
  }
  .title {
    padding-top: 5px;
    font-size: @app-title-fontsize;
    max-width: @app-icon-size;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: @app-title-color;
  }
}
</style>
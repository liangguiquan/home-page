<template>
  <div>
    <!-- 上传组件的标题 -->
    <div v-if="uploadTitle" class="title">{{ uploadTitle }}</div>

    <!-- 上传控件 -->
    <el-upload
      class="image-uploader"
      action="/api/files"
      :show-file-list="false"
      :on-success="handleSuccess"
      name="file"
      :headers="headers"
    >
      <img v-if="value" :src="imageUrl" class="image" />
      <i v-else class="el-icon-upload icon"></i>
    </el-upload>
  </div>
</template>


<script>
// import { baseUrl } from "../../settings.js";
export default {
  props: ["uploadTitle", "value"], // uploadTitle标题    vaule 图片地址
  data() {
    return {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),  // 从本地获取token，添加到headers
      },
    };
  },
  computed: {
    imageUrl() {
      if (this.value) {
        return this.value;
      }
    },
  },

  model: {
    prop: "value",
    event: "change",
  },

  methods: {
    handleSuccess(res) {
      // console.log(res);
      if(res.url){
      this.$emit("change", res);
      }
    },
  },
};
</script>


<style lang="less" scoped>
.image-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: block;
}
.image-uploader .el-upload:hover {
  border-color: #409eff;
}
.icon {
  font-size: 28px;
  color: #8c939d;
  width: 146px;
  height: 146px;
  line-height: 146px;
  text-align: center;
  border-radius: 6px;
  border: 1px dashed #d9d9d9;
}
.image {
  width: 146px;
  height: 146px;
  display: block;
  border-radius: 6px;
}
</style>
<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <div class="input-container">
      <div class="prefix-icon">
        <div
          class="search-icon"
          v-html="currentTool.svg"
          @click="showSearchTool"
        ></div>
      </div>
      <input
        placeholder="Search Anything You Want..."
        v-model="content"
        class="input"
        @keyup="handleKeyup"
      />
      <div class="suffix-icon">
        <Icon type="search" @click.native="handleSearch(content)" />
      </div>
    </div>

    <!-- 切换不同的搜索工具 必应 google 百度 -->
    <div class="searchTool-container" :class="visible">
      <ul>
        <li
          class="item"
          v-for="(item, index) in toolList"
          :key="index"
          v-html="item.svg"
          @click="ChangeSearchTool(item)"
        ></li>
      </ul>
    </div>

    <!-- 联想词列表 -->
    <div
      class="associateWords-container"
      v-if="associateWords && associateWords.length > 0 && showAssociateWords"
    >
      <ul>
        <!-- // 原来的输入内容，为了focusIndex好计算，需要额外添加这一行元素，但需要隐藏起来 -->
        <li class="associate-item" v-show="false">
          {{ inputContent }}
        </li>
        <!-- 翻译 -->
        <li class="associate-item translation" @click="handleTranslation">
          <span class="translation-icon">
            <Icon type="translation" />
          </span>
          翻译：{{ content.trim() }}
        </li>
        <!-- // 联想词 -->
        <li
          class="associate-item"
          v-for="(item, index) in associateWords"
          :key="index"
          @click="handleSearch(item.q)"
        >
          {{ item.q }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Icon from "../../components/Icon";
import { getAssociateWords } from "../../api/search";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      content: "", // 双向绑定的数据，input输入框中的内容，用户选择联想词列表时同步变化
      inputContent: "", // 保存用户通过键盘输入的内容，不与用户选择的联想词列表同步变化
      associateWords: [], // 联想词列表
      focusIndex: 0, // 用户选择的联想词<li>列表的下标
      showAssociateWords: false, // 是否要显示联想词列表
      associateList: [], // 由联想词的li元素组成的数组
      toolList: [
        {
          name: "baidu",
          svg: `<svg t="1640349219027" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3434" width="22" height="22"><path d="M205.13942937 537.08634781c104.22832219-22.38138563 90.02726813-146.94055594 86.90783438-174.16469718-5.10452625-41.97055125-54.47009625-115.33175813-121.50518063-109.52917688-84.35557125 7.5695325-96.68060344 129.42374156-96.68060343 129.42374156-11.408835 56.32430438 27.31139813 176.67333187 131.27794968 154.2701325z m110.68533 216.65878969c-3.05399062 8.74750031-9.860025 31.15069969-3.97018781 50.65260844 11.62697719 43.75931625 49.60552594 45.72259594 49.60552688 45.72259594h54.57916687V716.70459875h-58.44028312c-26.26431563 7.83130312-38.93837438 28.27122375-41.77422282 37.04053875z m82.76313375-425.52990375c57.56771531 0 104.09743687-66.2497725 104.09743688-148.16215219 0-81.82512281-46.52972156-148.05308156-104.09743688-148.05308156-57.48045844 0-104.11925063 66.22795875-104.11925062 148.05308156 0 81.91237969 46.66060687 148.16215219 104.11925062 148.16215219z m247.94037469 9.79458281c76.93873875 9.99091031 126.41337937-72.11779688 136.25159063-134.35375406 10.03453875-62.14870031-39.61461562-134.33193937-94.08471188-146.74422844-54.57916781-12.52135969-122.72677687 74.91001594-128.94382875 131.91056156-7.41683344 69.67460438 9.96909656 139.30558125 86.77695 149.18742094z m188.51845125 365.824395s-119.04017437-92.09961844-188.54026594-191.63788406c-94.1937825-146.76604219-228.00218156-87.03872062-272.76495187-12.39047437-44.56644281 74.62643156-114.022905 121.83239438-123.88293 134.33194031-10.012725 12.3032175-143.79930938 84.530085-114.08834719 216.44064656 29.6891475 131.82330469 134.00472656 129.31467 134.00472563 129.31467s76.87329562 7.5695325 166.04980969-12.39047437c89.22014156-19.78549312 166.027995 4.9300125 166.027995 4.93001343s208.39120125 69.78367594 265.41356062-64.54826437c56.95691719-134.37556781-32.21959688-204.05017312-32.21959594-204.05017313z m-356.55335437 199.92728625h-135.4880925c-58.50572625-11.67060563-81.80330813-51.59062031-84.74822813-58.39665468-2.87947687-6.91510594-19.50190875-39.0038175-10.71078-93.60479907 25.28267625-81.80330813 97.37865844-87.6713325 97.37865844-87.6713325h72.11779687v-88.65297281l61.42883157 0.93801188v327.38774718z m252.32503218-0.93801093h-155.90619937c-60.4253775-15.57535031-63.23941125-58.50572625-63.23941031-58.50572625v-172.39774594l63.23941031-1.02526781v154.94637281c3.86111625 16.535175 24.38829281 19.5237225 24.38829375 19.52372343h64.24286437v-173.44482843h67.27504125v230.90347219z m220.69441875-460.30176375c0-29.77640437-24.73732031-119.43283031-116.46609656-119.43283032-91.88147625 0-104.16287906 84.61734188-104.16288 144.43192125 0 57.0878025 4.82094187 136.77513187 118.9529175 134.24468344 114.17560406-2.53044937 101.67605906-129.31467 101.67605906-159.24377437z m0 0" fill="#3245DF" p-id="3435"></path></svg>`,
          link: `https://www.baidu.com/s?wd=`,
        },
        {
          name: "bing",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 100 100" fill="none"><path d="M23.2739 83.9026C24.8696 84.9049 27.8614 87.6111 34.3437 84.6042C37.8342 82.6999 40.128 81.2967 41.3247 80.3947L40.826 80.6953L40.9258 54.3354L40.7263 17.9527C40.7263 17.9527 40.0282 12.7409 36.1388 10.2352C31.8505 6.82742 24.8696 2.01648 23.972 1.7158C23.1742 1.0142 20.1824 -0.0883053 18.2875 3.62013L18.3873 76.6862C18.3873 76.6862 18.487 77.4881 18.6864 78.791C19.8832 80.6953 21.4788 82.9004 23.2739 83.9026Z" fill="url(#paint0_linear_10_2)"/><path d="M70.2458 62.7546L41.3247 80.2944C40.0282 81.1965 37.8342 82.5997 34.244 84.504C27.8614 87.5109 24.8696 84.8047 23.1742 83.8024C21.3791 82.8001 19.7835 80.5951 18.5867 78.5906C19.1851 81.397 20.5813 86.4083 24.1715 89.9163C28.759 94.627 34.3437 100.741 49.4027 98.5359C52.7934 97.5336 56.4833 95.5291 63.0654 91.1191C68.0518 87.8115 73.1379 86.1077 77.3265 80.2944C82.0137 67.3651 72.739 63.5564 70.2458 62.7546Z" fill="url(#paint1_linear_10_2)"/><path d="M80.8169 54.0347C77.6256 47.9208 77.127 45.3149 67.1542 39.5017C56.9819 34.2898 55.486 33.488 55.486 33.488C55.486 33.488 52.9928 31.3832 50.5993 31.5837C48.3056 32.586 46.8097 33.9891 48.5051 38.3992C50.7988 44.7135 53.4915 51.6293 53.4915 51.6293C53.4915 51.6293 54.4887 56.7409 58.5776 58.4447C65.6583 60.75 70.2457 62.6543 70.2457 62.6543L70.146 62.7545C72.6392 63.5564 81.9139 67.2648 77.3264 80.3946C78.8223 78.3901 80.1188 75.7842 81.3155 72.5769C82.8115 66.9641 83.5096 64.1577 80.8169 54.0347Z" fill="url(#paint2_linear_10_2)"/><defs><linearGradient id="paint0_linear_10_2" x1="10.1209" y1="6.26564" x2="45.1332" y2="79.3835" gradientUnits="userSpaceOnUse"><stop stop-color="#43B4E6"/><stop offset="1" stop-color="#274EA0"/></linearGradient><linearGradient id="paint1_linear_10_2" x1="18.7266" y1="80.9445" x2="78.701" y2="80.9445" gradientUnits="userSpaceOnUse"><stop stop-color="#43B4E6"/><stop offset="0.34" stop-color="#42B2E5"/><stop offset="0.51" stop-color="#43AAE1"/><stop offset="0.64" stop-color="#419ED8"/><stop offset="0.75" stop-color="#3D8BCB"/><stop offset="0.85" stop-color="#3673BA"/><stop offset="0.93" stop-color="#2F5DAB"/><stop offset="1" stop-color="#274EA0"/></linearGradient><linearGradient id="paint2_linear_10_2" x1="55.3044" y1="46.4248" x2="82.9308" y2="67.615" gradientUnits="userSpaceOnUse"><stop stop-color="#46B3E7"/><stop offset="0.02" stop-color="#45B6E9"/><stop offset="0.14" stop-color="#53C1DB"/><stop offset="0.29" stop-color="#62C3CC"/><stop offset="0.49" stop-color="#6AC4C4"/><stop offset="1" stop-color="#6DC5C2"/></linearGradient></defs></svg>`,
          link: `https://cn.bing.com/search?q=`,
        },
        {
          name: "google",
          svg: `<svg t="1640349209995" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3285" width="22" height="22"><path d="M232.71999969 512c0-30.48 5.20000031-59.71999969 14.4-87.12L85.59999969 304.08000031A461.11999969 461.11999969 0 0 0 36.39999969 512c0 74.71999969 17.68000031 145.2 49.12000031 207.76000031l161.44000031-121.00000031A272.4 272.4 0 0 1 232.71999969 512" fill="#FBBC05" p-id="3286"></path><path d="M516.39999969 234.68c67.60000031 0 128.68000031 23.44000031 176.68000031 61.84000031L832.71999969 159.99999969C747.63999969 87.48000031 638.55999969 42.68 516.39999969 42.68c-189.67999969 0-352.72000031 106.2-430.8 261.40000031l161.60000062 120.79999969c37.2-110.64 143.28-190.2 269.19999938-190.2" fill="#EA4335" p-id="3287"></path><path d="M516.39999969 789.32c-125.95999969 0-232.03999969-79.56-269.28-190.2l-161.52 120.79999969c78.04000031 155.20000031 241.08 261.40000031 430.8 261.40000031 117.04000031 0 228.79999969-40.68 312.72-116.95999969l-153.36-116.08000031c-43.24000031 26.68000031-97.72000031 41.04-159.39999938 41.04" fill="#34A853" p-id="3288"></path><path d="M974.55999969 512c0-27.72-4.39999969-57.6-10.92-85.32H516.36000031V608h257.43999938c-12.84 61.84000031-47.88 109.36000031-97.99999969 140.28l153.31999969 116.08000031c88.12000031-80.08000031 145.44-199.36000031 145.44-352.36000031" fill="#4285F4" p-id="3289"></path></svg>`,
          link: `https://www.google.com/search?q=`,
        },
      ],
      currentTool: {
        name: "baidu",
        svg: `<svg t="1640349219027" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3434" width="22" height="22"><path d="M205.13942937 537.08634781c104.22832219-22.38138563 90.02726813-146.94055594 86.90783438-174.16469718-5.10452625-41.97055125-54.47009625-115.33175813-121.50518063-109.52917688-84.35557125 7.5695325-96.68060344 129.42374156-96.68060343 129.42374156-11.408835 56.32430438 27.31139813 176.67333187 131.27794968 154.2701325z m110.68533 216.65878969c-3.05399062 8.74750031-9.860025 31.15069969-3.97018781 50.65260844 11.62697719 43.75931625 49.60552594 45.72259594 49.60552688 45.72259594h54.57916687V716.70459875h-58.44028312c-26.26431563 7.83130312-38.93837438 28.27122375-41.77422282 37.04053875z m82.76313375-425.52990375c57.56771531 0 104.09743687-66.2497725 104.09743688-148.16215219 0-81.82512281-46.52972156-148.05308156-104.09743688-148.05308156-57.48045844 0-104.11925063 66.22795875-104.11925062 148.05308156 0 81.91237969 46.66060687 148.16215219 104.11925062 148.16215219z m247.94037469 9.79458281c76.93873875 9.99091031 126.41337937-72.11779688 136.25159063-134.35375406 10.03453875-62.14870031-39.61461562-134.33193937-94.08471188-146.74422844-54.57916781-12.52135969-122.72677687 74.91001594-128.94382875 131.91056156-7.41683344 69.67460438 9.96909656 139.30558125 86.77695 149.18742094z m188.51845125 365.824395s-119.04017437-92.09961844-188.54026594-191.63788406c-94.1937825-146.76604219-228.00218156-87.03872062-272.76495187-12.39047437-44.56644281 74.62643156-114.022905 121.83239438-123.88293 134.33194031-10.012725 12.3032175-143.79930938 84.530085-114.08834719 216.44064656 29.6891475 131.82330469 134.00472656 129.31467 134.00472563 129.31467s76.87329562 7.5695325 166.04980969-12.39047437c89.22014156-19.78549312 166.027995 4.9300125 166.027995 4.93001343s208.39120125 69.78367594 265.41356062-64.54826437c56.95691719-134.37556781-32.21959688-204.05017312-32.21959594-204.05017313z m-356.55335437 199.92728625h-135.4880925c-58.50572625-11.67060563-81.80330813-51.59062031-84.74822813-58.39665468-2.87947687-6.91510594-19.50190875-39.0038175-10.71078-93.60479907 25.28267625-81.80330813 97.37865844-87.6713325 97.37865844-87.6713325h72.11779687v-88.65297281l61.42883157 0.93801188v327.38774718z m252.32503218-0.93801093h-155.90619937c-60.4253775-15.57535031-63.23941125-58.50572625-63.23941031-58.50572625v-172.39774594l63.23941031-1.02526781v154.94637281c3.86111625 16.535175 24.38829281 19.5237225 24.38829375 19.52372343h64.24286437v-173.44482843h67.27504125v230.90347219z m220.69441875-460.30176375c0-29.77640437-24.73732031-119.43283031-116.46609656-119.43283032-91.88147625 0-104.16287906 84.61734188-104.16288 144.43192125 0 57.0878025 4.82094187 136.77513187 118.9529175 134.24468344 114.17560406-2.53044937 101.67605906-129.31467 101.67605906-159.24377437z m0 0" fill="#3245DF" p-id="3435"></path></svg>`,
        link: `https://www.baidu.com/s?wd=`,
      },
      visible: "hidden", // 搜索工具是否显示
    };
  },
  mounted() {
    document.body.addEventListener("click", (e) => {
      if (e.target.nodeName === "INPUT") {
        this.showAssociateWords = true;
      } else {
        this.showAssociateWords = false;
      }
    });
  },
  methods: {
    async handleKeyup(e) {
      // 隐藏搜索工具栏
      this.visible = "hidden";

      // 按了上箭头
      if (e.keyCode === 38) {
        this.focusIndex--;
        this.selectedLi();
      }
      // 按了下箭头
      else if (e.keyCode === 40) {
        this.focusIndex++;
        this.selectedLi();
      }
      // 按了回车，调用搜索函数
      else if (e.keyCode === 13) {
        // 跳转到相应的搜索工具页面，进行搜索
        // `https://www.baidu.com/s?wd=${content}`
        // window.location.href= `https://www.baidu.com/s?wd=${content}`;  // 原来的窗口打开新页面
        // window.open(`https://www.baidu.com/s?wd=${content.trim()}`); // 新窗口打开新页面
        window.open(this.currentTool.link + this.content);
        // 清空输入框
        this.content = "";
        this.associateWords = [];
      } else {
        // 用户正常输入时，
        this.focusIndex = 0;
        this.inputContent = "";
        let result = await getAssociateWords(this.content.trim());
        if (result.data.g) {
          this.associateWords = result.data.g;
        }
        this.clearSelected();
      }
    },

    // 根据focusIndex的变化，重新给选中联想词添加样式
    selectedLi() {
      if (this.inputContent === "") {
        this.inputContent = this.content;
      }

      // 1.移除元素已添加的'selected'类名
      this.clearSelected();

      // 2.处理this.focusIndex
      this.focusIndex =
        (this.focusIndex + this.associateList.length) %
        this.associateList.length;
      // 3.根据新的focusIndex，给选中的元素添加样式
      let selectedDom = this.associateList[this.focusIndex];
      selectedDom.classList.add("selected"); // 添加选中样式
      this.content = selectedDom.textContent; // 修改输入框中的值
    },

    // 移除元素已添加的'selected'类名
    clearSelected() {
      // 获取所有联想词的li元素
      this.associateList = document.getElementsByClassName("associate-item");
      // 移除元素已添加的'selected'类名
      for (let i = 0; i < this.associateList.length; i++) {
        if (this.associateList[i].classList.contains("selected")) {
          this.associateList[i].classList.remove("selected");
        }
      }
    },

    // 显示搜索工具
    showSearchTool() {
      // 联想词列表显示时，搜索工具不能显示
      if (this.showAssociateWords) {
        this.visible = "hidden";
      } else {
        this.visible = this.visible === "hidden" ? "" : "hidden";
      }
    },

    // 切换搜索工具
    ChangeSearchTool(searchTool) {
      this.currentTool = searchTool;
      this.visible = this.visible === "hidden" ? "" : "hidden";
    },

    handleTranslation() {
      // 翻译功能
      // `https://translate.google.cn/?sl=zh-CN&tl=en&text=${word}&op=translate`
      window.open(
        `https://translate.google.cn/?sl=zh-CN&tl=en&text=${this.content.trim()}&op=translate`
      );
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.search-container {
  position: relative;
  width: 580px;
  .input-container {
    display: flex;
    justify-content: space-between;
    height: 48px;
    width: 580px;
    background-color: @search-bgColor;
    backdrop-filter: blur(8px);
    border-radius: @search-radius;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
    &:hover {
      background-color: @search-active-bgColor;
    }
    .prefix-icon {
      position: relative;
      width: 48px;
      height: 100%;
      .search-icon {
        width: 22px;
        height: 22px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .suffix-icon {
      position: relative;
      width: 48px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 18px;
        color: @words;
        cursor: pointer;
      }
    }
    .input {
      height: 100%;
      border: none;
      flex: 1 0 auto;
      box-sizing: border-box;
      font-size: 16px;
      color: @words;
      outline: none;
      background-color: transparent;
      padding: 6px 6px 4px 6px;
    }
  }
  .associateWords-container {
    position: absolute;
    top: 60px;
    left: 0px;
    width: 100%;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    transition: 0.2s;
    box-sizing: border-box;
    padding: 14px 0;
    .associate-item {
      cursor: pointer;
      padding: 0 22px;
      color: @words;
      height: 30px;
      line-height: 33px;
      font-size: 14px;
      transition: 0.2s;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      &:hover {
        text-indent: 10px;
        background-color: rgba(255, 255, 255, 0.25);
      }
      &.selected {
        text-indent: 10px;
        background-color: rgba(255, 255, 255, 0.25);
      }
    }
    .translation {
      .translation-icon {
        display: inline-block;
        position: relative;
        width: 16px;
        height: 16px;
        color: @words;
        font-size: 16px;
        // background-color: turquoise;
        text-indent: 0px;
        transform: translate(0, 3px);
        margin-right: 2px;
      }
    }
  }
  .searchTool-container {
    position: absolute;
    top: 68px;
    left: 50%;
    transform: translate(-50%, 0);
    transition: 0.4s;
    width: 420px;
    opacity: 1;
    z-index: 1;
    &.hidden {
      transform: translate(-50%, -40px);
      opacity: 0;
      z-index: -1;
    }
    ul {
      display: flex;
      justify-content: space-evenly;
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 88px;
        height: 32px;
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 16px;
      }
    }
  }
}
</style>


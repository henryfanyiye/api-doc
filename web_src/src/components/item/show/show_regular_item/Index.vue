<template>
  <div class='hello' v-if='showComp'>
    <Header></Header>
    <div id='header'></div>

    <div class='container doc-container' id='doc-container'>
      <div id='left-side'>
        <LeftMenu
          ref='leftMenu'
          :get_page_content='get_page_content'
          :keyword='keyword'
          :projectInfo='projectInfo'
          :search_item='search_item'
          v-if='projectInfo'
        />
      </div>

      <div id='right-side'>
        <div id='p-content'>
          <div id='doc-body'>
            <Preview :content='content' />
          </div>
        </div>

        <OpBar
          :page_id='page_id'
          :item_id='projectInfo.item_id'
          :projectInfo='projectInfo'
          :page_info='page_info'
        />
      </div>
    </div>

    <BackToTop />

    <Footer />
  </div>
</template>

<script>
import VditorEdit from '@/components/common/VditorEdit';
import BackToTop from '@/components/common/BackToTop';
import LeftMenu from '@/components/item/show/show_regular_item/LeftMenu';
import OpBar from '@/components/item/show/show_regular_item/OpBar';
import Preview from '@/components/item/show/show_regular_item/Preview';
import { rederPageContent } from '@/models/page';

export default {
  props: {
    projectInfo: '',
    search_item: '',
    keyword: '',
  },
  data() {
    return {
      content: '###正在加载...',
      page_id: '',
      page_title: '',
      dialogVisible: false,
      share_item_link: '',
      qr_item_link: '',
      page_info: '',
      copyText: '',
      attachment_count: '',
      fullPage: false,
      showfullPageBtn: false,
      showToc: true,
      showComp: true,
      lang: '',
    };
  },
  components: {
    Preview,
    VditorEdit,
    LeftMenu,
    OpBar,
    BackToTop,
  },
  methods: {
    // 获取页面内容
    get_page_content(page_id) {
      if (page_id <= 0) {
        return;
      }
      this.adaptScreen();
      const that = this;
      this.axios.get(`/api/project/item/${page_id}`).then(res => {
        // loading.close();
        if (res.code === 0) {
          that.content = rederPageContent(
            res.data.markdown,
          );
          that.$store.dispatch('changeOpenCatId', res.data.item_id);
          that.page_title = res.data.title;
          that.page_info = res.data;
          that.attachment_count = res.data.attachment_count > 0 ? res.data.attachment_count : '';
          // 切换变量让它重新加载、渲染子组件
          that.page_id = 0;
          that.projectInfo.default_page_id = page_id;
          that.$nextTick(() => {
            that.page_id = page_id;
            // 页面回到顶部
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            document.title = that.page_title + '--ShowDoc';
          });
        } else {
          that.$alert(res.msg);
        }
      });
    },
    // 根据屏幕宽度进行响应(应对移动设备的访问)
    adaptToMobile() {
      let childRef = this.$refs.leftMenu; // 获取子组件
      childRef.hide_menu();
      const doc_container = document.getElementById('doc-container');
      doc_container.style.width = '95%';
      doc_container.style.padding = '5px';
      const header = document.getElementById('header');
      header.style.height = '10px';
      const docTitle = document.getElementById('doc-title-box');
      docTitle.style.marginTop = '40px';
      this.showToc = false;
    },
    // 根据屏幕宽度进行响应。应对小屏幕pc设备(如笔记本)的访问
    adaptToSmallpc() {
      const doc_container = document.getElementById('doc-container');
      doc_container.style.width = 'calc( 95% - 300px )';
      doc_container.style.marginLeft = '300px';
      doc_container.style.padding = '20px';
      const header = document.getElementById('header');
      header.style.height = '20px';
      const docTitle = document.getElementById('doc-title-box');
      docTitle.style.marginTop = '30px';
    },
    // 响应式
    adaptScreen() {
      this.$nextTick(() => {
        // 根据屏幕宽度进行响应(应对移动设备的访问)
        if (this.isMobile() || window.innerWidth < 1300) {
          if (window.innerWidth < 1300 && window.innerWidth > 1100) {
            this.adaptToSmallpc();
          } else {
            this.adaptToMobile();
          }
        }
      });
    },
    onCopy() {
      this.$message(this.$t('copy_success'));
    },
    ShowAttachment() {
      let childRef = this.$refs.AttachmentList; // 获取子组件
      childRef.show();
    },
    clickFullPage() {
      // 点击放大页面。由于历史包袱，只能操作dom。这是不规范的，但是现在没时间重构整块页面
      if (this.fullPage) {
        // 通过v-if指令起到刷新组件的作用
        this.showComp = false;
        this.$nextTick(() => {
          this.showComp = true;
          this.showToc = true;
        });
      } else {
        this.adaptToMobile();
        // 切换变量让它重新加载、渲染子组件
        const page_id = this.page_id;
        this.page_id = 0;
        this.$nextTick(() => {
          this.page_id = page_id;
          setTimeout(() => {
            $('.editormd-html-preview').css('font-size', '16px');
          }, 200);
        });

        $('#left-side').hide();
        $('.op-bar').hide();
      }

      this.fullPage = !this.fullPage;
    },
  },
  mounted() {
    this.adaptScreen();
    this.set_bg_grey();
    this.lang = DocConfig.lang;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page_content_main {
  width: 800px;
  margin: 0 auto;
  height: 50%;
  overflow: visible;
}

.editormd-html-preview {
  width: 95%;
  font-size: 16px;
  overflow-y: hidden;
}

#attachment {
  float: right;
  font-size: 25px;
  margin-top: -40px;
  margin-right: 5px;
  cursor: pointer;
  color: #abd1f1;
}

#full-page {
  float: right;
  font-size: 25px;
  margin-top: -50px;
  margin-right: 30px;
  cursor: pointer;
  color: #ccc;
}

#page_md_content {
  /*padding: 10px 10px 90px 10px;*/
  overflow: hidden;
  font-size: 11pt;
  line-height: 1.7;
  color: #333;
}

.doc-container {
  position: static;
  -webkit-box-shadow: 0px 1px 6px #ccc;
  -moz-box-shadow: 0px 1px 6px #ccc;
  -ms-box-shadow: 0px 1px 6px #ccc;
  -o-box-shadow: 0px 1px 6px #ccc;
  box-shadow: 0px 1px 6px #ccc;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 20px;
  width: 800px;
  min-height: 750px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
}

#header {
  height: 80px;
}

#doc-body {
  width: 95%;
  margin: 0 auto;
  background-color: #fff;
}

.doc-title-box {
  height: auto;
  width: auto;
  /*border-bottom: 1px solid #ebebeb;*/
  /*padding-bottom: 10px;*/
  width: 100%;
  /*margin: 10px auto;*/
  text-align: center;
}

pre ol {
  list-style: none;
}

.markdown-body pre {
  background-color: #f7f7f9;
  border: 1px solid #e1e1e8;
}

.hljs {
  background-color: #f7f7f9;
}

.tool-bar {
  margin-top: -38px;
}

.editormd-html-preview,
.editormd-preview-container {
  padding: 0px;
  font-size: 14px;
}

.empty-tips {
  margin: 5% auto;
  width: 400px;
  text-align: center;
  color: #909399;
}

.empty-tips .icon {
  font-size: 100px;
  margin-left: -50px;
}

.empty-tips .text {
  text-align: left;
}

.empty-tips .links {
  line-height: 2em;
}

.empty-tips .links a {
  color: #909399;
  text-decoration: underline;
}
</style>

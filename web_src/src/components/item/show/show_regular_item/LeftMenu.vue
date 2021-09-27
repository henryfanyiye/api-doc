<template>
  <div :class="hideScrollbar ? 'hide-scrollbar' : 'normal-scrollbar'">
    <el-aside
      :class='menuMarginLeft'
      id='left-side-menu'
      :width='asideWidth'
      @mouseenter.native='hideScrollbar = false'
      @mouseleave.native='hideScrollbar = true'
    >
      <el-menu
        @select='select_menu'
        background-color='#fafafa'
        text-color
        active-text-color='#008cff'
        :default-active='itemId ? itemId.toString() : null'
      >
        <!-- 一级目录 -->
        <template
          v-if='projectInfo && projectInfo.length'
          v-for='item in projectInfo'
        >
          <!-- 页面 -->
          <template v-if='!item.items'>
            <el-menu-item
              :index='item.id.toString()'
              :key='item.id'
            >
              <i class='el-icon-document'></i>
              <a
                :href='randerUrl(item.id)'
                @click.prevent='() => {}'
                :title='item.name'
                :id="'left_page_' + item.id"
              >{{ item.name }}</a
              >
            </el-menu-item>
          </template>
          <!-- 目录 -->
          <template v-if='item.items'>
            <LeftMenuSub
              v-if='item.items.length'
              :catalog='item'
              :projectId='projectId'
            ></LeftMenuSub>
          </template>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import LeftMenuSub from './LeftMenuSub.vue';

export default {
  props: {
    get_page_content: '',
    projectId: '',
    projectInfo: '',
    search_item: '',
    keyword: '',
    itemId: '',
  },
  data() {
    return {
      openeds: [],
      menu: '',
      hideScrollbar: true,
      asideWidth: '250px',
      menuMarginLeft: 'menu-margin-left1',
    };
  },
  components: {
    LeftMenuSub,
  },
  mounted() {
    const that = this;
    if (that.itemId) {
      that.select_menu(that.itemId);
      // 延迟把左侧栏滚动到默认展开的那个页面
      setTimeout(() => {
        const element = document.querySelector(
          '#left_page_' + that.itemId,
        );
        element.scrollIntoView();
      }, 1000);
    }
    // 如果是大屏幕且存在目录，则把侧边栏调大
    if (
      window.screen.width >= 1600 &&
      this.menu &&
      this.menu.length > 0
    ) {
      this.asideWidth = '300px';
      this.menuMarginLeft = 'menu-margin-left2';
    }
  },
  methods: {
    // 选中菜单的回调
    select_menu(index, indexPath) {
      this.change_url(index);
      this.get_page_content(index);
    },
    new_page() {
      const url = '/page/edit/' + this.projectId + '/0';
      this.$router.push({ path: url });
    },

    mamage_catalog() {
      const url = '/catalog/' + this.projectId;
      this.$router.push({ path: url });
    },

    // 改变url
    change_url(item_id) {
      this.$router.replace({
        path: '/' + this.projectId + '/' + item_id,
      }).catch(() => {
      });
    },

    input_keyword() {
      this.search_item(this.keyword);
    },
    randerUrl(page_id) {
      return '#/' + this.projectId + '/' + page_id;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  color: #333;
  line-height: 60px;
}

#left-side-menu {
  color: #333;
  position: fixed;
  margin-top: -20px;
  height: calc(100% - 90px);
}

.menu-margin-left1 {
  margin-left: -273px;
}

.menu-margin-left2 {
  margin-left: -323px;
}

.el-input-group__append button.el-button {
  background-color: #ffffffa3;
}

.el-menu {
  border-right: none;
}

.icon-folder {
  width: 18px;
  height: 15px;
  cursor: pointer;
}

.menu-icon-folder {
  margin-right: 5px;
  margin-top: -5px;
}

.el-menu-item,
.el-submenu__title {
  height: 46px;
  line-height: 46px;
}

.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}

.el-menu-item {
  line-height: 40px;
  height: 40px;
  font-size: 12px;
}

.el-menu-item [class^='el-icon-'] {
  font-size: 17px;
  margin-bottom: 4px;
}

.el-submenu__title img {
  width: 14px;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 10px;
  margin-bottom: 4px;
}

.search-box {
  padding: 0px 20px 0px 20px;
  box-sizing: border-box;
}

/*隐藏滚动条*/
.hide-scrollbar ::-webkit-scrollbar {
  display: none;
}

/*隐藏滚动条*/
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.header-left-btn {
  font-size: 20px;
  margin-top: 5px;
  cursor: pointer;
  position: fixed;
}

.el-menu-item:not(.is-active) a {
  color: #303133;
}
</style>
<style type='text/css'>
#left-side-menu .el-input__inner {
  background-color: #fafafa !important;
  padding-right: 10px;
}

.hide-scrollbar .el-submenu__title {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hide-scrollbar li {
  /* white-space: normal;*/
  overflow: hidden;
  text-overflow: ellipsis;
}

.normal-scrollbar .el-submenu__title {
  font-size: 12px;
}

.normal-scrollbar li {
  font-size: 12px;
}

#left-side-menu .el-input__suffix {
  right: 25px;
  padding-right: 10px;
}
</style>

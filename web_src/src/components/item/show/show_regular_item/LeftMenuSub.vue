<template>
  <div>
    <template v-if='catalog'>
      <el-submenu
        :index='catalog.id.toString()'
      >
        <template slot='title'>
          <img src='static/images/folder.png' />
          {{ catalog.name }}
        </template>
        <template
          v-if='catalog.items&&catalog.items.length'
          v-for='page in catalog.items'
        >
          <!-- 页面 -->
          <template v-if='!page.items'>
            <el-menu-item
              :index='page.id.toString()'
              :key='page.id'
            >
              <i class='el-icon-document'></i>
              <a
                :href='randerUrl(page.id)'
                @click.prevent='() => {}'
                :title='page.name'
                :id="'left_page_' + page.id"
              >{{ page.name }}</a
              >
            </el-menu-item>
          </template>
          <!-- 目录 -->
          <template v-if='page.items'>
            <LeftMenuSub
              v-if='page.items.length'
              :catalog='page'
              :projectId='projectId'
            ></LeftMenuSub>
          </template>
        </template>


      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'LeftMenuSub',
  props: {
    catalog: [],
    projectId: {},
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    randerUrl(page_id) {
      if (!this.projectId) return;
      return '#/' + this.projectId + '/' + page_id;
    },
  },
  mounted() {
    // console.log(this.catalog);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.el-menu-item:not(.is-active) a {
  color: #303133;
}
</style>

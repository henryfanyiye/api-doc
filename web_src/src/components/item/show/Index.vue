<template>
  <div class='hello'>
    <Header></Header>

    <!-- 展示常规项目 -->
    <ShowRegularItem
      :projectId='projectId'
      :itemId='itemId'
      :projectInfo='projectInfo'
      :search_item='search_item'
      :keyword='keyword'
      v-if='projectInfo'
    ></ShowRegularItem>

    <Footer></Footer>
  </div>
</template>

<script>
import ShowRegularItem from '@/components/item/show/show_regular_item/Index';

export default {
  data() {
    return {
      projectId: '',
      itemId: '',
      projectInfo: '',
      keyword: '',
    };
  },
  components: {
    ShowRegularItem,
  },
  beforeDestroy() {
    this.$message.closeAll();
    document.title = 'ShowDoc';
  },
  mounted() {
    this.get_item_menu();
    this.itemId = this.$route.params.itemId;
  },
  methods: {
    // 获取菜单
    get_item_menu(keyword) {
      if (!keyword) {
        keyword = '';
      }
      const that = this;
      const loading = that.$loading();
      that.projectId = that.$route.params.projectId;
      this.axios.get(`/api/project/project/${that.projectId}`).then(res => {
        loading.close();
        if (res.code === 0) {
          that.projectInfo = res.data.data;
          that.$store.dispatch('changeItemInfo', res.data.data);
          document.title = res.data.name + '--ShowDoc';
        } else {
          that.$alert(res.msg);
        }
      });
    },
    search_item(keyword) {
      this.projectInfo = '';
      this.$store.dispatch('changeItemInfo', '');
      this.keyword = keyword;
      this.get_item_menu(keyword);
    },
  },
};
</script>

<template>
  <div class='hello'>
    <Header></Header>

    <el-container class='container-narrow'>
      <el-row class='masthead'>
        <div class='logo-title'>
          <h2 class='muted'>
            <img
              src='static/logo/b_64.png'
              style='width:50px;height:50px;margin-bottom:-10px;'
              alt
            />ShowDoc
          </h2>
        </div>
        <div class='header-btn-group pull-right'>
          <el-tooltip
            class='item'
            effect='dark'
            :content="$t('team_mamage')"
            placement='top'
          >
            <router-link to='/team/index'>
              <i class='el-icon-s-flag'></i>
            </router-link>
          </el-tooltip>

          <el-tooltip
            v-if='isAdmin'
            class='item'
            effect='dark'
            :content="$t('background')"
            placement='top'
          >
            <router-link to='/admin/index'>
              <i class='el-icon-s-tools'></i>
            </router-link>
          </el-tooltip>&nbsp;&nbsp;

          <el-tooltip
            class='item'
            effect='dark'
            :content="$t('more')"
            placement='top'
          >
            <el-dropdown @command='dropdown_callback' trigger='click'>
              <span class='el-dropdown-link'>
                <i class='el-icon-caret-bottom el-icon--right'></i>
              </span>
              <el-dropdown-menu slot='dropdown'>

                <el-dropdown-item>
                  <router-link to='/user/setting'
                  >{{ $t('Logged') }}:{{ username }}
                  </router-link
                  >
                </el-dropdown-item>

                <el-dropdown-item>
                  <router-link to='/attachment/index'>{{
                      $t('my_attachment')
                    }}
                  </router-link>
                </el-dropdown-item>

                <el-dropdown-item :command='logout'>{{
                    $t('logout')
                  }}
                </el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
          </el-tooltip>
        </div>
      </el-row>
    </el-container>

    <el-container class='container-narrow'>
      <div class='container-thumbnails'>
        <ul class='thumbnails' id='item-list'>
          <draggable
            v-model='projectList'
            tag='span'
            group='item'
            ghostClass='sortable-chosen'
          >
            <li
              class='text-center'
              v-for='item in projectList'
              v-loading='loading'
              :key='item.projectId'
            >
              <router-link
                class='thumbnail item-thumbnail'
                :to="'/'+item.projectId"
                :title='item.description'
              >
                <!-- 自己创建的话显示项目设置按钮 -->
                <span
                  class='item-setting'
                  @click.prevent='click_item_setting(item.projectId)'
                  :title="$t('item_setting')"
                  v-if='item.creator'
                >
                  <i class='el-icon-setting'></i>
                </span>
                <p class='my-item'>{{ item.projectName }}</p>
              </router-link>
            </li>
          </draggable>
          <li class='text-center'>
            <router-link class='thumbnail item-thumbnail' to='/item/add' title>
              <p class='my-item'>
                {{ $t('new_item') }}
                <i class='el-icon-plus'></i>
              </p>
            </router-link>
          </li>
        </ul>
      </div>
    </el-container>

    <Footer></Footer>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  data() {
    return {
      projectList: [],
      isAdmin: false,
      lang: '',
      username: '',
      loading: false,
    };
  },
  mounted() {
    this.lang = DocConfig.lang;
    this.user_info();
    this.get_item_list();
  },
  methods: {
    user_info() {
      const that = this;
      this.get_user_info(function(response) {
        if (response.code === 0) {
          that.isAdmin = true;
          that.username = response.data.username;
        }
      });
    },
    get_item_list() {
      this.loading = true;
      this.axios.get('/api/user/project/list', {
        is_delete: 0,
      }).then(res => {
        this.loading = false;
        this.projectList = res.data;
      });
    },
    // 进入项目设置页
    click_item_setting(projectId) {
      this.$router.push({ path: '/item/setting/' + projectId });
    },
    logout() {
      const that = this;
      that.axios.get('/api/user/logout').then(function(response) {
        this.removeToken();
        if (response.data.code === 0) {
          that.$router.push({
            path: '/',
          });
        } else {
          that.$alert(response.data.msg);
        }
      });
    },
    dropdown_callback(data) {
      if (data) {
        data();
      }
    },
  },
  beforeDestroy() {
    this.$message.closeAll();
  },
};
</script>

<style scoped>
.container-narrow {
  margin: 0 auto;
  max-width: 930px;
}

.masthead {
  width: 100%;
  margin-top: 30px;
}

.header-btn-group {
  margin-top: -38px;
  font-size: 18px;
}

.header-btn-group a {
  color: #333;
  margin-left: 25px;
}

.el-dropdown {
  font-size: 18px;
}

.el-dropdown-link,
a {
  color: #333;
}

.logo-title {
  margin-left: 0px;
}

.container-thumbnails {
  margin-top: 30px;
  max-width: 1000px;
}

.my-item {
  margin: 40px 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.thumbnails li {
  float: left;
  margin-bottom: 20px;
  margin-left: 20px;
}

.thumbnails li a {
  color: #444;
  font-weight: bold;
  height: 100px;
  width: 180px;
}

.thumbnails li a:hover,
.thumbnails li a:focus {
  border-color: #f2f5e9;
  -webkit-box-shadow: none;
  box-shadow: none;
  text-decoration: none;
  background-color: #f2f5e9;
}

.thumbnail {
  display: block;
  padding: 4px;
  line-height: 20px;
  border: 1px solid #ddd;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  list-style: none;
  background-color: #ffffff;
}

.item-setting {
  float: right;
  margin-right: 15px;
  margin-top: 5px;
  display: none;
}

.thumbnails li a i {
  color: #777;
  font-weight: bold;
  margin-left: 5px;
}

.item-thumbnail:hover .item-setting {
  display: block;
}

</style>

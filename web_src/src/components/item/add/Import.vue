<template>
  <div class='hello'>
    <p class='tips'>
      <span v-html="$t('import_file_tips1')"></span>
    </p>

    <p>
      <el-upload
        class='upload-demo'
        drag
        name='file'
        :headers='headers'
        :action='upload_url'
        :on-success='success'
        :on-error='error'
        :before-upload='beforeUpload'
        :show-file-list='false'
      >
        <i class='el-icon-upload'></i>
    <div class='el-upload__text'>
      <span v-html="$t('import_file_tips2')"></span>
    </div>
    </el-upload>
    </p>
    <p></p>
    <p></p>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth';

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      loading: '',
      upload_url: DocConfig.server + '/api/postman/upload',
      headers: {
        'Authorization': '',
      },
    };
  },
  methods: {
    success(data) {
      this.loading.close();
      if (data.code === 0) {
        this.$router.push({ path: '/item/index' });
      } else {
        this.$alert(data.msg);
      }
    },
    error() {
      this.loading.close();
    },
    beforeUpload() {
      this.loading = this.$loading();
      this.headers.Authorization = 'Bearer ' + getToken();
    },
  },

  mounted() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  text-align: left;
  margin-left: 10px;
  margin-top: 30px;
}

.tips {
  margin-left: 5px;
  margin-bottom: 20px;
  color: #9ea1a6;
  padding: 10px;
}
</style>

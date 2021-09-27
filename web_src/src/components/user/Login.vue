<template>
  <div class='hello'>
    <Header></Header>

    <el-container>
      <el-card class='center-card'>
        <el-form
            status-icon
            label-width='0px'
            class='demo-ruleForm'
            @keyup.enter.native='onSubmit'
        >
          <h2>{{ $t('login') }}</h2>
          <el-form-item label>
            <el-input
                type='text'
                auto-complete='off'
                :placeholder="$t('username_description')"
                v-model='username'
            ></el-input>
          </el-form-item>

          <el-form-item label>
            <el-input
                type='password'
                auto-complete='off'
                v-model='password'
                :placeholder="$t('password')"
            ></el-input>
          </el-form-item>

          <el-form-item label>
            <el-button
                :loading='loading'
                type='primary'
                style='width:100%;'
                @click='onSubmit'
            >
              {{ $t('login') }}
            </el-button>
          </el-form-item>

          <el-form-item label>
            <router-link to='/user/register'>{{
                $t('register_new_account')
              }}
            </router-link>
          </el-form-item>
        </el-form>
      </el-card>
    </el-container>

    <Footer></Footer>
  </div>
</template>

<script>
import { getToken, setToken } from '@/utils/auth'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      loading: false,
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      const that = this
      that.loading = true
      const url = DocConfig.server + '/api/user/login'
      const params = new URLSearchParams()
      params.append('username', this.username)
      params.append('password', this.password)

      that.axios.post(url, params).then(res => {
        if (res.code === 0) {
          setToken(res.data.accessToken, res.data.expiresIn)
          // localStorage.setItem('userinfo', JSON.stringify(response.data.data))
          let redirect = decodeURIComponent(
              that.$route.query.redirect || '/item/index'
          )
          that.$router.replace({
            path: redirect
          })
        }
      })
    }
  },
  mounted() {
    const that = this
    const token = getToken()
    if (token) {
      this.get_user_info(res => {
        if (res.code === 0) {
          let redirect = decodeURIComponent(
              that.$route.query.redirect || '/item/index'
          )
          that.$router.replace({
            path: redirect
          })
        }
      })
    }
  },
  watch: {
    $route(to, from) {
      this.$router.go(0)
    }
  },
  beforeDestroy() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center-card a {
  font-size: 12px;
}

.center-card {
  text-align: center;
}
</style>

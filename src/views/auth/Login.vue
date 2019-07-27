<template>
    <div class="container flex justify-center items-center fixed h-full">
        <div class="bg-indigo-500 h-2 fixed top-0 w-full"></div>
        <div class="w-full max-w-xs">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <el-form ref="form" :rules="rules" label-position="top" :model="form" label-width="80px" class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <el-form-item prop="username">
                        <el-input id="username" placeholder="请输入用户名" v-model="form.username"></el-input>
                    </el-form-item>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <el-form-item prop="password">
                        <el-input id="password" placeholder="请输入密码" v-model="form.password" show-password></el-input>
                    </el-form-item>

                    <div class="flex items-center justify-between">
                        <el-button :loading="loading" type="primary" @click="submitForm('form')">Sign In</el-button>
                        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                           href="#">
                            Forgot Password?
                        </a>
                    </div>

                </el-form>

            </div>
            <p class="text-center text-gray-500 text-xs">
                &copy;2019 https://github.com/zhouchang2017. All rights reserved.
            </p>

        </div>
    </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      const validateUsername = (rule, value, callback) => {
        if (!(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('请输入正确用户名(手机)'))
        } else {
          callback()
        }
      }
      return {
        form: {
          username: '18165789099',
          password: '123456'
        },
        rules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, min: 6, trigger: 'blur'}]
        },
        redirect: undefined,
        otherQuery: {},
        loading: false,
      }
    },

    watch: {
      $route: {
        handler: function (route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },

    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.form)
                .then(() => {
                  this.$router.push({path: this.redirect || '/', query: this.otherQuery})
                  this.loading = false
                })
                .catch(() => {
                  this.loading = false
                })
          } else {
            return false
          }
        })
      },

      getOtherQuery (query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }

    }
  }
</script>

<style scoped>

</style>
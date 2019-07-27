<template>
    <div class="flex flex-col">
        <h1 class="mb-3 text-90 font-normal text-2xl">{{ pageTitle }}</h1>
        <div class="bg-white overflow-hidden rounded-lg flex flex-col" v-loading="loading">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="c-form w-full">
                <el-form-item label="品牌名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" prop="avatar">
                    <el-input v-model="ruleForm.avatar"></el-input>
                </el-form-item>
                <el-form-item label="品牌说明" prop="description">
                    <el-input
                            type="textarea"
                            autosize
                            placeholder="请输入内容"
                            v-model="ruleForm.description">
                    </el-input>
                </el-form-item>

            </el-form>
            <div class="bg-30 flex items-center px-8 py-4">
                <span @click="$router.go(-1)" class="btn btn-link dim cursor-pointer text-80 ml-auto mr-6">
                    Cancel
                </span>
                <el-button @click="resetForm('ruleForm')" style="border-style:none;">重置</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                </div>
        </div>
    </div>
</template>

<script>
  import resourceInfo from './resource'

  export default {
    name: 'Create',
    mixins:[resourceInfo],
    data () {
      return {
        loading:false,
        ruleForm: {
          name: '',
          avatar: '',
          description: '',
        },
        rules: {
          name: [
            // {required: true, message: '请输入品牌编码', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.createResource(this.ruleForm).then(res=>{
              this.loading = false
            }).catch(err=>{

              // 处理后端表单验证错误信息
              const {data} = err.response

              this.$refs[formName].fields.forEach(item=>{
                 if(data.errors.hasOwnProperty(item.prop)){
                   let message = data.errors[item.prop]
                   if(message.length > 1){
                     message = message.json('/')
                   }else {
                     message = message[0]
                   }
                   item.validateMessage = message
                   item.validateState = 'error'
                   item.showMessage = true
                 }
              })

              this.loading = false
            })

          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
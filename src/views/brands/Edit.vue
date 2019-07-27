<template>
    <div class="flex flex-col">
        <h1 class="mb-3 text-90 font-normal text-2xl">{{ pageTitle }}</h1>
        <div class="bg-white overflow-hidden rounded-lg flex flex-col">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="c-form w-full">
                <el-form-item label="产品编码" prop="name">
                    <el-input v-model="ruleForm.code"></el-input>
                </el-form-item>
                <el-form-item label="产品价格" prop="region">
                    <el-input v-model="ruleForm.price"></el-input>
                </el-form-item>
                <el-form-item label="上市时间" required>
                    <el-date-picker
                            v-model="ruleForm.arrived_at"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

            </el-form>
            <div class="bg-30 flex items-center px-8 py-4">
                <span @click="$router.go(-1)" class="btn btn-link dim cursor-pointer text-80 ml-auto mr-6">
                    Cancel
                </span>
                <el-button @click="resetForm('ruleForm')" style="border-style:none;">重置</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>

            </div>
        </div>
    </div>
</template>

<script>
  import resourceInfo from './resource'
  export default {
    name: 'Edit',
    mixins:[resourceInfo],
    data () {
      return {
        ruleForm: {
          code: '',
          price: '',
          arrived_at: '',

        },
        rules: {
          name: [
            {required: true, message: '请输入产品编码', trigger: 'blur'},
          ],
          price: [
            {required: true, message: '请输入产品价格', trigger: 'blur'}
          ],
          arrived_at: [
            {type: 'date', required: true, message: '请选择产品上市日期', trigger: 'change'}
          ],
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
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
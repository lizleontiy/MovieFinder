<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    class="demo-ruleForm"
  >
    <el-form-item prop="search">
      <el-input
        placeholder="Search..."
        v-model="form.search"
        @keydown.enter.prevent="submitForm(formRef)"
      >
        <template #append>
          <el-button
            :icon="Search"
            @click="submitForm(formRef)"
          />
        </template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { Search } from '@element-plus/icons-vue'
  import { reactive, ref } from 'vue'
  import type { FormRules, FormInstance } from 'element-plus'

  interface SearchForm {
    search: string,
  }

  const form = ref<SearchForm>({
    search: ''
  })
  const formRef = ref<FormInstance>()
  const rules = reactive<FormRules<SearchForm>>({
    search: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' },
      { min: 3, message: 'Length should be more than 3', trigger: 'blur' },
    ],
  })
  
  const onSuccess = () => {
    return navigateTo({
      path: '/results',
      query: {
        search: form.value.search,
      }
  })
  }

  const submitForm = useSubmitForm(onSuccess)
</script>
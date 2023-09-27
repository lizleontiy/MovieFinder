<template>
  <ElForm
    ref="formRef"
    :model="form"
    :rules="rules"
    class="demo-ruleForm"
  >
    <ElFormItem prop="search">
      <ElInput
        v-model="form.search"
        placeholder="Search..."
        @keydown.enter.prevent="submitForm(formRef)"
      >
        <template #append>
          <ElButton
            :icon="Search"
            @click="submitForm(formRef)"
          />
        </template>
      </ElInput>
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
  import { Search } from '@element-plus/icons-vue'
  import { reactive, ref } from 'vue'
  import type { FormRules, FormInstance } from 'element-plus'
  import { SearchForm } from '@/types/Search'
  import { PAGE } from '@/utils/const'

  const form = ref<SearchForm>({
    search: ''
  })
  const formRef = ref<FormInstance>()
  const rules = reactive<FormRules<SearchForm>>({
    search: [
      { required: true, message: 'Please fill input', trigger: 'blur' },
      { min: 3, message: 'Length should be more than 3', trigger: 'blur' },
    ],
  })
  
  const onSuccess = () => {
    return navigateTo({
      path: PAGE.RESULTS,
      query: {
        search: form.value.search,
      }
    })
  }

  const submitForm = useSubmitForm(onSuccess)
</script>
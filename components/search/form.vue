<template>
  <ElForm
    ref="formRef"
    :model="localFormData"
    :rules="rules"
  >
    <ElFormItem prop="search">
      <ElInput
        v-model="localFormData.search"
        placeholder="Search..."
        @keydown.enter.prevent="validate"
      >
        <template #append>
          <ElButton
            :icon="Search"
            @click="validate"
          />
        </template>
      </ElInput>
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
  import { Search } from '@element-plus/icons-vue'
  import type { FormInstance } from 'element-plus'
  import { SearchFormData } from '@/types/Search'

  const props = defineProps<{
    form: { search: string },
  }>()

  const emit = defineEmits<{
    submit: [value: SearchFormData],
  }>()

  const localFormData = ref({ ...props.form })
  const formRef = ref<FormInstance>()
  const rules = useSearchFormValidation()

  watch(
    () => props.form,
    (val) => (localFormData.value = val),
    { deep: true }
  )

  const validate = async () => {
    const valid = await useValidateForm(formRef.value)
    if (!valid) {
      return
    }
    emit('submit', localFormData.value)
  }
</script>
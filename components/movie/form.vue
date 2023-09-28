<template>
  <ElForm
    ref="formRef"
    :model="localFormData"
    :rules="rules"
    class="demo-ruleForm"
    :label-position="'top'"
  >
    <ElFormItem
      prop="title"
      label="Title"
    >
      <ElInput
        v-model="localFormData.title"
      />
    </ElFormItem>
    <ElFormItem
      prop="year"
      label="Year"
    >
      <ElInput
        v-model.number="localFormData.year"
      />
    </ElFormItem>
    <ElFormItem
      prop="director"
      label="Director"
    >
      <ElInput
        v-model="localFormData.director"
      />
    </ElFormItem>
    <ElFormItem
      prop="poster"
      label="Poster"
    >
      <ElUpload
        ref="uploadRef"
        :limit="1"
        :auto-upload="false"
        :on-change="addPoster"
        :on-remove="handleRemove"
      >
        <template #trigger>
          <ElButton
            type="primary"
            text
            bg
          >
            select file
          </ElButton>
        </template>
      </ElUpload>
    </ElFormItem>
    <ElButton
      type="primary"
      size="large"
      @click="validate"
    >
      Create
    </ElButton>
  </ElForm>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { FormRules, FormInstance, UploadFile, UploadInstance } from 'element-plus'
  import { MovieFormData } from '@/types/MovieForm'
  import { posterValidator } from '@/utils/posterValidator'

  const props = defineProps<{
    form: MovieFormData<UploadFile>,
  }>()

  const emit = defineEmits<{
    submit: [value: MovieFormData<UploadFile>],
  }>()
  const localFormData = ref<MovieFormData<UploadFile>>({ ...props.form })
  const formRef = ref<FormInstance>()
  const uploadRef = ref<UploadInstance>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rules = reactive<FormRules<MovieFormData<any>>>({
    title: [
      { required: true, message: 'Please fill input', trigger: 'blur' },
      { min: 3, message: 'Length should be more than 3', trigger: 'blur' },
    ],
    year: [
      { required: true, message: 'Please fill input', trigger: 'blur' },
      { type: 'number', message: 'Year must be a number' },
    ],
    director: [
      { required: true, message: 'Please fill input', trigger: 'blur' },
    ],
    poster: [
      { validator: posterValidator, trigger: 'blur' },
    ],
  })

  watch(
    () => props.form,
    (val) => (localFormData.value = val),
    { deep: true }
  )

  const resetForm = () => {
    localFormData.value.title = ''
    localFormData.value.director = ''
    localFormData.value.year = ''
    localFormData.value.poster = {} as UploadFile
    uploadRef?.value?.clearFiles()
  }

  const addPoster = (e: UploadFile) => {
    localFormData.value.poster = e
  }

  const handleRemove = () => {
    localFormData.value.poster = {} as UploadFile
  }

  const validate = async () => {
    const valid = await useValidateForm(formRef.value)
    if (!valid) {
      return
    }
    resetForm()
    emit('submit', localFormData.value)
  }
</script>
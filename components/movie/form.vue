<template>
  <ElForm
    ref="formRef"
    :model="form"
    :rules="rules"
    class="demo-ruleForm"
    :label-position="'top'"
  >
    <ElFormItem
      prop="title"
      label="Title"
    >
      <ElInput
        v-model="form.title"
      />
    </ElFormItem>
    <ElFormItem
      prop="year"
      label="Year"
    >
      <ElInput
        v-model.number="form.year"
      />
    </ElFormItem>
    <ElFormItem
      prop="director"
      label="Director"
    >
      <ElInput
        v-model="form.director"
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
      @click="submitForm(formRef)"
    >
      Create
    </ElButton>
  </ElForm>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { FormRules, FormInstance, UploadFile, UploadInstance, ElNotification } from 'element-plus'
  import { MovieForm } from '@/types/MovieForm'
  import { posterValidator } from '@/utils/posterValidator'

  const form = ref<MovieForm<UploadFile>>({
    title: '',
    year: '',
    director: '',
    poster: {} as UploadFile,
  })
  const formRef = ref<FormInstance>()
  const uploadRef = ref<UploadInstance>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rules = reactive<FormRules<MovieForm<any>>>({
    title: [
      { required: true, message: 'Please fill input', trigger: 'blur' },
      { min: 3, message: 'Length should be more than 3', trigger: 'blur' },
    ],
    year: [
      { required: true, message: 'Please fill input', trigger: 'blur' },
      { type: 'number', message: 'Year must be a number' }
    ],
    director: [
      { required: true, message: 'Please fill input', trigger: 'blur' },
    ],
    poster: [
      { validator: posterValidator, trigger: 'blur' },
    ],
  })

  const resetForm = () => {
    form.value.title = ''
    form.value.director = ''
    form.value.year = ''
    form.value.poster = {} as UploadFile
    uploadRef?.value?.clearFiles()
  }

  const addPoster = (e: UploadFile) => {
    form.value.poster = e
  }

  const handleRemove = () => {
    form.value.poster = {} as UploadFile
  }

  const onSuccess = () => {
    resetForm()
    ElNotification.success({
      title: 'Info',
      message: 'Your movie was accepted!',
      showClose: false,
    })
  }

  const submitForm = useSubmitForm(onSuccess)
</script>
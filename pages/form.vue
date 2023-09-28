<template>
  <Head>
    <Title>Add Movie</Title>
  </Head>
  <ElRow
    :gutter="20"
    justify="center"
  >
    <ElCol
      :xs="24"
      :md="20"
      :lg="10"
      :xl="8"
    >
      <MovieCard>
        <MovieForm
          :form="form"
          @submit="handleSubmit"
        />
      </MovieCard>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
  import { UploadFile } from 'element-plus'
  import { MovieFormData } from '@/types/MovieForm'

  definePageMeta({
    layout: 'default',
  })

  const form = ref<MovieFormData<UploadFile>>({
    title: '',
    year: '',
    director: '',
    poster: {} as UploadFile,
  })

  const handleSubmit = () => {
    ElNotification.success({
      title: 'Info',
      message: 'Your movie was accepted!',
      showClose: false,
    })
  }
</script>
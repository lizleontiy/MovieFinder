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
      <MovieCard/>
    </ElCol>
  </ElRow>
</template>

<script setup>
  definePageMeta({
    layout: 'default'
  })
</script>
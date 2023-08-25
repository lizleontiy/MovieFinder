<template>
  <Head>
    <Title>MovieFinder</Title>
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
      <SearchPanel/>
    </ElCol>
  </ElRow>
</template>

<script setup>
  definePageMeta({
    layout: 'default'
  })
</script>


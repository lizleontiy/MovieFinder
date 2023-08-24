<template>
  <el-row
    :gutter="20"
    justify="center"
  >
    <el-col
      :xs="24"
      :md="20"
      :lg="10"
      :xl="8"
    >
      <SearchPanel/>
    </el-col>
  </el-row>
</template>

<script setup>
  definePageMeta({
    layout: 'default'
  })
</script>


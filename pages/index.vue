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
      <SearchPanel>
        <SearchForm
          :form="form"
          @submit="onSubmit"
        />
      </SearchPanel>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
  import { SearchFormData } from '@/types/Search'
  import { PAGE } from '@/utils/const'

  definePageMeta({
    layout: 'default',
  })

  const form = ref<SearchFormData>({
    search: '',
  })
  const onSubmit = (data: SearchFormData) => {
    return navigateTo({
      path: PAGE.RESULTS,
      query: {
        search: data.search,
      },
    })
  }
</script>


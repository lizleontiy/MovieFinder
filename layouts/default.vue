<template>
  <div>
    <ElContainer
      direction="vertical"
      :style="style"
    >
      <LayoutHeader/>
      <ElMain >
        <slot/>
      </ElMain>
      <LayoutFooter/>
    </ElContainer>
  </div>
</template>

<script setup>
  const style = {
    backgroundImage: 'url(/img/denise-jans-RM-5zzFsR2I-unsplash.jpg)'
  }
</script>
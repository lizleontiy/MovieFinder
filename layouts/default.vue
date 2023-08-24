<template>
  <div>
    <el-container
      direction="vertical"
      :style="style"
    >
      <LayoutHeader/>
      <ElMain >
        <slot/>
      </ElMain>
      <LayoutFooter/>
    </el-container>
  </div>
</template>

<script setup>

  const style = {
    backgroundImage: 'url(/img/denise-jans-RM-5zzFsR2I-unsplash.jpg)'
  }
</script>
<template>
  <span id="footer-title">{{ $t('title') }}</span>
</template>
<script>
export default {
  name: 'Footer',
}
</script>
<style lang="postcss" scoped>
#footer-title {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>
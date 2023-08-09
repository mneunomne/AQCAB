<template>
  <div>
    <span id="footer-title">{{ $t('title') }}</span>
    <span id="footer-contribute">{{ $t('contribute') }}</span>
  </div>
</template>
<script>
export default {
  name: 'Footer',
}
</script>
<style lang="postcss" scoped>
#footer-title {
  position: absolute;
  bottom: 50px;
  left: 50px;
}

#footer-contribute {
  position: absolute;
  bottom: 50px;
  right: 50px;
}
</style>
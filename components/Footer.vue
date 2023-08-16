<template>
  <div>
    <span id="footer-title">{{ $t('title') }}</span>
    <span :class="{ show: !getIsMenuOpen }" id="footer-contribute">{{
      $t('contribute')
    }}</span>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Footer',
  computed: {
    ...mapGetters({
      getIsMenuOpen: 'getIsMenuOpen'
    })
  },
}
</script>
<style lang="postcss" scoped>
#footer-title {
  position: absolute;
  bottom: 30px;
  left: 30px;
}

#footer-contribute {
  position: absolute;
  bottom: 30px;
  right: 30px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

#footer-contribute.show {
  opacity: 1;
  transition-delay: 0.5s;
}
</style>
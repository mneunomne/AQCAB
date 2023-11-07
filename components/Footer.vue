<template>
  <div>
    <span @click="onClickLogo" id="footer-title"
      >A<span class="queer">Q</span>CAB</span
    >
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
  methods: {
    onClickLogo() {
      this.$router.push({ path: this.localePath('/about') })
    }
  }
}
</script>
<style lang="postcss" scoped>
#footer-title {
  position: fixed;
  bottom: 30px;
  left: 30px;
  text-transform: uppercase;
  font-size: 1.6em;
}

#footer-contribute {
  position: fixed;
  font-weight: 500;
  bottom: 30px;
  right: 30px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

#footer-contribute.show {
  opacity: 1;
  transition-delay: 0.5s;
}

.queer {
  color: #ff00ff;
}
</style>
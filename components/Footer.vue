<template>
  <div class="footer">
    <div
      @click="onClickLogo"
      @mouseover="onMouseOverLogo"
      @mouseenter="onMouseOverLogo"
      @mouseleave="onMouseLeaveLogo"
      id="footer-title"
      class="logo"
      :class="{
        open:
          (open || $route.path.includes(localePath('/about'))) && !getIsMobile,
      }"
    >
      <span class="letter">A</span><span class="letters_hide">rchive of</span>
      <span class="letter pinkLetter">Q</span
      ><span class="letters_hide pinkLetter">ueer</span>
      <span class="letter">C</span><span class="letters_hide">ulture and</span>
      <span class="letter">A</span><span class="letters_hide">rt from</span>
      <span class="letter">B</span><span class="letters_hide">elarus</span>
    </div>

    <span :class="{ show: !getIsMenuOpen }" id="footer-contribute"
      ><a target="_blank" :href="getSiteInfo.contribute_form">{{
        $t('contribute')
      }}</a>
    </span>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Footer',
  data() {
    return {
      open: false,
      closeTimeout: null
    }
  },
  computed: {
    ...mapGetters({
      getIsMenuOpen: 'getIsMenuOpen',
      getSiteInfo: 'getSiteInfo',
      getIsMobile: 'getIsMobile'
    })
  },
  methods: {
    onClickLogo() {
      this.$router.push({ path: this.localePath('/about') })
    },
    onMouseOverLogo() {
      if (this.getIsMobile) return
      if (this.$route.path.includes(this.$nuxt.localePath('/about'))) return
      this.open = true
      if (this.closeTimeout) clearTimeout(this.closeTimeout)
    },
    onMouseLeaveLogo() {
      if (this.getIsMobile) return
      if (this.closeTimeout) clearTimeout(this.closeTimeout)
      this.closeTimeout = setTimeout(() => {
        if (this.$route.path.includes(this.$nuxt.localePath('/about'))) return
        this.open = false
      }, 500)
    }
  },
  watch: {
    $route(to, from) {
      if (to.path.includes(this.$nuxt.localePath('/about'))) return
      if (this.getIsMobile) return
      this.open = false
    }

  }
}
</script>
<style lang="postcss" scoped>
#footer-title {
  position: fixed;
  bottom: 27px;
  left: 30px;
  text-transform: uppercase;
  font-size: 1.6em;
  font-family: 'HauoraGX';
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#footer-contribute {
  position: fixed;
  font-weight: 500;
  bottom: 30px;
  right: 30px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

#footer-contribute a {
  color: var(--pink);
  text-decoration: none;
}

.cont.mobile #footer-contribute {
  bottom: 35px;
}

#footer-contribute.show {
  opacity: 1;
  transition-delay: 0.5s;
  pointer-events: all;
}

.pinkLetter {
  color: var(--pink);
}

.logo span {
  display: inline-block;
  font-variation-settings: 'wght' 400;
  cursor: pointer;
}

.letters_hide {
  color: transparent;
  transition: all 0.3s;
  text-transform: lowercase;
  letter-spacing: -0.5em;
  white-space: nowrap;
}

.logo.open span {
  font-variation-settings: 'wght' 500;
}

.logo.open .letters_hide {
  color: #000;
  width: auto;
  letter-spacing: 0;
}
.logo.open .letters_hide.pinkLetter {
  color: #ff00ff;
}
</style>
<template>
  <div class="menu">
    <div
      :class="{ active: getIsMenuOpen }"
      class="menu-toggle"
      @click="onClickMenuButton"
    >
      <span>{{ getIsMenuOpen ? $t('hide') : $t('menu') }} </span>
    </div>
    <nav class="nav" :class="{ closed: !getIsMenuOpen }">
      <ul class="side_menu">
        <li
          id="network-button"
          class="side_menu-btn grid-box"
          @click="goToRoute('/')"
        >
          <span
            class="btn"
            :class="{
              active:
                $route.path === localePath('/') ||
                $route.path.includes(localePath('/connections')),
            }"
            >{{ $t('network') }}</span
          >
        </li>
        <li
          id="blog-button"
          class="side_menu-btn grid-box"
          @click="goToRoute('/blog')"
        >
          <span
            class="btn"
            :class="{
              active: $route.path.includes(localePath('/blog')),
            }"
            >{{ $t('blog') }}</span
          >
        </li>
        <li id="timeline-button" class="side_menu-btn grid-box disabled">
          <span class="btn">{{ $t('timeline') }}</span>
        </li>
        <li class="small-btn-wrapper wrap-3">
          <div class="side_menu-btn btn-small grid-box">
            <nuxt-link class="btn" :to="switchLocalePath(locale)"
              ><span>{{ localeName }}</span></nuxt-link
            >
          </div>
          <div class="side_menu-btn btn-small grid-box">
            <a class="btn" :href="getSiteInfo.instagram" target="_blank"
              ><span>insta</span></a
            >
          </div>
          <div class="side_menu-btn btn-small grid-box">
            <a class="btn" :href="`mailto:${getSiteInfo.email}`" target="_blank"
              ><span>email</span></a
            >
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import BoxShape from '~/components/BoxShape.vue'

export default {
  name: 'Header',
  components: {
    BoxShape
  },
  data() {
    return {
      menuOpen: false,
    }
  },
  methods: {
    ...mapActions({
      toggleMenu: 'toggleMenu'
    }),
    onClickMenuButton() {
      console.log("onClickMenuButton")
      this.menuOpen = !this.menuOpen
      this.toggleMenu(this.menuOpen)
    },
    goToRoute(path) {
      console.log("goToRoute", path, this.$route)
      this.$nuxt.$router.push({ path: this.localePath(path) })
      // if path contains blog
    },
    onClickLangButton() {
      // go to locale path
      this.$nuxt.$router.push({ path: this.$nuxt.switchLocalePath(this.locale) })
      //this.$i18n.locale = this.locale
      //this.$nuxt.switchLocalePath()

    }
  },
  mounted() {
    console.log("getSiteInfo", this.getSiteInfo)
    if (!this.getIsMobile) {
      this.menuOpen = true
      this.toggleMenu(this.menuOpen)
    }
  },
  computed: {
    ...mapGetters({
      getIsMenuOpen: 'getIsMenuOpen',
      getIsMobile: 'getIsMobile',
      getSiteInfo: 'getSiteInfo',
    }),
    locale() {
      return this.$i18n.locale == 'en' ? 'be' : 'en'
    },
    localeName() {
      return this.$i18n.locale == 'en' ? 'бел' : 'eng'
    },
  },
  watch: {
    $route(to, from) {
      console.log("watch route", to, from)
      if (this.getIsMobile) {
        this.menuOpen = false
        this.toggleMenu(this.menuOpen)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.menu {
  position: fixed;
  pointer-events: none;
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--menu-width);
  padding-top: var(--margin-top);
  padding-right: var(--margin-side);
  z-index: 1;
}

.menu-toggle {
  position: absolute;
  padding: 20px;
  top: 10px;
  right: 27px;
  cursor: pointer;
  text-transform: lowercase;
}

.cont.mobile .menu-toggle {
  right: 39px;
}

.menu-toggle {
  font-weight: 500;
}

/*
.menu-toggle.active span {
  text-decoration: line-through;
}
*/

.toggle-button {
  position: relative;
  width: 100%;
  height: 100px;
  z-index: 10;
}
.toggle-button span {
  height: 100%;
  display: flex;
  padding: 20px 18px;
}
.nav.closed .side_menu-btn:not(.btn-small) {
  transform: translateX(500px);
}

.nav.closed .side_menu-btn.btn-small {
  transform: translateY(500px);
}

.nav,
.menu-toggle {
  pointer-events: all;
}

.nav.closed {
  pointer-events: none;
}

.side_menu {
  z-index: 9;
  width: 100%;
  display: inline-block;
}

.side_menu li {
  flex: 1 1 0%;
  height: var(--grid-height-1);
  margin-bottom: var(--grid-margin);
}

.side_menu-btn {
  cursor: pointer;
  transform: translateX(0px);
  transition: transform 0.3s ease-in-out;
  text-align: left;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.side_menu-btn.disabled {
  pointer-events: none;
  opacity: 0.5;
}

.side_menu-btn:not(.btn-small) {
  width: var(--menu-button-width);
}
.side_menu-btn.can-hide {
  position: absolute;
}

/* text inside button */
.side_menu-btn .btn {
  position: absolute;
  z-index: 10;
  height: 100%;
  width: 100%;
  padding: var(--block-padding);
  display: block;
  text-align: left;
  background: transparent;
}

.btn.active {
  text-decoration: underline;
}

.btn-small {
  position: relative;
  display: inline-block;
}

.btn-small .btn {
  font-size: 14px;
  display: flex;
  justify-content: center;
  padding: 0;
  align-items: center;
}

.small-btn-wrapper {
  display: grid;
  grid-gap: 20px;
  height: var(--small-menu-button-height) !important;
}

.wrap-3 {
  grid-template-columns: repeat(3, 1fr);
  height: auto;
}

.wrap-2 {
  grid-template-columns: repeat(2, 1fr);
}

/* open */

.nav.closed .side_menu li:nth-child(1) {
  transition-delay: 0.45s;
}
.nav.closed .side_menu li:nth-child(2) {
  transition-delay: 0.35s;
}
.nav.closed .side_menu li:nth-child(3) {
  transition-delay: 0.25s;
}

/* closed */

.nav .side_menu li:nth-child(1) {
  transition-delay: 0.05s;
}
.nav .side_menu li:nth-child(2) {
  transition-delay: 0.15s;
}
.nav .side_menu li:nth-child(3) {
  transition-delay: 0.25s;
}

.small-btn-wrapper .btn-small:nth-child(1) {
  transition-delay: 0.05s;
}
.small-btn-wrapper .btn-small:nth-child(2) {
  transition-delay: 0.15s;
}
.small-btn-wrapper .btn-small:nth-child(3) {
  transition-delay: 0.25s;
}
</style>

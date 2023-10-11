<template>
  <div class="menu">
    <nav class="nav" :class="{ closed: !getIsMenuOpen }">
      <ul class="side_menu">
        <li class="side_menu-btn btn-fixed" @click="onClickMenuButton">
          <a class="btn" href="#">
            <span>{{ getIsMenuOpen ? $t('hide') : $t('menu') }} </span>
          </a>
          <BoxShape />
        </li>
        <li class="side_menu-btn" @click="goToRoute('/')">
          <nuxt-link class="btn" :to="localePath('/')">{{
            $t('home')
          }}</nuxt-link>
          <BoxShape />
        </li>
        <li class="side_menu-btn" @click="goToRoute('/blog')">
          <nuxt-link class="btn" :to="localePath('/blog')">{{
            $t('blog')
          }}</nuxt-link>
          <BoxShape />
        </li>
        <li class="side_menu-btn" @click="goToRoute('/about')">
          <nuxt-link class="btn" :to="localePath('/about')">{{
            $t('about')
          }}</nuxt-link>
          <BoxShape />
        </li>
        <li class="small-btn-wrapper wrap-3">
          <div class="side_menu-btn btn-small">
            <a class="btn" target="_blank"><span>insta</span></a>
            <BoxShape />
          </div>
          <div class="side_menu-btn btn-small">
            <a class="btn" target="_blank"><span>email</span></a>
            <BoxShape />
          </div>
          <div class="side_menu-btn btn-small">
            <nuxt-link class="btn" :to="switchLocalePath(locale)"
              ><span>{{ localeName }}</span></nuxt-link
            >
            <BoxShape />
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
      this.$router.push({ path: this.localePath(path) })
    }
  },
  computed: {
    ...mapGetters({
      getIsMenuOpen: 'getIsMenuOpen'
    }),
    locale() {
      return this.$i18n.locale == 'en' ? 'be' : 'en'
    },
    localeName() {
      return this.$i18n.locale == 'en' ? 'бел' : 'eng'
    },
  },
}
</script>

<style lang="postcss" scoped>
.menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 270px;
  padding-top: var(--margin-top);
  padding-right: var(--margin-side);
  z-index: 1;
}

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
.nav.closed .side_menu-btn:not(.btn-fixed) {
  transform: translateX(300px);
}

.side_menu {
  z-index: 9;
  width: 100%;
  display: inline-block;
}

.side_menu li {
  flex: 1 1 0%;
  height: var(--grid-height);
  margin-bottom: var(--grid-margin);
}

.side_menu-btn {
  cursor: pointer;
  transform: translateX(0px);
  transition: transform 0.3s ease-in-out;
  text-align: left;
}

/* text inside button */
.side_menu-btn .btn {
  position: absolute;
  z-index: 10;
  height: 100%;
  width: 100%;
  padding-top: 20px;
  display: block;
  padding-left: 20px;
  text-align: left;
  background: transparent;
  pointer-events: none;
}

.btn-small {
  position: relative;
  display: inline-block;
  height: 70px;
  .btn {
    font-size: 14px;
    display: flex;
    justify-content: center;
    padding: 0;
    align-items: center;
  }
}

.small-btn-wrapper {
  display: grid;
  grid-gap: 20px;
  height: auto;
}

.wrap-3 {
  grid-template-columns: repeat(3, 1fr);
  height: auto !important;
  padding-bottom: 20px;
}

.wrap-2 {
  grid-template-columns: repeat(2, 1fr);
}

/* open */

.nav.closed .side_menu li:nth-child(2) {
  transition-delay: 0.45s;
}
.nav.closed .side_menu li:nth-child(3) {
  transition-delay: 0.35s;
}
.nav.closed .side_menu li:nth-child(4) {
  transition-delay: 0.25s;
}
.nav.closed .side_menu li:nth-child(5) {
  transition-delay: 0.15s;
}
.nav.closed .side_menu li:nth-child(6) {
  transition-delay: 0.05s;
}

/* closed */

.nav .side_menu li:nth-child(2) {
  transition-delay: 0.05s;
}
.nav .side_menu li:nth-child(3) {
  transition-delay: 0.15s;
}
.nav .side_menu li:nth-child(4) {
  transition-delay: 0.25s;
}
.nav .side_menu li:nth-child(5) {
  transition-delay: 0.35s;
}
.nav .side_menu li:nth-child(6) {
  transition-delay: 0.45s;
}
</style>

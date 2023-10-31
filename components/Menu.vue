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
        <li id="network-button" class="side_menu-btn" @click="goToRoute('/')">
          <span
            class="btn"
            :class="{
              active:
                $route.path === localePath('/') ||
                $route.path.includes(localePath('/connections')),
            }"
            >{{ $t('network') }}</span
          >
          <BoxShape
            :boxId="'network_btn'"
            :interactOnHover="true"
            :active="
              $route.path === localePath('/') ||
              $route.path.includes(localePath('/connections'))
            "
          />
        </li>
        <li id="blog-button" class="side_menu-btn" @click="goToRoute('/blog')">
          <span
            class="btn"
            :class="{
              active: $route.path.includes(localePath('/blog')),
            }"
            >{{ $t('blog') }}</span
          >
          <BoxShape
            :boxId="'blog_btn'"
            :interactOnHover="true"
            :active="$route.path.includes(localePath('/blog'))"
          />
        </li>
        <li id="timeline-button" class="side_menu-btn disabled">
          <span class="btn">{{ $t('timeline') }}</span>
          <BoxShape :boxId="'timeline_btn'" :interactOnHover="true" />
        </li>
        <li class="small-btn-wrapper wrap-3">
          <div class="side_menu-btn btn-small" @click="onClickLangButton">
            <nuxt-link class="btn" :to="switchLocalePath(locale)"
              ><span>{{ localeName }}</span></nuxt-link
            >
            <BoxShape :boxId="'lang_btn'" :interactOnHover="true" />
          </div>
          <div class="side_menu-btn btn-small">
            <a class="btn" target="_blank"><span>insta</span></a>
            <BoxShape :boxId="'insta_btn'" :interactOnHover="true" />
          </div>
          <div class="side_menu-btn btn-small">
            <a class="btn" target="_blank"><span>email</span></a>
            <BoxShape :boxId="'email_btn'" :interactOnHover="true" />
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
      menuOpen: true,
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
      console.log("onClickLangButton", this.locale, this.$nuxt.switchLocalePath(this.locale))
      this.$nuxt.$router.push({ path: this.$nuxt.switchLocalePath(this.locale) })
      //this.$i18n.locale = this.locale
      //this.$nuxt.switchLocalePath()

    }
  },
  computed: {
    ...mapGetters({
      getIsMenuOpen: 'getIsMenuOpen'
    }),
    mounted() {
      console.log("mounted", this.routeName)
    },
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
  width: var(--menu-width);
  padding-top: var(--margin-top);
  padding-right: var(--margin-side);
  z-index: 1;
}

.menu-toggle {
  position: absolute;
  top: 30px;
  right: 50px;
  cursor: pointer;
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
  transform: translateX(300px);
}

.nav.closed .side_menu-btn.btn-small {
  transform: translateY(300px);
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
  pointer-events: none;
}

.btn.active {
  text-decoration: underline;
}

.btn-small {
  position: relative;
  display: inline-block;
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

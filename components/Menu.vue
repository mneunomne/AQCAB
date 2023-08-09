<template>
  <div class="menu">
    <!-- toggle button -->
    <button class="toggle-button">
      <span class="card block" @click="toggleMenu"
        >{{ menuOpen ? $t('hide') : $t('menu') }}
      </span>
    </button>
    <nav class="nav" :class="{ closed: !menuOpen }">
      <ul class="side_menu">
        <li class="side_menu-btn">
          <nuxt-link class="btn card" to="/">{{ $t('home') }}</nuxt-link>
        </li>
        <li class="side_menu-btn">
          <nuxt-link class="btn card" to="/blog">{{ $t('blog') }}</nuxt-link>
        </li>
        <li class="side_menu-btn">
          <nuxt-link class="btn card" to="/about">{{ $t('about') }}</nuxt-link>
        </li>
        <li class="small-btn-wrapper wrap-3">
          <div class="side_menu-btn btn-small">
            <a class="btn card" target="_blank"><span>insta</span></a>
          </div>
          <div class="side_menu-btn btn-small">
            <a class="btn card" target="_blank"><span>email</span></a>
          </div>
          <div class="side_menu-btn btn-small">
            <nuxt-link class="btn card" :to="switchLocalePath(locale)"
              ><span>{{ locale }}</span></nuxt-link
            >
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      menuOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
  },
  computed: {
    locale() {
      return this.$i18n.locale == 'en' ? 'be' : 'en'
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
  padding-top: 20px;
  padding-right: 20px;
  overflow: auto;
}
.toggle-button {
  width: 100%;
  height: 100px;
  z-index: 10;
}
.toggle-button span {
  height: 100%;
  display: flex;
  padding: 20px 18px;
}
.nav.closed .side_menu li {
  transform: translateX(300px);
}

.side_menu {
  z-index: 9;
  width: 100%;
  display: inline-block;
}
.side_menu li {
  flex: 1 1 0%;
  height: 230px;
  padding-top: 20px;
  transform: translateX(0px);
  transition: transform 0.3s ease-in-out;
  text-align: left;
}

.side_menu-btn .btn {
  height: 100%;
  padding-top: 20px;
  display: block;
  padding-left: 20px;
  text-align: left;
}

.btn-small {
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

.nav.closed .side_menu li:nth-child(1) {
  transition-delay: 0.45s;
}
.nav.closed .side_menu li:nth-child(2) {
  transition-delay: 0.35s;
}
.nav.closed .side_menu li:nth-child(3) {
  transition-delay: 0.25s;
}
.nav.closed .side_menu li:nth-child(4) {
  transition-delay: 0.15s;
}
.nav.closed .side_menu li:nth-child(5) {
  transition-delay: 0.05s;
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
.nav .side_menu li:nth-child(4) {
  transition-delay: 0.35s;
}
.nav .side_menu li:nth-child(5) {
  transition-delay: 0.45s;
}
</style>

<template>
  <div class="menu">
    <!-- toggle button -->
    <button class="toggle-button">
      <span class="card block" @click="toggleMenu"
        >{{ menuOpen ? 'X' : $t('menu') }}
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
        <li class="side_menu-btn">
          <nuxt-link class="btn card" to="/connections">Connections</nuxt-link>
        </li>
        <li class="small-btn-wrapper wrap-2">
          <div class="side_menu-btn btn-small">
            <nuxt-link class="btn card" :to="switchLocalePath('en')"
              >english</nuxt-link
            >
          </div>
          <div class="side_menu-btn btn-small">
            <nuxt-link class="btn card" :to="switchLocalePath('be')"
              >belarussian</nuxt-link
            >
          </div>
        </li>
        <li class="small-btn-wrapper wrap-3">
          <div class="side_menu-btn btn-small">
            <a class="btn card" target="_blank" href="#">insta</a>
          </div>
          <div class="side_menu-btn btn-small">
            <a class="btn card" target="_blank" href="#">email</a>
          </div>
          <div class="side_menu-btn btn-small">
            <a class="btn card" target="_blank" href="#">vimeo</a>
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
}
</script>

<style lang="postcss" scoped>
.menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
}
.toggle-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 200px;
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
  position: absolute;
  right: 20px;
  top: 140px;
  bottom: 0;
  width: 200px;
  display: grid;
}
.side_menu li {
  flex: 1 1 0%;
  height: 100%;
  padding-bottom: 20px;
  transform: translateX(0px);
  transition: transform 0.3s ease-in-out;
}

.side_menu li:nth-child(1) {
  transition-delay: 0.05s;
}
.side_menu li:nth-child(2) {
  transition-delay: 0.15s;
}
.side_menu li:nth-child(3) {
  transition-delay: 0.25s;
}
.side_menu li:nth-child(4) {
  transition-delay: 0.35s;
}
.side_menu li:nth-child(5) {
  transition-delay: 0.45s;
}

.side_menu-btn .btn {
  height: 100%;
  padding-top: 20px;
  display: block;
}

.btn-small {
  display: inline-block;
}

.small-btn-wrapper {
  display: grid;
  grid-gap: 20px;
}

.wrap-3 {
  grid-template-columns: repeat(3, 1fr);
}

.wrap-2 {
  grid-template-columns: repeat(2, 1fr);
}
</style>

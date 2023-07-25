<template>
  <nav class="">
    <ul class="side_menu">
      <li class="side_menu-btn">
        <nuxt-link class="btn block" to="/">Home</nuxt-link>
      </li>
      <li class="side_menu-btn">
        <nuxt-link class="btn block" to="/blog">Blog</nuxt-link>
      </li>
      <li class="side_menu-btn">
        <nuxt-link class="btn block" to="/projects">Projects</nuxt-link>
      </li>
      <li class="side_menu-btn">
        <nuxt-link class="btn block" to="/connections">Connections</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="postcss" scoped>
.side_menu {
  z-index: 9;
  position: fixed;
  right: 20px;
  top: 20px;
  bottom: 0;
  width: 200px;
  display: grid;
}
.side_menu-btn {
  flex: 1 1 0%;
  height: 100%;
  padding-bottom: 20px;
}

.side_menu-btn .btn {
  height: 100%;
  transition: background-color 0.2s ease 0s;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding-top: 20px;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>

<template>
  <div class="main">
    <!-- <logo /> -->
    <h1 class="title">DOTYK</h1>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  // components: {
  //   Logo
  // },
  head() {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
    }
  },
}
</script>
<style scoped lang="postcss">
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  place-items: center;
  .title {
    z-index: 1;
  }
}
</style>
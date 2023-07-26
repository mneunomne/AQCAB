<template>
  <div class="container">
    <Header />
    <Footer />
    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/general/Header.vue'
import Footer from '~/components/general/Footer.vue'

export default {
  components: {
    Header,
    Footer,
  },
}
</script>

<template>
  <div class="container">
    <ConnectionsGraph v-if="connections" :data="connections" />
    <Menu />
    <div class="main">
      <Footer />
      <nuxt />
    </div>
  </div>
</template>

<script>
import Menu from '~/components/Menu.vue'
import Footer from '~/components/Footer.vue'
import ConnectionsGraph from '~/components/ConnectionsGraph.vue'

export default {
  components: {
    Menu,
    Footer,
    ConnectionsGraph,
  },
  computed: {
    connections() {
      return this.$store.state.connections
    },
  },
}
</script>

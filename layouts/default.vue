<template>
  <div class="container">
    <ConnectionsGraph v-if="connections" :data="connections" />
    <Header />
    <Footer />
    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/Menu.vue'
import Footer from '~/components/Footer.vue'
import ConnectionsGraph from '~/components/ConnectionsGraph.vue'

export default {
  components: {
    Header,
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

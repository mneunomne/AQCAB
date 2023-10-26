<template>
  <div class="container">
    <ConnectionsGraph v-if="connections" :data="connections" />
    <Menu />
    <div class="main">
      <Footer />
      <nuxt />
    </div>
    <Shapes />
  </div>
</template>

<script>
import Menu from '~/components/Menu.vue'
import Footer from '~/components/Footer.vue'
import ConnectionsGraph from '~/components/ConnectionsGraph.vue'
import BoxShape from '~/components/BoxShape.vue'
import Shapes from '~/components/Shapes.vue'

export default {
  components: {
    Menu,
    Footer,
    ConnectionsGraph,
    BoxShape,
    Shapes
  },
  computed: {
    connections() {
      return this.$store.state.connections
    },
  },
}
</script>

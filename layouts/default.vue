<template>
  <div class="container">
    <div class="wrapper" :class="{ loading: loading }">
      <ConnectionsGraph
        v-if="connections"
        :data="connections"
        @loaded="onGraphLoaded"
      />
      <Menu />
      <div class="main">
        <Footer />
        <nuxt />
      </div>
      <Shapes />
    </div>
    <div class="load-icon" v-show="loading"><span>loading</span></div>
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
  data() {
    return {
      loading: true
    }
  },
  methods: {
    onGraphLoaded() {
      console.log("onGraphLoaded")
      this.loading = false
    }
  },
}
</script>
<style scoped>
.wrapper {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.wrapper.loading {
  opacity: 0;
}

.load-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
}
</style>
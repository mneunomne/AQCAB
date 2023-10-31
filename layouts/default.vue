<template>
  <div class="cont" :class="{ menuClosed: !getIsMenuOpen }">
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
import { mapGetters } from 'vuex'

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
    ...mapGetters({
      getIsMenuOpen: 'getIsMenuOpen'
    }),
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
.cont.menuClosed {
  transition: all 0.25s 0.5s;
  width: 100%;
}

@keyframes grow-width {
  0% {
    width: var(--cont-width);
  }
  50% {
    width: var(--cont-width);
  }
  100% {
    width: 100%;
  }
}

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
<template>
  <div
    id="main-container"
    class="cont"
    :class="{ menuClosed: !getIsMenuOpen, mobile: getIsMobile }"
  >
    <div class="wrapper" :class="{ loading: loading }">
      <ConnectionsGraph
        v-if="connections"
        :data="connections"
        @loaded="onGraphLoaded"
      />
      <Menu />
      <div class="main" :class="{ menuOpen: getIsMenuOpen && getIsMobile }">
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
import { mapGetters, mapActions } from 'vuex'

const mobileWidth = 600


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
      getIsMenuOpen: 'getIsMenuOpen',
      getIsMobile: 'getIsMobile'
    }),
  },
  data() {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions({
      setIsMobile: 'setIsMobile',
      toggleMenu: 'toggleMenu'
    }),
    onGraphLoaded() {
      console.log("onGraphLoaded")
      this.loading = false
    }
  },
  created() {
    if (process.client) {
      this.setIsMobile(window.innerWidth < 768)
      window.addEventListener('resize', (evt) => {
        console.log("resize", window.innerWidth)
        this.windowHeight = window.innerHeight
        this.setIsMobile(window.innerWidth < 768)
        // this.postHeight = this.$refs.postContainerthis.$refs.postContainer?.offsetHeight
      })
    }
  }
}
</script>
<style scoped>
.cont.menuClosed:not(.mobile) {
  transition: all 0.25s 0.5s;
  width: 100%;
  padding-right: 10px;
}

.cont.mobile .main > *:not(.footer) {
  transition: transform 0.5s;
  transform: translateX(0);
  transition-delay: 0.5s;
}

.cont.mobile .main.menuOpen > *:not(.footer) {
  transform: translateX(calc(-1 * var(--menu-width)));
  transition-delay: 0s;
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
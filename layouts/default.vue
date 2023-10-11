<template>
  <div class="container">
    <ConnectionsGraph v-if="connections" :data="connections" />
    <Menu />
    <div class="main">
      <Footer />
      <nuxt />
    </div>
    <div id="ref-svg" style="display: none">
      <svg
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="100"
        xmlns="http://www.w3.org/2000/svg"
        height="100"
        id="screenshot-7a682ccd-6dce-80b8-8003-3399c0cf2987"
        viewBox="0 0 100 100"
        style="-webkit-print-color-adjust: exact"
        fill="none"
        version="1.1"
      >
        <g id="shape-7a682ccd-6dce-80b8-8003-3399c0cf2987">
          <g class="fills" id="fills-7a682ccd-6dce-80b8-8003-3399c0cf2987">
            <path
              id="target"
              d="M0,0 L100,0 L100,100 L0,100 Z"
              style="fill: rgb(0, 0, 0); fill-opacity: 1"
            />
            <path
              id="shape_1"
              d="M7.458,40.481L0.000,12.489L14.237,27.131L15.932,5.598L32.203,13.350L38.644,0.000L81.356,16.365L61.695,16.795L100.000,37.466L68.814,37.036L68.814,71.057L77.966,58.138C77.966,58.138,101.017,90.867,71.186,98.188C41.356,105.509,41.356,88.283,41.356,88.283L12.203,93.020C12.203,93.020,48.136,74.502,18.305,71.488C-11.525,68.473,7.458,40.481,7.458,40.481Z"
              style="fill: rgb(0, 0, 0); fill-opacity: 1; visibility: hidden"
            />
            <path
              id="rectangle"
              d="M0,0 L100,0 L100,100 L0,100 Z"
              style="fill: rgb(0, 0, 0); fill-opacity: 1; visibility: hidden"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import Menu from '~/components/Menu.vue'
import Footer from '~/components/Footer.vue'
import ConnectionsGraph from '~/components/ConnectionsGraph.vue'
import BoxShape from '~/components/BoxShape.vue'


export default {
  components: {
    Menu,
    Footer,
    ConnectionsGraph,
    BoxShape
  },
  computed: {
    connections() {
      return this.$store.state.connections
    },
  },
}
</script>

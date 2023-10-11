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
              id="shape_2"
              d="M100 0.599976L84.9246 12.1578L100 51.8563L73.8693 44.8211V62.9115L100 59.8965V100.6L80.402 85.0221L68.8442 100.6L51.7588 75.4743V100.6H15.5779L35.1759 87.5347C23.4506 86.0271 0 74.1678 0 38.7909C0 3.41405 31.4908 10.9852 47.2362 19.1929L37.6884 0.599976H100Z"
              style="fill: rgb(0, 0, 0); fill-opacity: 1; visibility: hidden"
            />

            <path
              id="shape_3"
              d="M41.5 26.8626L26 0.599976L61.5 21.8121V0.599976H87L82 18.7818L100 0.599976V39.4889H71.5L100 58.1757H83C68.5 58.1757 53.5 73.3272 100 90.499C64 113.226 50.8333 91.3407 41.5 83.4283L0 100.6L18.5 75.3475L0 65.2464L22 41.5091L0 49.0848L16.5 32.4182H0V0.599976L41.5 26.8626Z"
              style="fill: rgb(0, 0, 0); fill-opacity: 1; visibility: hidden"
            />

            <path
              id="shape_4"
              d="M12 0C40.9 29.0446 0 25.6276 0 25.6276C0 42.1097 2.00003 73.2649 20.5 64.2198C-11.5 100.902 34.5 99.998 49 99.998C35 95.375 26.4 89.9479 72 92.3599C117.6 94.772 83.4 75.2749 72 75.2749V58.6923C72 58.6923 94.6667 64.3203 100 76.3804V0L85.1 23.0146L68 0L59 9.44701L49 0L39.5 9.44701L12 0Z"
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

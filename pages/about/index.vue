<template>
  <div id="about">
    <svg
      width="100"
      height="100"
      id="screenshot-7a682ccd-6dce-80b8-8003-3399c0cf2987"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style="-webkit-print-color-adjust: exact"
      fill="none"
      version="1.1"
    >
      <g id="shape-7a682ccd-6dce-80b8-8003-3399c0cf2987">
        <g class="fills" id="fills-7a682ccd-6dce-80b8-8003-3399c0cf2987">
          <path
            id="shape_1"
            filter="url(#inset-shadow)"
            d="M7.458,40.481L0.000,12.489L14.237,27.131L15.932,5.598L32.203,13.350L38.644,0.000L81.356,16.365L61.695,16.795L100.000,37.466L68.814,37.036L68.814,71.057L77.966,58.138C77.966,58.138,101.017,90.867,71.186,98.188C41.356,105.509,41.356,88.283,41.356,88.283L12.203,93.020C12.203,93.020,48.136,74.502,18.305,71.488C-11.525,68.473,7.458,40.481,7.458,40.481Z"
            style="fill-opacity: 1"
            fill="#5D75E0"
          />
        </g>
      </g>
    </svg>

    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="100"
      xmlns="http://www.w3.org/2000/svg"
      height="100"
      id="screenshot-7a682ccd-6dce-80b8-8003-3399c0cf2987"
      viewBox="0 0 100 100"
      fill="none"
      style="-webkit-print-color-adjust: exact"
      version="1.1"
    >
      <filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feComponentTransfer in="SourceAlpha">
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feGaussianBlur stdDeviation="14" />
        <feOffset dx="0" dy="0" result="offsetblur" />
        <feFlood flood-color="rgb(0, 0, 0, 1)" result="color" />
        <feComposite in2="offsetblur" operator="in" />
        <feComposite in2="SourceAlpha" operator="in" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode />
        </feMerge>
      </filter>
    </svg>
  </div>
</template>
<script>
export default {
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString(process.env.lang) || ''
    }
  }
}
</script>

<style lang="postcss" scoped>
#about {
  display: contents;
}

#about svg {
  width: 100%;
  height: 100%;
  backdrop-filter: opacity(1);
  opacity: 0.85;
}
</style>
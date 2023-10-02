<template>
  <div class="box_shape" :id="`box_shape_${id}`" :class="{ effect }">
    <div class="color_mask"></div>
    <svg
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
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
            :id="`target_${this.id}`"
            d="M0,0 L100,0 L100,100 L0,100 Z"
            style="fill-opacity: 1"
          />
        </g>
      </g>
    </svg>
  </div>
</template>
<script>
// import kute.js library
import KUTE from 'kute.js'

export default {
  name: "BoxShape",
  data() {
    return {
      timeout: null,
      id: 0,
      width: 100,
      height: 100,
      effect: false
    }
  },
  mounted() {
    this.id = parseInt(Math.random() * 100)
    console.log("KUTE", KUTE)

    // write a simple tween object
    // var tween = KUTE.fromTo('#target', { path: '#rectangle' }, { path: '#shape_1' }).start();

    /*
    // trigger it whenever you want
    document.getElementById('wrapper').onclick = function () {
      !tween.playing && tween.start();
    }
    */


  },
  methods: {
    onMouseEnter() {
      this.effect = true
      console.log("onMouseEnter", `#target_${this.id}`)
      var tween = KUTE.fromTo(`#target_${this.id}`, { path: '#rectangle' }, { path: '#shape_1' }, { duration: 500, easing: 'easingCubicInOut' }).start();
      console.log("tween", tween)
    },
    onMouseLeave() {
      this.effect = false
      var tween = KUTE.fromTo(`#target_${this.id}`, { path: '#shape_1' }, { path: '#rectangle' }).start();
    }
  }
}
</script>
<style>
.box_shape {
  width: 100%;
  position: absolute;
  height: 100%;
}

.box_shape.effect {
  fill: rgba(255, 0, 0, 0.5);
}

.box_shape svg {
  width: 100%;
  height: 100%;
}

.color_mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: red;
}

.box_shape svg path {
  transition: fill 0.5s;
  fill: rgba(220, 220, 220, 0.5);
}
</style>
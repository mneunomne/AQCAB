<template>
  <div
    class="box_shape"
    :id="`box_shape_${boxId}`"
    :class="{
      color: isShape,
      buttonDown: isButtonDown,
      onHoverOnly: !interactOnHover,
    }"
  >
    <svg
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
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
            filter="url(#inset-shadow)"
            :id="`target_${boxId}`"
            d="M0,0 L100,0 L100,100 L0,100 Z"
            style="fill-opacity: 1"
            :fill="color"
          />
        </g>
      </g>
    </svg>
  </div>
</template>
<script>
// import kute.js library
import KUTE from 'kute.js'
import { colors, menuColors } from '~/utils/globals'

export default {
  name: "BoxShape",
  props: {
    interactOnHover: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    boxId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      waitTimeout: null,
      animationTimeout: null,
      width: 100,
      height: 100,
      isShape: false,
      isRectangle: true,
      shapeAnimation: null,
      rectAnimation: null,
      animating: false,
      animationDuration: 500,
      waitDuration: 1000,
      color: null,
      shape_idx: 0,
      isButtonDown: false,
      numShapes: 9,
      hasInitiated: false
    }
  },
  mounted() {
    if (this.interactOnHover) {
      this.init();
    }
  },
  methods: {
    init() {
      this.hasInitiated = true
      this.color = this.randomColor()
      this.shape_idx = parseInt(Math.random() * this.numShapes) + 1
      // wait for dom to be rendered
      // animation to become shape
      this.shapeAnimation = KUTE.fromTo(
        `#target_${this.boxId}`,
        { path: '#rectangle' },
        { path: '#shape_' + this.shape_idx },
        { duration: this.animationDuration, easing: 'easingCubicInOut', morphPrecision: 2 }
      )
      // animation to become rectangle
      this.rectAnimation = KUTE.fromTo(
        `#target_${this.boxId}`,
        { path: '#shape_' + this.shape_idx },
        { path: '#rectangle' },
        { duration: this.animationDuration, easing: 'easingCubicInOut', morphPrecision: 2 }
      )
    },
    onMouseEnter() {
      if (!this.interactOnHover) {
        this.color = this.randomColor()
        return;
      } else {
        this.enterAnimation()
      }
    },
    onMouseLeave() {
      if (!this.interactOnHover) {
        return;
      } else {
        this.leaveAnimation();
      }
    },
    onMouseDown() {
      this.isButtonDown = true
    },
    onMouseUp() {
      this.isButtonDown = false
    },

    setToShape() {
      this.isRectangle = false
      this.isShape = true
      this.animating = true
      this.shapeAnimation.start();
      this.animationTimeout = setTimeout(() => {
        this.animating = false
      }, this.duration)
      /*
      if (this.waitTimeout) clearTimeout(this.waitTimeout)
      this.waitTimeout = setTimeout(() => {
        this.setToRect()
      }, this.waitDuration)
      */
    },
    enterAnimation() {
      // if its animating... dont do anything
      if (this.animating || this.isShape || !this.hasInitiated) {
        return
      }

      if (this.isShape) {
        if (this.waitTimeout) clearTimeout(this.waitTimeout)
        this.waitTimeout = setTimeout(() => {
          this.setToRect()
        }, this.waitDuration)
      }

      // if its rectangle...
      if (this.isRectangle) {
        // reset time to go back to rectangle
        this.setToShape()
      }
    },
    leaveAnimation() {
      if (!this.interactOnHover) {
        return;
      }
      // if its animating... dont do anything
      if (this.animating) {
        return
      }

      if (this.isShape) {
        if (this.waitTimeout) clearTimeout(this.waitTimeout)
        this.waitTimeout = setTimeout(() => {
          // if (!this.active) {
          this.setToRect()
          //}
        }, this.waitDuration)
      }
    },

    setToRect() {
      this.isShape = false
      this.isRectangle = true
      this.animating = true
      this.rectAnimation.start();
      this.animationTimeout = setTimeout(() => {
        this.animating = false
        this.color = this.randomColor()
      }, this.duration)
    },
    randomColor() {
      return menuColors[Math.floor(Math.random() * menuColors.length)]
    },
  },
  /*
  watch: {
    active(val) {
      if (!val) {
        this.setToRect()
      } else {
        if (!this.isShape) {
          if (this.waitTimeout) clearTimeout(this.waitTimeout)
          this.setToShape()
        }
      }
    }
  }
  */
}
</script>
<style>
.box_shape {
  width: 100%;
  position: absolute;
  top: 0;
  height: 100%;
  /*filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.25));*/
  opacity: 0.5;
  transition: opacity 0.25s;
}

.box_shape.effect {
  fill: rgba(255, 0, 0, 0.5);
}

.box_shape svg {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.color_mask {
  position: absolute;
  width: 100%;
  height: 100%;
  /*background: red;*/
}

.box_shape svg path {
  transition: fill 0.5s;
}

.box_shape.onHoverOnly:not(:hover) svg path {
  fill: rgba(220, 220, 220);
}
.box_shape:not(.onHoverOnly):not(.color) svg path {
  fill: rgba(220, 220, 220);
}
/*
.box_shape:not(.onHoverOnly):not(.color) svg path {
  fill: rgba(220, 220, 220);
}
*/

.box_shape.buttonDown {
  opacity: 0.65;
}
</style>
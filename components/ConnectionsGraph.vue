<template>
  <div class="connections-graph" :class="{ hide: !isHomeRoute }">.</div>
</template>
  
<script>
// import d3ForceLimit from 'd3-force-limit'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'

import { generateHighContrastColor, networkColors } from '~/utils/globals'

const fontSize = 6

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      g: null,
      numNodes: 0,
      loadedNodes: 0,
      rotateInterval: null,
    }
  },
  mounted() {
    this.buildGraph()
    window.addEventListener('resize', this.onWindowResize, false)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize, false)
  },
  computed: {
    isHomeRoute() {
      return this.$route.path === '/'
    },
  },
  methods: {
    buildGraph() {
      const data = this.data
      let ForceGraph3D
      if (window) {
        ForceGraph3D = require('3d-force-graph').default
        console.log('ForceGraph3D', ForceGraph3D)
        console.log("loaded 3d-force-graph")
      } else {
        return
      }
      const el = document.querySelector('.connections-graph')
      const g = ForceGraph3D()(el)
      console.log('data', data)
      const gData = {
        nodes: this.generateNodes(data),
        links: this.generateLinks(data),
      }
      this.numNodes = gData.nodes.length

      g.graphData(gData)
        .backgroundColor('rgba(0,0,0,0)')
        .linkWidth(0)
        .showNavInfo(false)
        .numDimensions(2)
        // onLoaded 
        .onEngineStop(() => {
          console.log("loaded!")
        })
        // .cooldownTime(500)
        .linkOpacity(0.5)
        .linkColor(() => {
          return '#000'
        })
        .enableNavigationControls(false)
        .nodeLabel((node) => {
          if (node.type === 'node') {
            return `<span class="node-name">${node.name}</span>`
          } else {
            return false
          }
        })
        .onNodeHover((node) => {
          if (node && node.type === 'node') {
            // 
            // this.nodeOpacity(node.id, 1)
            node.__threeObj.children[0]
            // make triangle rotate
            //node.__threeObj.children[0].rotation.z += 0.01
            if (this.rotateInterval) {
              clearInterval(this.rotateInterval)
            }
            this.rotateInterval = setInterval(() => {
              node.__threeObj.children[0].rotation.z += 0.01
            }, 10)
          } else {
            if (this.rotateInterval) {
              clearInterval(this.rotateInterval)
            }
          }
        })
        .onNodeClick((node) => {
          if (node.type === 'node') {
            this.$router.push(`/connections/${node.id}`)
          }
        })
        .nodeThreeObject((node) => {
          console.log("node")
          const group = new THREE.Group()
          const click_geometry = new THREE.SphereGeometry(5, 64, 64)
          const clickMatSphere = new THREE.MeshBasicMaterial({
            color: 0x000000,
            opacity: 0,
            transparent: true,
          })
          const click_sphere = new THREE.Mesh(click_geometry, clickMatSphere)
          click_sphere.scale.set(10, 10, 10)

          // create a triangle plane with random shape and color
          if (node.type === 'node') {
            const material = new THREE.MeshBasicMaterial({
              color: this.randomTriangleColor(),
              opacity: 1,
              transparent: true,
            })
            let vertices = new Float32Array([
              -1.0, -1.0, 1.0, // vertex 1
              1.0, -1.0, 1.0, // vertex 2
              0, 1.0, 1.0, // vertex 3
            ])
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute(
              'position',
              new THREE.BufferAttribute(vertices, 3)
            )
            geometry.center()
            const mesh = new THREE.Mesh(geometry, material)
            var triangle_scale = 4 + Math.random() * 3
            var rand = Math.random() * triangle_scale
            mesh.scale.set(
              triangle_scale + rand,
              triangle_scale + triangle_scale - rand,
              triangle_scale // z stays same
            )
            mesh.rotation.z = Math.random() * (Math.PI * 2)
            mesh.position.set(0, 0, 1)
            group.add(mesh)
          }

          const sprite = new SpriteText(node.name)
          // sprite.fontFace = 'Hauora'
          sprite.material.depthWrite = false // make sprite background transparent
          if (node.type === 'node') {
            sprite.material.opacity = 0
          } else {
            sprite.material.opacity = 1
            sprite.backgroundColor = "#B1B2B5";
            sprite.padding = [0, 0];
          }

          sprite.color = 'black'
          sprite.textHeight = fontSize
          sprite.padding = 2

          sprite.renderOrder = 999
          sprite.material.depthTest = false

          // this.sprites.push({ id: node.id, sprite })

          group.add(sprite)
          var bbox = new THREE.Box3().setFromObject(sprite);

          var text_height = bbox.max.z - bbox.min.z
          var text_width = bbox.max.x - bbox.min.x

          if (node.type === 'node') {
            // sprite.material.rotation = Math.PI / 2;
            sprite.position.set(text_width / 2 + 5, 0, 0)
            //sprite.material.rotation = Math.PI / 2;
            //group.add(click_sphere)
          } else {
            sprite.position.set(0, 0, 0)
          }
          if (!node?.disabled) {
            //group.add(click_sphere)
          }
          this.onLoadedNode(node)
          return group
        })
      g.d3Force('charge').strength(-70)
      this.g = g

    },
    onLoadedNode(node) {
      this.loadedNodes += 1
      if (this.loadedNodes === this.numNodes) {
        console.log("all nodes loaded")
        this.$emit('loaded')
      }
    },
    // Data for nodes -> names of connections + tags
    generateNodes(data) {
      let nx = 400
      let ny = 250
      const nodes = []
      data.forEach((node) => {
        let obj = {
          id: node.node_id,
          name: node.name_en,
          val: 1,
          content_en: node.content_en,
          type: 'node',
        }
        if (Math.random() > 0.5) {
          obj.fx = nx / 2 - Math.random() * nx
          obj.fy = ny / 2 - Math.random() * ny
        }
        nodes.push(obj)
        node.tags.forEach((tag) => {
          // check if tag already exists
          if (nodes.find((n) => n.id === tag)) {
            return
          }
          nodes.push({
            id: tag,
            name: tag,
            val: 1,
            content_en: tag,
            type: 'tag',
          })
        })
      })
      return nodes
    },
    // Data for Links -> Array of objects with source and target
    generateLinks(data) {
      const links = []
      data.forEach((node) => {
        node.connections.forEach((connection) => {
          links.push({
            source: node.node_id,
            target: connection,
          })
        })
      })
      // connect tags to nodes
      data.forEach((node) => {
        node.tags.forEach((tag) => {
          links.push({
            source: tag,
            target: node.node_id,
          })
        })
      })
      return links
    },
    randomTriangleColor() {
      // random color networkColors
      return networkColors[Math.floor(Math.random() * networkColors.length)]
      //return generateHighContrastColor()
    },
    hexColorWithRandomHue() {
      function hslToHex(h, s, l) {
        l /= 100
        const a = (s * Math.min(l, 1 - l)) / 100
        const f = (n) => {
          const k = (n + h / 30) % 12
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
          return Math.round(255 * color)
            .toString(16)
            .padStart(2, '0') // convert to Hex and prefix "0" if needed
        }
        return `#${f(0)}${f(8)}${f(4)}`
      }
      return hslToHex(
        Math.random() * 360,
        80 + Math.random() * 20,
        40 + Math.random() * 20
      )
    },
    onWindowResize() {
      this.g.width(window.innerWidth)
      this.g.height(window.innerHeight)
    },
  },
}
</script>
  
<style global lang="postcss">
.connections-graph {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  transition: opacity 0.5s;
  /* filter: blur(0px); */
}
.connections-graph.hide {
  /* filter: blur(8px); */
  opacity: 0.85;
  pointer-events: none;
}
</style>
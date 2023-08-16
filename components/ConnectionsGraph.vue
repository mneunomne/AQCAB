<template>
  <div class="connections-graph">.</div>
</template>
  
<script>
// import d3ForceLimit from 'd3-force-limit'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'

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
  methods: {
    buildGraph() {
      const data = this.data
      let ForceGraph3D
      if (window) {
        ForceGraph3D = require('3d-force-graph').default
        console.log('ForceGraph3D', ForceGraph3D)
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

      g.graphData(gData)
        .backgroundColor('rgba(0,0,0,0)')
        .linkWidth(0)
        .showNavInfo(false)
        .numDimensions(2)
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
              color: this.hexColorWithRandomHue(),
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
            var triangle_scale = 5
            var rand = Math.random() * triangle_scale
            mesh.scale.set(
              triangle_scale + rand,
              triangle_scale + triangle_scale - rand,
              triangle_scale
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
          console.log('text_width', text_width)

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
          return group
        })
      g.d3Force('charge').strength(-70)
      this.g = g
    },
    // Data for nodes -> names of connections + tags
    generateNodes(data) {
      const nodes = []
      data.forEach((node) => {
        nodes.push({
          id: node.node_id,
          name: node.name_en,
          val: 1,
          content_en: node.content_en,
          type: 'node',
        })
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
      var colors = [
        '#ff49b0',
        '#66c7f4',
        '#28666e',
        '#553e4e',
        '#a4243b',
        '#40c9a2',
        '#ffbafd',
        '#f9b3d1',
      ]
      return colors[Math.floor(Math.random() * colors.length)]
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
}
</style>
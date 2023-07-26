<template>
  <div class="connections-graph">.</div>
</template>
  
<script>
// import d3ForceLimit from 'd3-force-limit'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'

const fontSize = 5

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.buildGraph()
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

      console.log('gData', gData)

      g.graphData(gData)
        .backgroundColor('rgba(0,0,0,0)')
        .linkWidth(0)
        .showNavInfo(false)
        .numDimensions(2)
        .linkOpacity(0.2)
        .linkColor(() => {
          return '#000'
        })
        .enableNavigationControls(false)
        .nodeLabel((node) => {
          return node.content_en.length > 0
            ? `
          <div class="tooltip-box">
            ${this.$md.render(node.content_en)}
          </div>
        `
            : false
        })
        .nodeThreeObject((node) => {
          console.log('node', node)
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
              -1.0,
              -1.0,
              1.0, // vertex 1
              1.0,
              -1.0,
              1.0, // vertex 2
              0,
              1.0,
              1.0, // vertex 3
            ])
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
            geometry.center()
            const mesh = new THREE.Mesh(geometry, material)
            var triangle_scale = 4
            var rand = Math.random() * triangle_scale
            mesh.scale.set(triangle_scale + rand, triangle_scale + triangle_scale - rand, triangle_scale)
            mesh.rotation.z = Math.random() * (Math.PI * 2)
            mesh.position.set(0, 0, 1)
            group.add(mesh)
          }

          const sprite = new SpriteText(node.name)
          // sprite.fontFace = 'Space Mono'
          sprite.material.depthWrite = false // make sprite background transparent
          sprite.material.opacity = 1

          sprite.color = 'black'
          sprite.textHeight = fontSize
          sprite.padding = 2

          sprite.renderOrder = 999
          sprite.material.depthTest = false

          // this.sprites.push({ id: node.id, sprite })

          group.add(sprite)
          if (node.type === 'node') {
            sprite.position.set(0, triangle_scale + 2, 0)
          } else {
            sprite.position.set(0, 0, 0)
          }
          if (!node?.disabled) {
            //group.add(click_sphere)
          }

          return group
        })
    },
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
      var colors = ['#ff49b0', '#66c7f4', '#28666e', '#553e4e', '#a4243b', '#40c9a2', '#ffbafd', '#f9b3d1']
      return colors[Math.floor(Math.random() * colors.length)]
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
  z-index: -1;
}
</style>
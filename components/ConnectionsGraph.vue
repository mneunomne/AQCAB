<template>
  <div
    class="connections-graph"
    :class="{ hide: $route.path !== localePath('/') }"
    @click="onClickNetwork"
  >
    .
  </div>
</template>
  
<script>
// import d3ForceLimit from 'd3-force-limit'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'

import { networkColors } from '~/utils/globals'

const fontSize = 8

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
      return this.$route.path === this.$nuxt.localePath('/')
    },
  },
  methods: {
    buildGraph() {
      const data = this.data
      var ForceGraph3D
      var d3ForceLimit
      var forceCollide
      if (window) {
        ForceGraph3D = require('3d-force-graph').default
        d3ForceLimit = require('d3-force-limit').default
        forceCollide = require('d3-force-3d').forceCollide
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
        .onEngineStop(() => {
          console.log("loaded!")
        })
        .linkVisibility((link) => {
          return !link.target.includes('_name')
        })
        // .cooldownTime(500)
        .linkOpacity(0.5)
        .linkColor(() => {
          return '#000'
        })
        .nodeLabel((node) => {
          return ''
        })
        .onNodeHover((node) => {
          if (node) {
            node.__threeObj.scale.set(1.1, 1.1, 1.1);
            // make lower opacity everything that is not connected to this node
            let nodes = gData.nodes
            nodes.forEach((n) => {
              n.__threeObj.children[0].material.opacity = 0.2
            })
            if (node.type == 'tag') {
              nodes = nodes.filter((n) => n.tags && n.tags.includes(node.id))
            }
            if (node.type === 'node' || node.type === 'name') {
              let id = node.id.replace('_name', '')
              nodes = nodes.filter((n) => {
                if (n.type === 'tag') {
                  return node.tags.includes(n.id)
                } else {
                  return node.connections.includes(n.id) || n.connections.includes(id)
                }
              })
            }

            nodes.forEach((n) => {
              n.__threeObj.children[0].material.opacity = 1
            })
            let _node = gData.nodes.find((n) => n.id === node.id.replace('_name', ''))
            let _name = gData.nodes.find((n) => n.id === node.id + '_name')
            if (_name) {
              _name.__threeObj.children[0].material.opacity = 1
            }
            _node.__threeObj.children[0].material.opacity = 1
            node.__threeObj.children[0].material.opacity = 1
            // Rotation of node
            if (node.type === 'node') {
              if (this.rotateInterval) {
                clearInterval(this.rotateInterval)
              }
              this.rotateInterval = setInterval(() => {
                node.__threeObj.children[0].rotation.z += 0.01
              }, 10)
            } else if (node.type === 'name') {
              if (_node) {
                if (this.rotateInterval) {
                  clearInterval(this.rotateInterval)
                }
                this.rotateInterval = setInterval(() => {
                  _node.__threeObj.children[0].rotation.z += 0.01
                }, 10)
              }
            }
            // if hover is blank...
          } else {
            if (this.rotateInterval) {
              clearInterval(this.rotateInterval)
            }
            let nodes = gData.nodes
            nodes.forEach((n) => {
              n.__threeObj.scale.set(1, 1, 1);
              n.__threeObj.children[0].material.opacity = 1
            })
          }
        })
        .onNodeClick((node) => {
          console.log("click", node)
          if (node.type === 'node' || node.type === 'name') {
            let path = `/connections/${node.id}`.replace('_name', '')
            this.$router.push(path)
          } else if (node.type === 'tag') {
            // this.$router.replace({ query: { tag: node.id } });
            // hide all nodes that are not connected to this tag
            let nodes = gData.nodes
            console.log("node", node, nodes)
            let links = gData.links
            let connectedNodes = []
            nodes.forEach((n) => {
              if ((n.type === 'node' || n.type === 'name') && n.tags && n.tags.includes(node.id)) {
                connectedNodes.push(n.id)
                n.__threeObj.children[0].material.opacity = 1
              } else {
                n.__threeObj.children[0].material.opacity = 0.2
              }
            })

            // make all links not connected to tag disapear
            const linkObjects = node.__threeObj.parent.children.filter(
              (c) => c.__graphObjType === 'link'
            )
            linkObjects.forEach((l) => {
              if (l.__data.source.id.includes(node.id)) {
                l.visible = true
              } else {
                l.visible = false
              }
            })
            node.__threeObj.children[0].material.opacity = 1
          }
        })
        .onBackgroundClick(() => {
          let nodes = gData.nodes
          // remove query param
          // this.$router.replace({ query: { tag: null } });
          nodes.forEach((n) => {
            n.__threeObj.children[0].material.opacity = 1
          })
          // make all links not connected to tag disapear
          const linkObjects = gData.nodes[0].__threeObj.parent.children.filter(
            (c) => c.__graphObjType === 'link'
          )
          linkObjects.forEach((l) => {
            l.visible = true
          })
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
          click_sphere.scale.set(5, 5, 5)

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
            var triangle_scale = 4 + Math.random() * 4
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

          const char = node.type === 'tag' ? '- ' : '> '
          const name = char + node.name
          const sprite = new SpriteText(name)
          // sprite.fontFace = 'Hauora'
          sprite.material.depthWrite = false // make sprite background transparent
          if (node.type === 'node') {
            sprite.material.opacity = 0
          } else if (node.type === 'tag') {
            sprite.material.opacity = 1
            sprite.backgroundColor = "rgba(220, 220, 220, 0.8)";
            sprite.padding = [0, 0];
          } else {
            // always in front
            sprite.material.opacity = 1
            sprite.renderOrder = 1000
            sprite.backgroundColor = "rgba(255, 255, 255, 0.5)";
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
      g.d3Force('charge').strength(-130)
      let w = window.innerWidth
      let h = window.innerHeight
      console.log("w h", w, h)
      g.d3Force('limit',
        d3ForceLimit()
          .x0(-w / 4)
          .x1(w / 8)
          .y0(-(h / 5))
          .y1(h / 5)
      );

      g.controls().enableZoom = false
      g.controls().enablePan = true
      g.controls().noRotate = true
      g.controls().noZoom = true
      g.controls().panSpeed = 0.1


      g.d3Force('colide', forceCollide(node => 20))

      const linkForce = g.d3Force('link').distance((link) => {
        return link.target.id.includes('_name') ? 2 : 20
      })

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
      let minDist = 20
      let w = window.innerWidth
      let h = window.innerHeight
      let nx = w / 5;
      let ny = h / 5;
      const nodes = [];
      const gridSize = minDist * 2; // Adjust this based on your minimum distance

      const positions = new Set();

      function getGridPosition(x, y) {
        return [
          Math.floor(x / gridSize) * gridSize,
          Math.floor(y / gridSize) * gridSize,
        ];
      }

      data.forEach((node) => {
        let x = nx / 2 - Math.random() * nx;
        let y = ny / 2 - Math.random() * ny;

        let gridPos = getGridPosition(x, y);

        while (positions.has(gridPos.join(','))) {
          x = nx / 2 - Math.random() * nx;
          y = ny / 2 - Math.random() * ny;
          gridPos = getGridPosition(x, y);
        }

        const obj = {
          id: node.node_id,
          name: node.name_en,
          val: 1,
          type: 'node',
          tags: [...node.tags],
          connections: [...node.connections],
        };
        if (Math.random() > 0.9) {
          obj.fx = x;
          obj.fy = y;
        }
        nodes.push(obj);
        positions.add(gridPos.join(','));

        // add node of just name

        nodes.push({
          id: node.node_id + '_name',
          name: node.name_en,
          val: 1,
          type: 'name',
          tags: [...node.tags],
          connections: [...node.connections],
        });

        node.tags.forEach((tag) => {
          if (nodes.find((n) => n.id === tag)) {
            return;
          }

          let tx = nx / 2 - Math.random() * nx;
          let ty = ny / 2 - Math.random() * ny;

          let tagGridPos = getGridPosition(tx, ty);

          while (positions.has(tagGridPos.join(','))) {
            tx = nx / 2 - Math.random() * nx;
            ty = ny / 2 - Math.random() * ny;
            tagGridPos = getGridPosition(tx, ty);
          }

          const tagObj = {
            id: tag,
            name: tag,
            val: 1,
            content_en: tag,
            type: 'tag',
          };
          //tagObj.fx = tx;
          // tagObj.fy = ty;
          if (Math.random() > 0.9) {
            obj.fx = tx;
            obj.fy = ty;
          }
          nodes.push(tagObj);
          positions.add(tagGridPos.join(','));
        });
      });
      return nodes
    },
    // Data for Links -> Array of objects with source and target
    generateLinks(data) {
      console.log("data", data)
      const links = []
      data.forEach((node) => {

        links.push({
          source: node.node_id,
          target: node.node_id + '_name',
        })
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
    onClickNetwork() {
      console.log("onClickNetwork")
    }
  },
}
</script>
  
<style global lang="postcss">
.connections-graph {
  position: fixed;
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
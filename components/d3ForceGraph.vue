<template>
  <div class="connections-graph"></div>
</template>

<script>
import * as d3 from 'd3'
import { forceSimulation } from 'd3-force'

const fontSize = 12

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
      const el = document.querySelector('.connections-graph')
      const width = el.clientWidth
      const height = el.clientHeight

      const simulation = d3
        .forceSimulation(data)
        .force(
          'link',
          d3.forceLink().id((d) => d.id)
        )
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2))

      const svg = d3.select(el).append('svg').attr('width', width).attr('height', height)

      const link = svg
        .selectAll('line')
        .data(data.links)
        .enter()
        .append('line')
        .style('stroke', '#aaa')
        .style('stroke-width', '1px')

      const node = svg
        .selectAll('.node')
        .data(data.nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .call(d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded))

      node
        .append('circle')
        .attr('r', 5)
        .style('fill', 'black')
        .style('opacity', (d) => (d.disabled ? 0.5 : 1))

      node
        .append('text')
        .text((d) => d.name)
        .style('font-size', fontSize)
        .style('fill', 'red')
        .attr('dx', 12)
        .attr('dy', 5)

      simulation.on('tick', () => {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y)

        node.attr('transform', (d) => `translate(${d.x},${d.y})`)
      })

      function dragStarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      }

      function dragged(event, d) {
        d.fx = event.x
        d.fy = event.y
      }

      function dragEnded(event, d) {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      }
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
      return links
    },
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
}
</style>
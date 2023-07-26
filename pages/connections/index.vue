<template>
  <main v-if="connections" class="main">
    <ConnectionsGraph :data="connections" />
    <Tags :tags="tags" />
  </main>
</template>
<script>
import ConnectionsGraph from '~/components/general/ConnectionsGraph.vue'
import Tags from '~/components/general/Tags.vue'

export default {
  components: {
    ConnectionsGraph,
    Tags,
  },
  computed: {
    connections() {
      return this.$store.state.connections
    },
    tags() {
      const tags = []
      this.$store.state.connections.forEach((node) => {
        node.tags.forEach((tag) => {
          if (tags.includes(tag)) {
            return
          }
          tags.push(tag)
        })
      })
      return tags
    },
  },
}
</script>

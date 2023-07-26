<template>
  <main class="main">
    <!--<ConnectionsGraph :data="connections" />-->
    <Tags :tags="tags" />
  </main>
</template>
<script>
import Tags from '~/components/general/Tags.vue'

export default {
  components: {
    Tags,
  },
  computed: {
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

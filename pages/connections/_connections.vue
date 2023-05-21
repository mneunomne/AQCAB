<template>
  <article v-if="node" class="main article">
    <h1 class="article-title">{{ node.title }}</h1>
    <p class="mt-4">{{ node_name_en }}</p>
    <p class="mt-4">{{ node.name_be }}</p>
    <div class="block mt-8 mb-4" v-html="$md.render(node.content_en)" />
    <div class="block mt-8 mb-4" v-html="$md.render(node.content_be)" />
  </article>
</template>
<script>
export default {
  async asyncData({ params, payload }) {
    if (payload) return { node: payload }
    else
      return {
        node: await require(`~/assets/content/connections/${params.node}.json`),
      }
  },
}
</script>

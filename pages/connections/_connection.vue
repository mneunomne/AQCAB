<template>
  <article class="article card">
    <span class="close" @click="$router.push('/connections')">close</span>
    <h1 class="article-title">{{ connectionNode.node_id }}</h1>
    <div v-html="$md.render(connectionNode.content_en)"></div>
  </article>
</template>
<script>
export default {
  async asyncData({ params, payload }) {
    console.log('params', params, payload)
    if (payload) return { connectionNode: payload }
    else
      return {
        connectionNode: await require(`~/assets/content/connections/${params.connection}.json`),
      }
  },
}
</script>

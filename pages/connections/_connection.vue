<template>
  <article v-if="connectionNode" class="main article">
    <span class="close" @click="$router.push('/connections')">close</span>
    <h1 class="article-title">{{ connectionNode.node_id }}</h1>
    <p class="article-content">{{ connectionNode.content_en }}</p>
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

<style scoped lang="postcss">
.article {
  width: 100%;
  min-height: 400px;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  z-index: 10;
  padding: 20px;
  border-radius: 10px;
  pointer-events: all;
}

.article-title {
  margin-bottom: 1em;
}

.close {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
<template>
  <div class="main" v-show="connectionNode">
    <article class="main article card">
      <span class="close" @click="$router.push('/connections')">close</span>
      <h1 class="article-title">{{ connectionNode.node_id }}</h1>
      <p class="article-content">{{ connectionNode.content_en }}</p>
    </article>
  </div>
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
  padding: 50px;
  pointer-events: all;
}

.article-title {
  margin-bottom: 1em;
}

.close {
  position: absolute;
  right: 50px;
  top: 50px;
}
</style>
<template>
  <div class="network-node grid-block-container">
    <div class="grid-block grid-width-1 grid-height-1">
      <article class="article">
        <span>image</span>
      </article>
      <BoxShape />
    </div>
    <div class="grid-block grid-width-2 grid-height-1">
      <article class="article">
        <span class="close" @click="$router.push('/')">close</span>
        <h1 class="article-title">{{ connectionNode.node_id }}</h1>
      </article>
      <BoxShape />
    </div>
    <div class="grid-block grid-width-3 grid-height-2">
      <article class="article">
        <div v-html="$md.render(connectionNode.content_en)"></div>
      </article>
      <BoxShape />
    </div>
  </div>
</template>
<script>

import BoxShape from '~/components/BoxShape.vue'

export default {
  components: {
    BoxShape
  },
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
<style lang="postcss" scoped>
</style>
<template>
  <div class="grid-block-container" v-show="blogPost">
    <div class="grid-block grid-width-3 grid-height-3">
      <article class="article">
        <span class="close" @click="$router.push(localePath('/blog'))"
          >close</span
        >
        <h1 class="article-title">{{ blogPost.title }}</h1>
        <h6
          v-if="blogPost.date"
          class="inline-block py-1 my-2 font-medium whitespace-no-wrap"
        >
          {{ formatDate(blogPost.date) }}
        </h6>
        <div v-html="$md.render(blogPost.body)"></div>
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
    if (payload) return { blogPost: payload }
    else
      return {
        blogPost: await require(`~/assets/content/blog/${params.blog}.json`)
      }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString(process.env.lang) || ''
    }
  }
}
</script>

<template>
  <div class="main" v-show="blogPost">
    <article class="article card">
      <div class="article-content">
        <span class="close" @click="$router.push('/blog')">{{
          $t('close')
        }}</span>
        <h1 class="article-title">{{ blogPost.title }}</h1>
        <h6
          v-if="blogPost.date"
          class="inline-block py-1 my-2 font-medium whitespace-no-wrap"
        >
          {{ formatDate(blogPost.date) }}
        </h6>
        <div v-html="$md.render(blogPost.body)"></div>
      </div>
    </article>
  </div>
</template>
<script>
export default {
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

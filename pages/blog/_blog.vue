<template>
  <div class="grid-block-cont" v-show="blogPost">
    <div class="grid-block grid-width-3 grid-height-3">
      <span class="close" @click="$router.push(localePath('/blog'))"
        >close</span
      >
      <article class="article">
        <div class="article-content">
          <div v-show="blogPost.title" class="row title">
            <h1 class="article-title">{{ blogPost.title }}</h1>
          </div>
          <div class="article-date">
            <span v-if="blogPost.date" class="inline-block">
              {{ formatDate(blogPost.date) }}
            </span>
          </div>
          <div v-show="blogPost.author" class="row author">
            <h3 class="article-author">{{ blogPost.author }}</h3>
          </div>
          <div v-show="blogPost.author" class="row content">
            <div v-html="$md.render(blogPost.body)"></div>
          </div>
        </div>
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
<style scoped>
.article-date {
  position: absolute;
  right: 0px;
  top: 0px;
}

.article-content {
  position: relative;
  margin: 50px;
}
</style>

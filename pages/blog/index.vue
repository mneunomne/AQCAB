<template>
  <ul class="articles">
    <li
      v-for="(blogPost, index) in blogPosts"
      :key="index"
      class="grid-block grid-height-1 grid-width-1 blog-card"
      @click="onClickBlog(`/blog/${blogPost.slug}`)"
    >
      <article class="card-content">
        <div class="flex justify-between align-baseline">
          <h3 class="article-title">{{ blogPost.title }}</h3>
          <h6
            v-if="blogPost.date"
            class="inline-block font-medium rounded-sm whitespace-no-wrap"
          >
            {{ formatDate(blogPost.date) }}
          </h6>
        </div>
        <div class="mt-4 mb-2">
          <p class="inline">{{ blogPost.description }}</p>
        </div>
      </article>
      <BoxShape :boxId="`blog_${index}`" />
    </li>
  </ul>
</template>
<script>

import BoxShape from '~/components/BoxShape.vue'

export default {
  components: {
    BoxShape
  },
  computed: {
    blogPosts() {
      console.log("blogPosts")
      return this.$store.state.blogPosts
    }
  },
  mounted() {
    console.log('blog page loaded')
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString(process.env.lang) || ''
    },
    onClickBlog(path) {
      console.log("onClickBlog", path)
      this.$router.push({ path: this.localePath(path) })
    }
  }
}
</script>

<style lang="postcss" scoped>
.blog-card {
  cursor: pointer;
}
.card-content {
  pointer-events: none;
}
</style>
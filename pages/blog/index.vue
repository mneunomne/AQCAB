<template>
  <ul v-if="blogPosts" class="articles">
    <li
      v-for="(blogPost, index) in blogPosts"
      :key="index"
      class="blog-card"
      @click="onClickBlog(`/blog/${blogPost.slug}`)"
    >
      <article>
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
      <BoxShape />
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
      return this.$store.state.blogPosts
    }
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
.articles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
.articles article {
  padding: 20px;
  z-index: 10;
  position: relative;
}
.blog-card {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: var(--grid-height-2);
  .card {
    padding: 20px;
    height: 100%;
  }
}
</style>
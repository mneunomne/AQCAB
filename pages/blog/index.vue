<template>
  <ul class="articles">
    <li
      v-for="(blogPost, index) in blogPosts"
      :key="index"
      class="grid-block grid-height-2 blog-card"
      :class="blogPost.highlight ? 'grid-width-2' : 'grid-width-1'"
      @click="onClickBlog(`/blog/${blogPost.slug}`)"
    >
      <article class="card-content">
        <div class="row title">
          <h3 class="article-title">{{ blogPost.title }}</h3>
        </div>
        <div v-show="blogPost.author" class="row author">
          <h3 class="article-author">{{ blogPost.author }}</h3>
        </div>
        <div class="row content">
          <p class="inline">{{ blogPost.description }}</p>
        </div>
        <p v-if="blogPost.date" class="blog-card-date">
          {{ formatDate(blogPost.date) }}
        </p>
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
.articles {
  display: flex;
}
.blog-card {
  cursor: pointer;
}

.blog-card-date {
  position: absolute;
  bottom: 25px;
}

.content {
  height: 50%;
}
/*
.card-content {
  pointer-events: none;
}
*/
</style>
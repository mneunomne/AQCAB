<template>
  <main v-if="blogPosts" class="main">
    <ul class="articles">
      <li v-for="(blogPost, index) in blogPosts" :key="index" class="blog-card">
        <nuxt-link
          :to="`blog/${blogPost.slug}`"
          class="article article--clickable"
        >
          <article class="card">
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
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>
<script>
export default {
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts
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

<style lang="postcss" scoped>
.articles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
.blog-card {
  width: 100%;
  height: 300px;
  .card {
    padding: 20px;
    height: 100%;
  }
}
</style>
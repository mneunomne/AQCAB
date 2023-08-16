<template>
  <div class="articles">
    <div class="blog-card">
      <article class="card">
        <div class="flex justify-between align-baseline">
          <h3 class="article-title">about</h3>
        </div>
        <div class="mt-4 mb-2">
          <p class="inline">test</p>
        </div>
      </article>
    </div>
  </div>
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
  grid-template-columns: repeat(1, 1fr);
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
</template>
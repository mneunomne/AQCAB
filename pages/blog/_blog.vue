<template>
  <div class="grid-block-cont">
    <div class="grid-block grid-width-3 grid-height-3">
      <span class="close" @click="$router.push(localePath('/blog'))"
        >{{ $t('close') }}
      </span>
      <article class="article">
        <div class="article-content">
          <div v-show="blogPost[`title_${$i18n.locale}`]" class="row title">
            <h1 class="article-title">
              {{ blogPost[`title_${$i18n.locale}`] }}
            </h1>
          </div>
          <div class="article-date">
            <span v-if="blogPost.date" class="inline-block">
              {{ formatDate(blogPost.date) }}
            </span>
          </div>
          <div v-show="blogPost[`author_${$i18n.locale}`]" class="row author">
            <h3 class="article-author">
              {{ blogPost[`author_${$i18n.locale}`] }}
            </h3>
          </div>
          <div class="row content">
            <div v-html="$md.render(blogPost[`body_${$i18n.locale}`])"></div>
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
  margin: 60px;
}

.article-title {
  max-width: 80%;
  font-size: 22px;
}

.article-author {
  font-size: 20px;
  margin-bottom: 24px;
}

.article {
  margin: var(--block-padding);
  padding: 0px;
  min-width: auto !important;
  font-size: 18px;
}
</style>

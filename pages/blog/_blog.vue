<template>
  <div class="grid-block-cont" ref="postContainer">
    <div class="grid-block grid-width-3 grid-height-3 grid-box">
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
      <span
        v-show="isBiggerThanScreen"
        class="close back"
        @click="$router.push(localePath('/blog'))"
        >{{ $t('back') }}
      </span>
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
  data() {
    return {
      windowHeight: 0,
      postHeight: 0
    }
  },
  mounted() {
    this.windowHeight = window.innerHeight
    this.postHeight = this.$refs.postContainer.offsetHeight
    window.addEventListener('resize', (evt) => {
      this.windowHeight = window.innerHeight
      this.postHeight = this.$refs.postContainer.offsetHeight
      console.log("this.postHeight", this.postHeight, this.windowHeight)
    })
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString(process.env.lang) || ''
    }
  },
  computed: {
    isBiggerThanScreen() {
      return (this.postHeight + 70) > this.windowHeight
    }
  }
}
</script>
<style scoped>
.grid-box {
  overflow: visible;
}
.back {
  position: absolute;
  bottom: -42px;
  top: auto;
  padding: 12px 20px;
}
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
  padding: var(--block-padding);
  min-width: auto !important;
  font-size: 18px;
}

.close-bottom {
  position: absolute;
  bottom: -50px;
  right: -15px;
  top: auto;
}
</style>

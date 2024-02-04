<template>
  <ul class="grid-block-cont">
    <li
      v-for="(blogPost, index) in blogPosts"
      :key="index"
      class="grid-block grid-height-2 blog-card grid-box"
      :class="[
        gridClass(index),
        show ? 'show' : '',
        noTransition ? 'noTransition' : '',
      ]"
      @click="onClickBlog(`/blog/${blogPost.slug}`)"
      :style="{ 'transition-delay': `${50 * (blogPosts.length - index)}ms` }"
    >
      <article class="card-content">
        <div class="article-content">
          <div class="row title">
            <h3 class="article-title">{{ blogPost[`title`] }}</h3>
          </div>
          <div v-show="blogPost.author" class="row author">
            <h3 class="article-author">
              {{ blogPost[`author`] }}
            </h3>
          </div>
          <div
            class="row content"
            v-html="$md.render(blogPost[`description`])"
          ></div>
        </div>
        <p v-if="blogPost.date" class="blog-card-date">
          {{ formatDate(blogPost.date) }}
        </p>
      </article>
    </li>
  </ul>
</template>
<script>

import BoxShape from '~/components/BoxShape.vue'
import { bigScreen, smallScreen } from '~/utils/globals'

export default {
  components: {
    BoxShape
  },
  data() {
    return {
      show: false,
      noTransition: false
    }
  },
  computed: {
    blogPosts() {
      console.log("blogPosts")
      // fallback to english:
      let blogPosts = this.$store.state.blogPosts.map(post => {
        if (!post[`title_${this.$i18n.locale}`]) {
          post[`title_${this.$i18n.locale}`] = post[`title_en`]
        }
        post['title'] = post[`title_${this.$i18n.locale}`] || post[`title_en`]
        post['description'] = post[`description_${this.$i18n.locale}`] || post[`description_en`]
        post['author'] = post[`author_${this.$i18n.locale}`] || post[`author_en`]
        // fallback destription to body
        if (!post['description'] || post['description'] == "") {
          if (post.highlight) {
            post['description'] = post['body_en'].substring(0, 600) + "..."
          } else {
            post['description'] = post['body_en'].substring(0, 400) + "..."
          }
        }

        return post
      })
      return blogPosts
    }
  },
  mounted() {
    console.log('blog page loaded')
    setTimeout(() => {
      this.show = true
      setTimeout(() => {
        this.noTransition = true
      }, 500)
    }, 100)
  },
  methods: {
    gridClass(index) {
      let highlighted = this.blogPosts[index].highlight
      return highlighted ? 'grid-width-2' : 'grid-width-1'
    },
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
  opacity: 0;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  max-height: var(--grid-height-2);
  display: inline-flex;
}

.article-content {
  display: -webkit-box;
  -webkit-line-clamp: 11;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: calc(100% - 30px);
  -webkit-mask-image: linear-gradient(0deg, transparent 5px, white 50px);
}

.card-content {
  display: flex;
}

.blog-card.show {
  opacity: 1;
  transform: translateY(0px);
}

.blog-card.noTransition {
  transition-delay: 0s !important;
}

.blog-card-date {
  position: absolute;
  bottom: 25px;
}

.article-author {
  font-size: 18px;
}

.content {
  display: flow-root;
  height: 50%;
}
</style>
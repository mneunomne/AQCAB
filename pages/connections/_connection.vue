<template>
  <div class="network-node grid-block-cont">
    <div class="grid-block grid-width-1 grid-height-1 grid-box fixed-height">
      <article class="article">
        <span>image</span>
      </article>
    </div>
    <div class="grid-block grid-width-2 grid-height-1 grid-box fixed-height">
      <article class="node-info">
        <div class="article-content">
          <span class="close" @click="$router.push('/')">close</span>
          <h1 class="article-name">
            {{ connectionNode[`name_${$i18n.locale}`] }}
          </h1>
          <ul class="row article-tags">
            <li
              v-for="tag in connectionNode.tags"
              :key="tag"
              class="tag"
              @click="onClickTag(tag)"
            >
              - {{ tag }}
            </li>
          </ul>
          <ul class="row article-connections">
            <li
              v-for="connection in connectionNode.connections"
              :key="connection"
              class="tag"
              @click="$router.push(localePath(`/connections/${connection}`))"
            >
              > {{ connection }}
            </li>
          </ul>
        </div>
      </article>
    </div>
    <div class="grid-block grid-width-3 grid-height-2 grid-box">
      <article class="article">
        <div
          v-html="$md.render(connectionNode[`content_${$i18n.locale}`])"
        ></div>
      </article>
    </div>
  </div>
</template>
<script>

import BoxShape from '~/components/BoxShape.vue'

export default {
  components: {
    BoxShape
  },
  methods: {
    onClickTag(tag) {
      this.$router.push(this.localePath(`/?tag=${tag}`))
      //this.$router.replace({ query: { tag: tag } });
    }
  },
  async asyncData({ params, payload }) {
    console.log('params', params, payload)
    if (payload) return { connectionNode: payload }
    else
      return {
        connectionNode: await require(`~/assets/content/connections/${params.connection}.json`),
      }
  },
}
</script>
<style lang="postcss" scoped>
.node-info li {
  display: inline-block;
  margin-right: 10px;
  font-size: 18px;
  font-weight: 500;
}

.article {
  padding: var(--article-padding);
  min-width: auto !important;
  font-size: 18px;
  font-weight: 500;
}

.article-content {
  padding: 10px;
}

.tag {
  cursor: pointer;
  font-size: 18px;
}
.tag:hover {
  text-decoration: underline;
}

.article-name {
  font-size: 26px;
  margin-bottom: 16px;
}
</style>
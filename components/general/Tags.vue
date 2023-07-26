<template>
  <ul class="tags">
    <li class="tag" v-for="tag in tags" :key="tag">
      <a class="btn" href="#">{{ tag }}</a>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Tags',
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="postcss" scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}
.tag {
  margin-right: 10px;
  margin-bottom: 10px;
  width: 120px;
  height: 33px;
  display: flex;
}
.btn {
  padding: auto;
  width: 100%;
  height: 100%;
  line-height: 33px;
  font-size: 12px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease 0s;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>
<template>
  <ul v-if="obj">
    <li v-for="property of Object.entries(obj)" :key="property[0]">
      <span>{{ property[0] }}:&nbsp;</span>
      <ObjectPropertiesTree v-if="typeof property[1] === 'object'" :obj="property[1]" />
      <span v-else>{{ property[1] }}</span>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['obj'],
  name: 'ObjectPropertiesTree'
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>

<template>
  <div class="api-preview">
    <OverviewComponent />
    <ObjectPropertiesTree :obj="api" />
  </div>
</template>

<script lang="ts">
import OverviewComponent from './OverviewComponent.vue';
import ObjectPropertiesTree from './ObjectPropertiesTree.vue';
import { Component, Vue } from 'vue-property-decorator';
import AsyncapiState from '@/store/AsyncapiStore';
import { AsyncAPI } from '@/model/specs/asyncapi/Asyncapi';

@Component({
  components: {
    OverviewComponent,
    ObjectPropertiesTree
  }
})
export default class PreviewComponent extends Vue {
  get api() {
    return this.$asyncapiState.apiFile?.api;
  }
}
</script>

<style lang="scss" scoped>
.api-preview ul * {
  font-size: 0.8em;
}
</style>

<template>
  <multipane layout="horizontal">
    <ApiRefsComponent  class="overflow-y-auto" :style="{ height: '40%'}"/>
    <multipane-resizer></multipane-resizer>
    <ApiTreeComponent class="overflow-y-auto"  :style="{ height: '60%'}"/>
  </multipane>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ApiRefsComponent from './ApiRefsComponent.vue';
import ApiTreeComponent from './ApiTreeComponent.vue';
import { Multipane, MultipaneResizer } from '@/views/components/multipane';

@Component({
  components: {
    ApiRefsComponent,
    ApiTreeComponent,
    Multipane,
    MultipaneResizer
  }
})
export default class SideBarComponent extends Vue {}
</script>

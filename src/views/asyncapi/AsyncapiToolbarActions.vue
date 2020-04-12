<template>
  <div class="align-bottom">
    <v-switch v-model="$asyncapiState.showPreview" label="Show Preview"></v-switch>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AsyncapiToolbarActions extends Vue {}
</script>

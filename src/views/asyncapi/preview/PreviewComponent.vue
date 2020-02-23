<template>
  <v-layout>
    <pre style="font-size: 6px;">
      {{ asyncapi }}
    </pre>
  </v-layout>
</template>

<script lang="ts">
import { State, namespace } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';
import { AsyncapiState } from '@/model/store/asyncapi/asyncapi.store';
import { AsyncAPI } from '@/model/asyncapi/asyncapi';

const AsyncapiStore = namespace('asyncapi');

@Component
export default class PreviewComponent extends Vue {
  @AsyncapiStore.Getter asyncapi?: AsyncAPI;
}
</script>

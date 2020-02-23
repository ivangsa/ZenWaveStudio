<template>
  <editor v-model="content" @init="initEditor" lang="text" theme="chrome" width="100%" height="100%"></editor>
</template>

<script lang="ts">
import { State, namespace } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';
import { AsyncapiState } from '@/model/store/asyncapi/asyncapi.store';
import { AsyncAPI } from '@/model/asyncapi/asyncapi';

const AsyncapiStore = namespace('asyncapi');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const editor = require('vue2-ace-editor');

@Component({
  components: {
    editor
  }
})
export default class EditorComponent extends Vue {
  @AsyncapiStore.Getter('yml') content?: string;
  initEditor() {
    require('brace/theme/chrome');
  }
}
</script>

<template>
  <editor
    v-model="content"
    @init="initEditor"
    :options="{ showPrintMargin: false }"
    lang="text"
    theme="chrome"
    width="100%"
    height="100%"
    style=""
  ></editor>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const editor = require('vue2-ace-editor');

@Component({
  components: {
    editor
  }
})
export default class EditorComponent extends Vue {
  updateContentTimer: number | null = null;

  get content(): string {
    return this.$editorState.editorContents;
  }

  set content(content: string) {
    if(this.updateContentTimer) {
      window.clearTimeout(this.updateContentTimer);
    }
    this.updateContentTimer = window.setTimeout(() => {
      this.$editorState.editorContents = content;
    }, 3000);
  }

  initEditor() {
    require('brace/theme/chrome');
  }
}
</script>

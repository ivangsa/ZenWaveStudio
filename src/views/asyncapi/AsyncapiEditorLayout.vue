<template>
  <multipane fill-height>
    <v-tabs :style="{ flexGrow: 1, width: '50%' }">
      <v-tab>Text Editor</v-tab>
      <v-tab-item class="editor overflow-x-auto overflow-y-auto">
        <router-view name="text" />
      </v-tab-item>
      <v-tab>Form Editor</v-tab>
      <v-tab-item class="editor overflow-x-auto overflow-y-auto">
        <router-view name="preview" />
      </v-tab-item>
    </v-tabs>

    <multipane-resizer v-if="$asyncapiState.showPreview"></multipane-resizer>

    <v-card class="preview overflow-x-auto overflow-y-auto" :style="{ width: '50%' }" outlined tile v-if="$asyncapiState.showPreview">
      <router-view name="preview" />
    </v-card>
  </multipane>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Multipane, MultipaneResizer } from '@/views/components/multipane';
import { asyncapiState } from '@/store/StoreModules';

@Component({
  components: {
    Multipane,
    MultipaneResizer
  }
})
export default class AsyncapiEditorLayout extends Vue {
  fileUrl = '';

  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter');
    next((vm: AsyncapiEditorLayout) => {
      console.log('beforeRouteEnter.next');
      if (to.params.file !== vm.fileUrl) {
        vm.fileUrl = to.params.file;
        vm.$asyncapiState.load();
      }
    });
  }

  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate');
    next((vm: AsyncapiEditorLayout) => {
      console.log('beforeRouteLeave.next');
    });
  }

  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave');
    next();
  }
}
</script>

<style lang="scss" scoped>
.editor {
  height: 810px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
}
.preview {
  height: 858px;
}
</style>

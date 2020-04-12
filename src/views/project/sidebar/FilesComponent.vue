<template>
  <v-card class="overflow-y-auto">
    <v-toolbar dense color="light-blue" dark>
      <v-toolbar-title>Files</v-toolbar-title>
    </v-toolbar>

    <v-treeview open-all :items="files" activatable item-key="name" item-children="files" open-on-click>
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="item.files">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
        <v-icon v-else>mdi-nodejs</v-icon>
      </template>
      <template slot="label" slot-scope="props">
        <span @click="openFile(props.item)">{{ props.item.name }}</span>
      </template>
    </v-treeview>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FileUrlUtils from '@/lib/FileUrlUtils';
import { File } from '@/model/project/File';
import { Folder } from '@/model/project/Folder';

@Component
export default class FilesComponent extends Vue {
  get files() {
    return this.$projectState.project?.root.files;
  }

  getFilename = FileUrlUtils.getFilename;

  onClick() {
    console.log(this);
  }

  openFile(item: File | Folder) {
    console.log('be aware of persisted state', item);
    if ((item as any).extension) {
      this.$projectState.loadFile(item as File);
    }
  }
}
</script>

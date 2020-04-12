<template>
  <v-toolbar dense>
    <v-toolbar-title>
      <span v-if="$editorState.activeFile"> <v-icon>mdi-file</v-icon> {{ $editorState.activeFile.name }} </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <router-view name="toolbarActions" />

    <v-btn icon @click="saveCurrentFile">
      <v-icon>mdi-content-save</v-icon>
    </v-btn>
    <v-btn icon @click="$projectState.saveAll">
      <v-icon>mdi-content-save-all</v-icon>
    </v-btn>

    <v-menu bottom left offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="$projectState.refresh">
          <v-list-item-action>
            <v-icon>fa-sync</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Refresh Project</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$projectState.revertAll">
          <v-list-item-action>
            <v-icon>fa-history</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Revert All</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="revertCurrentFile">
          <v-list-item-action>
            <v-icon>mdi-file-undo</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Revert File</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ProjectToolbarComponent extends Vue {
  saveCurrentFile() {
    const filepath = this.$editorState.activeFile?.url;
    if (filepath) {
      this.$projectState.save(filepath);
      // this.$editorState.setActiveFile(this.$projectState.)
    }
    this.$toast.success('saveCurrentFile saveCurrentFile saveCurrentFile saveCurrentFile saveCurrentFile saveCurrentFile ');
  }
  revertCurrentFile() {
    const filepath = this.$editorState.activeFile?.url;
    if (filepath) {
      this.$projectState.revert(filepath);
      // this.$editorState.setActiveFile(this.$projectState.)
    }
  }
}
</script>

<template>
  <v-layout align-center justify-center>
    <v-flex shrink>
      <v-row>
        <v-col cols="6">
          <v-card width="600">
            <v-card-title>Open Project Folder</v-card-title>
            <v-card-text>
              <v-text-field label="You can give your project some name..." v-model="newProjectName" hide-details="auto"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="openProjectFolder">Open</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card width="600">
            <v-toolbar dark>
              <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="mdi-search" v-model="searchTerm" />
            </v-toolbar>
            <v-list two-line subheader>
              <v-list-item v-for="item in recentProjects" :key="item.root.url" @click="openProject(item)">
                <v-list-item-avatar>
                  <v-icon>mdi-folder</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.root.url"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click.stop="removeRecentProject(item)" title="Remove Bookmark">
                    <v-icon color="grey lighten-1">mdi-bookmark-remove</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { remote } from 'electron';
import { Component, Vue } from 'vue-property-decorator';
import { Project } from '../model/project/Project';

@Component
export default class Home extends Vue {
  newProjectName = '';
  searchTerm = '';

  beforeRouteEnter(from, to, next) {
    next((vm: Home) => {
      vm.$settingsState.loadRecentProjects();
    });
  }

  get recentProjects() {
    if (this.searchTerm.length < 3) {
      return this.$settingsState.recentProjects;
    }
    return this.$settingsState.recentProjects.filter(
      p => p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || p.root.url.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async openProjectFolder() {
    const path = remote.dialog.showOpenDialogSync(remote.getCurrentWindow(), { properties: ['openDirectory', 'createDirectory'] });
    if (path && path.length === 1) {
      const project = new Project(path[0], this.newProjectName);
      await this.$settingsState.addRecentProject(project);
      this.$projectState.load(project);
    }
  }

  async removeRecentProject(project: Project) {
    this.$settingsState.removeRecentProject(project);
  }

  openProject(project: Project) {
    this.$projectState.load(project);
  }
}
</script>

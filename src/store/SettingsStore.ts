import fs from 'fs';
import path from 'path';
import { action, createModule, mutation } from 'vuex-class-component';
import { Project } from '@/model/project/Project';
import ElectronStore from 'electron-store';

const VuexModule = createModule({ strict: false });
const settings: ElectronStore = new ElectronStore();

export default class SettingsStore extends VuexModule.With({ namespaced: 'settings' }) {
  recentProjects: Project[] = [];

  @action async loadRecentProjects() {
    this.recentProjects = settings.get('recentProjects');
  }

  @action async addRecentProject(project: Project) {
    const projects: Project[] = settings.get('recentProjects') || [];
    if (!projects.some(p => p.root.url === project.root.url)) {
      projects.unshift(project);
      this.recentProjects = projects;
      settings.set('recentProjects', projects);
    }
  }

  @action async removeRecentProject(project: Project) {
    const projects: Project[] = settings.get('recentProjects') || [];
    this.recentProjects = projects.filter(p => p.root.url !== project.root.url);
    settings.set('recentProjects', this.recentProjects);
  }
}

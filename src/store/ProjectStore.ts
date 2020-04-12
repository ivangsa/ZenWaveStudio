import Vue from 'vue';
import filesService from '@/service/FilesService';
import { File, FormatType } from '@/model/project/File';
import { Folder } from '@/model/project/Folder';
import { Project } from '@/model/project/Project';
import router from '@/router';
import AsyncapiState from '@/store/AsyncapiStore';
import { plainToClassFromExist } from 'class-transformer';
import { action, createModule, createProxy, mutation } from 'vuex-class-component';
import FileEditorStore from './FileEditorStore';
import { toastService } from '@/views/components/toast-service/ToastService';

const VuexModule = createModule({ strict: false });

export default class ProjectStore extends VuexModule.With({ namespaced: 'project' }) {
  project?: Project = undefined;
  files: File[] = [];
  apis: File[] = [];
  models: File[] = [];
  references: File[] = [];

  @action async load(project: Project) {
    this.project = new Project(project.root.url, project.name);
    filesService.buildFolderTree(this.project.root);
    console.log('load this.project.root', this.project.root);
    router.push({ name: 'Project' });
  }

  @action async refresh() {
    filesService.refreshUnmodified();
  }

  @action async revertAll() {
    filesService.revertAll();
    if (this.project) {
      this.project.root.files = [];
      filesService.buildFolderTree(this.project.root);
    }
  }

  @action async revert(filepath: string) {
    filesService.revert(filepath);
    if (this.project) {
      // FIMXE
      this.project.root.files = [];
      filesService.buildFolderTree(this.project.root);
    }
    return filesService.get(filepath);
  }

  @action async loadFile(item: File) {
    item = plainToClassFromExist(new File(item.url, item.parentFolder), item);
    if (item instanceof File) {
      const editorState = createProxy(this.$store, FileEditorStore);
      editorState.setActiveFile(item);
      if (item.format === FormatType.ASYNCAPI) {
        console.log('loading asyncapi file', item);
        // createProxy(this.$store, AsyncapiState).load(); // FIXME use befoureRouterEnter
        router.push({ name: 'Asyncapi', params: { file: item.url } }).catch();
      } else {
        router.push({ name: 'EditFile', params: { file: item.url } }).catch();
      }
    }
  }

  @action async save(filepath: string) {
    filesService.save(filepath, () => {
      console.log('saved', filepath);
    });
  }

  @action async saveAll() {
    filesService.saveAll(() => {
      toastService.success('saveAll');
      console.log('all saved');
    });
  }
}

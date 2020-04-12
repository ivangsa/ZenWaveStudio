import filesService from '@/service/FilesService';
import ApiParser from '@/service/ApiParser';
import { File, FormatType } from '@/model/project/File';
import { Folder } from '@/model/project/Folder';
import { Project } from '@/model/project/Project';
import router from '@/router';
import { action, createModule, createSubModule, createProxy, mutation } from 'vuex-class-component';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { IndexedFile } from '@/model/project/IndexedFile';

const VuexModule = createModule({ strict: false });

export default class FileEditorStore extends VuexModule.With({ namespaced: 'editor' }) {
  activeFile?: File = undefined;
  files: { [url: string]: File } = {};

  constructor() {
    super();
    console.log('constructor FileEditorStore', this);
  }

  get editorContents() {
    // console.log('FileEditorStore.editorContents', this);
    return this.activeFile?.contents || '';
  }

  set editorContents(contents: string) {
    if (this.activeFile) {
      filesService.setContents(this.activeFile.url, contents);
    }
  }

  @action async setActiveFile(file: File) {
    console.log('setActiveFIle', file.url);
    this.activeFile = this.files[file.url] = file;
  }
}

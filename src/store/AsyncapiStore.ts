import parseApi from '@/lib/parser/dereference';
import filesService from '@/service/FilesService';
import { IndexedFile } from '@/model/project/IndexedFile';
import { AsyncAPI } from '@/model/specs/asyncapi/Asyncapi';
import router from '@/router';
import { plainToClass } from 'class-transformer';
import { JSONPath } from 'jsonpath-plus';
import path from 'path';
import { action, createModule, mutation, createProxy } from 'vuex-class-component';
import * as urlUtils from '@/lib/FileUrlUtils';
import { $Refs } from 'json-schema-ref-parser';
import { File } from '@/model/project/File';
import { AsyncapiFile } from '@/model/specs/asyncapi/AsyncapiFile';
import FileEditorStore from './FileEditorStore';
import apiParser from '@/service/ApiParser';

const VuexModule = createModule({ strict: false });

export default class AsyncapiState extends VuexModule.With({ namespaced: 'asyncapi' }) {
  miniDrawer = false;

  showTextEditor = true;
  showFormEditor = true;
  showPreview = true;

  apiFile?: AsyncapiFile = undefined;
  activeEditorFile?: IndexedFile = undefined;

  unsubscribe?: any;

  constructor() {
    super();
    console.log('constructor AsyncapiState', this);
  }

  get fileUrl() {
    return this.activeEditorFile?.file.url || '';
  }

  @mutation toggleMiniDrawer() {
    console.log(this.miniDrawer);
    this.miniDrawer = !this.miniDrawer;
  }

  @action async load() {
    console.log('asyncapi loading');
    const editorState = createProxy(this.$store, FileEditorStore);
    console.log(editorState.activeFile);
    if (editorState.activeFile) {
      this.activeEditorFile = new IndexedFile(editorState.activeFile);
      const parser = await apiParser.parseApi(this.fileUrl);
      const api = plainToClass(AsyncAPI, parser.schema);
      this.apiFile = new AsyncapiFile(this.activeEditorFile.file, api, parser.$refs);

      this.unsubscribe = editorState.$subscribe('editorContents', payload => {
        console.log('$subscribe editorContents');
      });
      console.log('subscribe', this.unsubscribe);
    } else {
      this.activeEditorFile = undefined;
    }
  }

  @action async unload() {
    console.log('unsubscribing');
    this.unsubscribe();
  }

  @action async editRef(url: string) {
    console.log('editing ref', url);
    const editorState = createProxy(this.$store, FileEditorStore);
    editorState.setActiveFile(filesService.get(url));
    router.push({ name: 'AsyncapiRef', params: { file: this.fileUrl, ref: url } }).catch();
  }

  @action async editInfo() {
    if (this.apiFile) {
      const infoState = this._edit(['$', 'info'], this.apiFile.api, this.apiFile.file.url);
    }
  }

  _edit(paths: string[], api: AsyncAPI, url: string) {
    const id = paths.map(i => i.replace(/\//g, '#')).join('/'); //replacing incompatible chars
    const component = JSONPath({ path: paths, json: api, preventEval: true });
    const originalRef = new URL(url); // TODO FIXME support multiple files
    const filename: URL = originalRef || new URL(''); // TODO FIXME support multiple files
    const indexedSourceFile = new IndexedFile(filename);
    return {
      pathId: id,
      component,
      filename,
      indexedSourceFile
    };
  }
}

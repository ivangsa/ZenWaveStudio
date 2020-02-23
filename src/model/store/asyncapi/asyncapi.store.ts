import parseApi from '../../../lib/parser/dereference';
import { IndexedSourceFile } from '../../../lib/source-mapper';
import { AsyncAPI } from '../../asyncapi/asyncapi';
import { plainToClass } from 'class-transformer';
import { JSONPath } from 'jsonpath-plus';
import path from 'path';
import { action, createModule, mutation } from 'vuex-class-component';
// import { ComponentModuleStore } from "./asyncapi.component.module";
import router from '@/router';

const VuexModule = createModule({ strict: false });

export class AsyncapiState extends VuexModule.With({ namespaced: 'asyncapi' }) {
  miniDrawer = false;

  url?: string;
  parentUrl?: string;
  rootPath?: string | null;
  api?: AsyncAPI;
  // submodules: Map<string, ComponentModuleStore> = new Map();

  get asyncapi() {
    return this.api;
  }

  get yml() {
    return JSON.stringify(this.api);
  }

  @mutation toggleMiniDrawer() {
    console.log(this.miniDrawer);
    this.miniDrawer = !this.miniDrawer;
  }

  @action async load(url: string) {
    console.log('load', url);
    const isFile = url.startsWith('file');
    this.url = url;
    this.parentUrl = path.dirname(url);
    this.rootPath = isFile ? null : this.parentUrl.toString();
    const parser = await parseApi(isFile ? url : url);
    console.log(parser);
    this.api = plainToClass(AsyncAPI, parser.schema);
    console.log(this.api);
    router.push({ name: 'Asyncapi' });
  }

  // @action async editInfo() {
  //   const infoState = this._edit(["$", "info"], this.api, this.url);
  //   const submodule: ComponentModuleStore = createSubModule(ComponentModuleStore);
  //   this.submodules.set(infoState.id, submodule);
  //   submodule.setState(infoState);
  // }

  _edit(paths: string[], api: AsyncAPI, url: URL) {
    const id = paths.map(i => i.replace(/\//g, '#')).join('/'); //replacing incompatible chars
    const component = JSONPath({ path: paths, json: api, preventEval: true });
    const originalRef = url; // TODO FIXME support multiple files
    const filename: URL = originalRef || new URL(''); // TODO FIXME support multiple files
    const indexedSourceFile = new IndexedSourceFile(filename);
    return {
      id,
      component,
      filename,
      indexedSourceFile
    };
  }
}

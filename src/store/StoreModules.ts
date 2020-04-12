// import Vue from 'vue';
import _Vue from 'vue'; // <-- notice the changed import
import { createProxy } from 'vuex-class-component';
import store from './RootStore';
import AsyncapiState from './AsyncapiStore';
import FileEditorStore from './FileEditorStore';
import ProjectStore from './ProjectStore';
import SettingsStore from './SettingsStore';

export const rootStore = store;
export const settingsState = createProxy(store, SettingsStore);
export const editorState = createProxy(store, FileEditorStore);
export const projectState = createProxy(store, ProjectStore);
export const asyncapiState = createProxy(store, AsyncapiState);

// export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
export default function StoreModulesPlugin(Vue: typeof _Vue, options?: any): void {
  Vue.prototype.$settingsState = createProxy(store, SettingsStore);
  Vue.prototype.$editorState = createProxy(store, FileEditorStore);
  Vue.prototype.$projectState = createProxy(store, ProjectStore);
  Vue.prototype.$asyncapiState = createProxy(store, AsyncapiState);
}

declare module 'vue/types/vue' {
  interface Vue {
    $settingsState: SettingsStore;
    $editorState: FileEditorStore;
    $projectState: ProjectStore;
    $asyncapiState: AsyncapiState;
  }
}

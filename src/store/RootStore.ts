import Vue from 'vue';
import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex';
import { Location, Route } from 'vue-router';
import { extractVuexModule, createProxy } from 'vuex-class-component';
import SettingsStore from './SettingsStore';
import ProjectStore from './ProjectStore';
import AsyncapiState from './AsyncapiStore';
import createVuexPersistedState from '@/plugins/vuex-persisted';
import router from '@/router';
import FileEditorStore from './FileEditorStore';
Vue.use(Vuex);

export interface RootState {
  drawer: boolean;
  currentLocation?: Location;
}

export const getters: GetterTree<RootState, RootState> = {};

export const mutations: MutationTree<RootState> = {
  togleDrawer(state) {
    state.drawer = !state.drawer;
  },
  updateLocation(state, route: Location | Route) {
    state.currentLocation = {
      name: route.name,
      path: route.path,
      hash: route.hash,
      query: route.query,
      params: route.params
    };
  }
};

export const actions: ActionTree<RootState, RootState> = {
  togleDrawer(context, state) {
    state.drawer = !state.drawer;
  }
};

const store = new Vuex.Store<RootState>({
  strict: false,
  state: {
    drawer: true
  },
  getters,
  mutations,
  actions,
  modules: {
    editor: extractVuexModule(FileEditorStore).editor,
    settings: extractVuexModule(SettingsStore).settings,
    project: extractVuexModule(ProjectStore).project,
    asyncapi: extractVuexModule(AsyncapiState).asyncapi
  },
  plugins: [createVuexPersistedState(router)]
});

export default store;
export const settingsState = createProxy(store, SettingsStore);
export const editorState = createProxy(store, FileEditorStore);
export const projectState = createProxy(store, ProjectStore);
export const asyncapiState = createProxy(store, AsyncapiState);

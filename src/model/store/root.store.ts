import Vue from "vue";
import Vuex, { MutationTree, GetterTree, ActionTree } from "vuex";
import { AsyncapiState } from "./asyncapi/asyncapi.store";
import { createModule, createSubModule, mutation, action, extractVuexModule } from "vuex-class-component";
Vue.use(Vuex);

export interface RootState {
  drawer: boolean;
}

export const getters: GetterTree<RootState, RootState> = {};

export const mutations: MutationTree<RootState> = {
  togleDrawer(state) {
    state.drawer = !state.drawer;
  }
};

export const actions: ActionTree<RootState, RootState> = {
  togleDrawer(context, state) {
    state.drawer = !state.drawer;
  }
};

const asyncapi = extractVuexModule(AsyncapiState);
console.log(asyncapi.asyncapi.actions.load);

export default new Vuex.Store<RootState>({
  state: {
    drawer: true
  },
  getters,
  mutations,
  actions,
  modules: {
    asyncapi: asyncapi.asyncapi
  }
});

import { Store } from 'vuex';
import merge from 'deepmerge';
import { RootState } from '@/store/RootStore';
import ElectronStore from 'electron-store';
import { createProxy } from 'vuex-class-component';
import ProjectStore from '@/store/ProjectStore';
import ApiParser from '@/service/ApiParser';
import VueRouter from 'vue-router';

const STORAGE_NAME = 'vuex';
const STORAGE_PROJECT_NAME = 'current_project';
const STORAGE_TEST_KEY = 'vuex-test';

type ProjectsState = { [key: string]: RootState };

export class VuexPersistedState {
  electronStorage: ElectronStore;
  projectStore: ProjectStore;

  constructor(private store: Store<RootState>, private router: VueRouter) {
    this.electronStorage = new ElectronStore({ name: STORAGE_NAME });
    this.projectStore = createProxy(store, ProjectStore);

    console.log(this.electronStorage);

    this.checkStorage();
    this.loadInitialState();
    this.subscribeOnChanges();
  }

  getState(): RootState {
    const currentProject = this.electronStorage.get(STORAGE_PROJECT_NAME);
    console.log('loading state for current project', currentProject);
    return this.getStates()[currentProject];
  }

  getStates(): ProjectsState {
    return this.electronStorage.get(STORAGE_NAME) || {};
  }

  setState(state: RootState) {
    const currentProject = this.projectStore.project;
    if (currentProject?.root.url) {
      const currentProjectKey = currentProject?.root.url;
      const states = this.getStates();
      states[currentProject?.root.url] = state;
      // console.log('persisting state', currentProjectKey, state);
      this.electronStorage.set(STORAGE_PROJECT_NAME, currentProjectKey);
      this.electronStorage.set(STORAGE_NAME, states);
    }
  }

  checkStorage() {
    try {
      this.electronStorage.set(STORAGE_TEST_KEY, STORAGE_TEST_KEY);
      this.electronStorage.get(STORAGE_TEST_KEY);
      this.electronStorage.delete(STORAGE_TEST_KEY);
    } catch (error) {
      throw new Error('[Vuex Electron] Storage is not valid. Please, read the docs.');
    }
  }

  arrayMerge(target: any[], source: any[], options: merge.Options) {
    const emptyTarget = (value: any) => (Array.isArray(value) ? [] : {});
    const clone = (value: Partial<unknown>, options: merge.Options | undefined) => merge(emptyTarget(value), value, options);
    const destination = target.slice();

    source.forEach(function(e: Partial<any>, i: number) {
      if (typeof destination[i] === 'undefined') {
        const cloneRequested = options.clone !== false;
        const shouldClone = cloneRequested && options.isMergeableObject(e);
        destination[i] = shouldClone ? clone(e, options) : e;
      } else if (options.isMergeableObject(e)) {
        destination[i] = merge(target[i], e, options);
      } else if (target.indexOf(e) === -1) {
        destination.push(e);
      }
    });

    return destination;
  }

  loadInitialState() {
    console.log('loadingInitialState');
    const state = this.getState() as any;
    if (state) {
      const mergedState = merge(this.store.state, state, { arrayMerge: this.arrayMerge });
      this.store.replaceState(mergedState);
    }
    if (this.store.state.currentLocation) {
      // console.log('replacing location', this.store.state.currentLocation);
      this.router.replace(this.store.state.currentLocation);
    }
  }

  subscribeOnChanges() {
    this.store.subscribe((mutation, state) => {
      // TODO improve performance
      this.setState(state);
    });
    this.router.afterEach((to, from) => {
      // console.log('afterEach', to, from);
      this.store.commit('updateLocation', to);
    });
  }
}

export default (router: VueRouter) => (store: Store<RootState>) => {
  new VuexPersistedState(store, router);
};

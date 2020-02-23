import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IndexedSourceFile } from "@/lib/source-mapper";

export class ComponentModuleStore extends VuexModule {
  pathId?: string;
  paths?: string[];
  component = null;
  filename?: string | URL;
  indexedSourceFile?: IndexedSourceFile;

  @Mutation setState(state: Partial<ComponentModuleStore>) {
    Object.assign(this, state);
  }
}

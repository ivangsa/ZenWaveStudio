<template>
  <div>
    <v-toolbar dense @click="toggleMiniDrawer">
      <v-toolbar-title @click="toggleMiniDrawer">Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>fa-clock</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>
<script lang="ts">
import { State, namespace } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';
import { AsyncapiState } from '@/model/store/asyncapi/asyncapi.store';
import { AsyncAPI } from '@/model/asyncapi/asyncapi';

const AsyncapiStore = namespace('asyncapi');

@Component
export default class SideBarComponent extends Vue {
  @AsyncapiStore.State miniDrawer?: boolean;
  @AsyncapiStore.Mutation toggleMiniDrawer?: any;
}
</script>

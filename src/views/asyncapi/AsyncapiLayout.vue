<template>
  <v-layout class="red lighten-5">
    <v-navigation-drawer permanent clipped width="30%" :mini-variant="miniDrawer">
      <router-view name="sidebar" />
    </v-navigation-drawer>
    <v-container no-gutters class="grey lighten-5" style="max-width: 100%; padding: 0;">
      <v-row no-gutters>
        <v-col cols="12">
          <v-toolbar dense width="100%">
            <v-toolbar-title>Title</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>fa-clock</v-icon>
            </v-btn>
          </v-toolbar>
        </v-col>
      </v-row>
      <v-row fill-height style="height: 100%" no-gutters>
        <v-col cols="6" fill-height height="100%">
          <v-card class="pa-2" outlined tile fill-height height="100%">
            <router-view name="editor" />
          </v-card>
        </v-col>
        <v-col cols="6" fill-height height="100%">
          <v-card class="pa-2" outlined tile fill-height height="100%">
            <router-view name="preview" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { State, namespace } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';
import { AsyncapiState } from '@/model/store/asyncapi/asyncapi.store';
import { AsyncAPI } from '@/model/asyncapi/asyncapi';

const AsyncapiStore = namespace('asyncapi');

@Component
export default class AsyncapiLayout extends Vue {
  @AsyncapiStore.State miniDrawer?: boolean;
}
</script>

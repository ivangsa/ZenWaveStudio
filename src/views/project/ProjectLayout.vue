<template>
  <multipane :style="{ height: '906px' }">
    <multipane layout="horizontal" :style="{ height: '100%', minWidth: '150px', maxWidth: '400px', width: '20%' }">
      <router-view name="files" :style="{ height: '40%' }" />
      <multipane-resizer></multipane-resizer>
      <router-view name="sidebar" :style="{ height: '60%' }" />
    </multipane>

    <multipane-resizer></multipane-resizer>

    <v-container no-gutters class="grey lighten-5" style="width: 80%; max-width: 100%; padding: 0; flex-grow: 1">
      <v-row no-gutters>
        <v-col>
          <ProjectToolbarComponent />
        </v-col>
      </v-row>
      <v-row style="height: 100%" no-gutters>
        <v-col>
          <router-view name="editor" />
        </v-col>
      </v-row>
    </v-container>
  </multipane>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Multipane, MultipaneResizer } from '@/views/components/multipane';
import ProjectToolbarComponent from './ProjectToolbarComponent.vue';
import AsyncapiState from '@/store/AsyncapiStore';
import { AsyncAPI } from '@/model/specs/asyncapi/Asyncapi';

@Component({
  components: {
    Multipane,
    MultipaneResizer,
    ProjectToolbarComponent
  }
})
export default class ProjectLayout extends Vue {
  miniDrawer = false;

  xxxxbeforeRouteEnter(to: any, from: any, next: any) {
    next((vm: ProjectLayout) => {
      console.log('beforeRouteEnter', vm.$store.state.asyncapi.api);
      if (!vm.$store.state.asyncapi.api) {
        vm.$router.push({ name: 'Home' });
      }
    });
  }
}
</script>

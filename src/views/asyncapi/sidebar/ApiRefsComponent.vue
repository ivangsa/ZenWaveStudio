<template>
  <v-list dense>
    <v-subheader>Asyncapi $refs</v-subheader>
    <v-list-item-group color="primary">
      <v-list-item v-for="($ref, i) in refs" :key="i" @click="editRef($ref)">
        <v-list-item-icon style="margin-right: 5px">
          <v-icon>mdi-file</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-list-item-title v-text="filename($ref.path)" v-on="on"></v-list-item-title>
              <v-list-item-subtitle v-text="$ref.path" v-on="on"></v-list-item-subtitle>
            </template>
            <span>{{ $ref.path }}</span>
          </v-tooltip>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import path from 'path';
import { Component, Vue } from 'vue-property-decorator';
// import { $Refs } from 'json-schema-ref-parser';

@Component
export default class ApiRefsComponent extends Vue {
  get refs() {
    return this.$asyncapiState.apiFile?.$refs?._$refs;
  }

  filename(url: string) {
    return path.basename(url);
  }

  editRef(ref: any) {
    this.$asyncapiState.editRef(ref.path);
  }
}
</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="$store.state.drawer" app clipped>
      <v-list dense>
        <v-list-item @click="$router.push({ name: 'Home' })">
          <v-list-item-action>
            <v-icon>mdi-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$router.push({ name: 'Settigns' })">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settigns</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$router.push({ name: 'About' })">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-row no-gutters fill-height>
      <v-col cols="4" height="100%">
        <v-card class="pa-2" outlined tile height="100%">
          .col-4<br />Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.
        </v-card>
      </v-col>
      <v-col cols="8" height="100%">
        <v-card class="pa-2" outlined tile height="100%"> .col-6<br />Subsequent columns continue along the new line. </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

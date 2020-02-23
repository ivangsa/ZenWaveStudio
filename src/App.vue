<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left>
      <v-menu offset-y close-on-click>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item @click="$router.push({ name: 'Home' })">
            <v-list-item-action>
              <v-icon>fa-clock</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="$router.push({ name: 'Asyncapi' })">
            <v-list-item-action>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Asyncapi</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="$router.push({ name: 'Settings' })">
            <v-list-item-action>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
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
      </v-menu>
      <v-toolbar-title>ZenWave Studio</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height id="main-container">
        <router-view />
      </v-container>
    </v-content>

    <v-footer id="footer" app clipped>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
html {
  font-size: 12px; // not working
}
#footer {
  z-index: 10;
  position: relative;
}
#main-container {
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
}
</style>

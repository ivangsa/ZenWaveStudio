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
              <v-icon>fa-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
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
              <v-icon>mdi-about</v-icon>
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
body {
  height: 970px;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #03a9f4 !important;
  outline: 1px solid #03a9f4 !important;
}
#footer {
  z-index: 10;
}
#main-container {
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
}
</style>

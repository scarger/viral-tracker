<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="$router.replace('/')"></v-app-bar-nav-icon>
      <v-toolbar-title>Viral Meter</v-toolbar-title>
      <v-icon style="padding-left: 10px" color="yellow" size="30px">mdi-trending-up</v-icon>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon size="30px">mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content align="center">
      <router-view></router-view>
    </v-content>

    <v-footer class="align-content-center" dark padless>
      <v-card class="text-center" width="100%">
        <v-card-text>Developed by Omar Elnagmi</v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  })
})
</script>

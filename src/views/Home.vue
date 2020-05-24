<template>
  <div class="home mt-5">
    <v-img class="mx-auto" alt="Viral Tracker Logo" src="../assets/logo.png" width="220" height="220">
      <template v-slot:placeholder>
        <v-row class="fill-height align-center justify-center">
          <v-progress-circular color="primary" indeterminate></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <Searcher/>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Searcher from '@/components/Searcher.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Searcher
  }
})
</script>

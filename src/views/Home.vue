<template>
  <div class="home mt-5">
    <img alt="Vue logo" src="../assets/logo.png" width="220px">
    <Searcher/>
  </div>
</template>

<script>
// @ is an alias to /src
import { defineComponent } from '@vue/composition-api'
import Searcher from '@/components/Searcher.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Searcher
  }
})
</script>

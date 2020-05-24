<template>
  <div class="search">
    <v-container fluid>
      <v-row>
        <v-spacer></v-spacer>
        <v-col md="4">
          <v-card class="pa-6">
            <v-card-title class="mx-0">Find what's trending!</v-card-title>
            <v-form ref="form" class="mx-2">
              <v-text-field append-icon="mdi-magnify" label="search" @keyup.enter="doSearch" v-model="search.query" :rules="[v => !!v || 'Required']"></v-text-field>
              <v-btn color="primary" @click="doSearch">Search</v-btn>
            </v-form>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, reactive, Ref, ref
} from '@vue/composition-api'

import { Search } from '@/model/search'

export default defineComponent({
  name: 'Searcher',
  setup (props, context) {
    const search: Search = reactive({
      query: '',
      filters: []
    })

    const form: Ref<any> = ref(null)

    function doSearch () {
      if (form.value != null && form.value.validate()) {
        context.root.$router.push({ path: 'result', query: { q: search.query, filters: search.filters.map(filter => filter.site).join(',') } })
      }
    }

    return { search, doSearch, form }
  }
})
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
  <div style="height: 100%" class="about">
    <v-container fluid v-if="siteList">
      <h1 class="py-10 mx-auto">You just searched up {{ searchKey }}</h1>
      <v-row>
        <v-col class="mx-auto" md="4">
          <v-simple-table>
            <thead>
            <tr>
              <th class="text-center">Brand</th>
              <th class="text-center">Site</th>
              <th class="text-center">Count</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="result in siteList" :key="result.name">
              <td>
                <v-icon color="blue">mdi-{{ result.name }}</v-icon>
              </td>
              <td>
                <a :href="result.url">{{ result.name }}</a>
              </td>
              <td>{{ result.count }}</td>
            </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else fill-height fluid>
      <v-progress-circular indeterminate class="ma-auto" size=64 width=7></v-progress-circular>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api'
import { SiteResult, ResultCrawler } from '@/util/result-crawler'

export default defineComponent({
  name: 'Result',
  setup (props, context) {
    const searchKey = ref(context.root.$route.query.q)
    const crawler = new ResultCrawler()
    const siteList: Ref<SiteResult[] | null> = ref(null)
    Promise.all([crawler.count('facebook.com'), crawler.count('twitter.com'), crawler.count('instagram.com')])
      .then((sites) => {
        sites.sort((a, b) => a.count > b.count ? 1 : -1)
        siteList.value = sites
      })
    return { searchKey, siteList }
  }
})

</script>

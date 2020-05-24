<template>
  <div style="height: 100%" class="about">
    <v-container fluid v-if="siteList">
      <h1>{{ count.toFixed(0) * 30 }}</h1>
      <v-progress-linear
        style="width: 200px"
        height="20" color="light-blue"
        class="mx-auto my-4"
        striped :value="count"></v-progress-linear>
      <v-card class="mx-auto pa-5" width="450">
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
              <a :href="result.url" target="_blank">{{ result.name }}</a>
            </td>
            <td>
              <v-avatar color="success" size="32">
                <span style="color: whitesmoke">{{ result.count }} </span>
              </v-avatar>
            </td>
          </tr>
          </tbody>
        </v-simple-table>
        <v-card-actions class="justify-center">
          <v-btn color="primary" class="ma-2" fab @click="$router.replace('/')">
            <v-icon primary>mdi-magnify</v-icon>
          </v-btn>
          <v-btn color="cyan" class="ma-2" fab @click="refresh">
            <v-icon primary>mdi-reload</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-container v-else fill-height fluid>
      <v-progress-circular indeterminate class="ma-auto" size=64 width=6></v-progress-circular>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api'
import { SiteResult, ResultCrawler } from '@/util/result-crawler'
import gsap from 'gsap'

export default defineComponent({
  name: 'Result',
  setup (props, context) {
    const searchKey = ref(context.root.$route.query.q)
    const crawler = new ResultCrawler(searchKey.value)
    const siteList: Ref<SiteResult[] | null> = ref(null)
    const count = ref(0)

    function refresh () {
      siteList.value = null
      Promise.all([crawler.simCount('facebook.com'), crawler.simCount('twitter.com'), crawler.simCount('instagram.com')])
        .then((sites) => {
          sites.sort((a, b) => a.count < b.count ? 1 : -1)
          const currVal = { value: 0 }
          count.value = 0
          gsap.to(currVal, { value: sites.map(site => site.count).reduce((curr, next) => curr + next) })
            .eventCallback('onUpdate', () => { count.value = currVal.value / 30 })
            .duration(1)
          siteList.value = sites
        })
    }
    refresh()

    return { searchKey, siteList, count, refresh }
  }
})

</script>

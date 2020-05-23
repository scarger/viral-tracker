<template>
  <div class="about">
    <h1>You just searched up {{ searchKey }}</h1>
    <v-simple-table v-if="siteList">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Site</th>
          <th class="text-right">Count</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="result in siteList" :key="result.name">
          <td>
            <a :href="result.url">{{ result.name }}</a>
          </td>
          <td>{{ result.count }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-progress-circular indeterminate v-else></v-progress-circular>
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

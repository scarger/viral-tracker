import * as htmlParser from 'node-html-parser'

export class SiteResult {
  url: string
  name: string
  count: number

  constructor (site: string, count: number) {
    this.url = `https://${site}`
    this.name = SiteResult.toName(site)
    this.count = count
  }

  static toName (url: string): string {
    return url.substring(0, url.indexOf('.'))
  }
}

export class ResultCrawler {
  searchKey: string
  constructor (searchKey: any) {
    this.searchKey = searchKey
  }

  //  todo CORS problem -> Google blocking? - research
  async count (site: string): Promise<SiteResult> {
    const res: Response =
      await fetch(`https://www.google.com/search?q=${this.searchKey}&as_sitesearch=${site}`, {
        mode: 'no-cors'
      })
    const raw = await res.text()
    console.log(raw)
    const root: any = htmlParser.parse(raw)
    const numberArea = root.querySelector('#result-stats')
    return new SiteResult(site, 0)
  }

  async simCount (site: string): Promise<SiteResult> {
    return new Promise<SiteResult>(resolve =>
      setTimeout(() => resolve(new SiteResult(site, Math.trunc(Math.random() * 1000))), 2000))
  }
}

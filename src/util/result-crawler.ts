
// const axios = require('axios').default

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
  async count (site: string): Promise<SiteResult> {
    return new Promise<SiteResult>(resolve => setTimeout(() => resolve(new SiteResult(site, 0)), 2000))
  }
}

import { JSDOM } from 'jsdom'
import { readFileSync } from 'fs'
import { basename, dirname, join } from 'path'
import { fileURLToPath } from 'url'

interface NearestStationsSellingCommodityResult {
  stationName: string
  stationId: string
  stationDistanceInsideSystem: string
  systemName: string
  starSystemDistanceToReferenceSystem: string
  supply: string
  lastUpdated: string
  isPlanetaryStation: boolean
}

export async function getNearestStationsSellingCommodity(commodityName: string, referenceSystem: string) {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const commodityName2Id: Record<string, string> = JSON.parse(
    readFileSync(join(__dirname, 'commodities-options.json'), 'utf-8'),
  ) as Record<string, string>
  if (!commodityName2Id[commodityName]) {
    console.error(`Commodity name "${commodityName}" not found in commodities-options.json`)
    return
  }
  const url = new URL('https://inara.cz/elite/commodities/')
  const params = new URLSearchParams({
    formbrief: '1',
    pi1: '1',
    'pa1[]': commodityName2Id[commodityName],
    ps1: referenceSystem,
    pi10: '3',
    pi11: '5000',
    pi3: '3',
    pi9: '10000',
    pi4: '0',
    pi14: '0',
    pi5: '0',
    pi12: '0',
    pi7: '0',
    pi8: '1',
    pi13: '1',
  })
  url.search = params.toString()
  const t = await fetch(url.toString(), {
    credentials: 'include',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:141.0) Gecko/20100101 Firefox/141.0',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      'Sec-GPC': '1',
      Priority: 'u=0, i',
    },
    method: 'GET',
    mode: 'no-cors',
  })

  const text = await t.text()
  const dom = new JSDOM(text)
  const doc = dom.window.document
  const table = doc.querySelector('.tablesortercollapsed')
  if (!table) {
    console.error('Table not found')
    return
  }
  const headRows = table.querySelectorAll('thead tr')
  if (headRows.length === 0) {
    console.error('No header rows found in the table')
    return
  }
  const bodyRows = table.querySelectorAll('tbody tr')
  if (bodyRows.length === 0) {
    console.error('No body rows found in the table')
    return
  }
  if (!headRows[0]) {
    console.error('No header row found in the table')
    return
  }
  const headers = Array.from(headRows[0].querySelectorAll('th')).map((th) => th.textContent?.trim() ?? '')
  const results = Array.from(bodyRows.values()).map((row) => {
    const cells = Array.from(row.querySelectorAll('td'))
    const rowData: NearestStationsSellingCommodityResult = {
      stationName: '',
      stationId: '',
      systemName: '',
      isPlanetaryStation: false,
      stationDistanceInsideSystem: '',
      starSystemDistanceToReferenceSystem: '',
      supply: '',
      lastUpdated: '',
    }
    cells.forEach((cell, index) => {
      const header = headers[index]
      if (!header) {
        console.warn(`Header at index ${index} is empty`)
        return
      }
      if (!cell) {
        console.warn(`Cell at index ${index} is empty for header "${header}"`)
        return
      }
      if (header === 'Location') {
        rowData.stationName = cell.querySelector('a span.standardcase.standardcolor')?.textContent?.trim() ?? ''
        const stationUrl = (cell.querySelector('a')?.getAttribute('href') ?? '').trim()
        rowData.stationId = basename(stationUrl)
        rowData.systemName = cell.querySelector('a span.uppercase.nowrap')?.textContent?.trim() ?? ''
        const iconStyle = cell.querySelector('a span div.stationicon')?.getAttribute('style') ?? ''
        rowData.isPlanetaryStation = iconStyle.includes('-182px')
      } else if (header === 'St dist') {
        rowData.stationDistanceInsideSystem = cell.textContent?.trim() ?? ''
      } else if (header === 'Distance') {
        rowData.starSystemDistanceToReferenceSystem = cell.firstChild?.textContent?.trim() ?? ''
      } else if (header === 'Supply') {
        rowData.supply = cell.lastChild?.textContent?.trim() ?? ''
      } else if (header === 'Updated') {
        rowData.lastUpdated = cell.firstChild?.textContent?.trim() ?? ''
      } else {
        console.warn(`Unhandled header "${header}" at index ${index}`)
      }
    })
    return rowData
  })
  // return top 5
  return results.slice(0, 5).sort((a, b) => {
    const aDistance = parseFloat(a.starSystemDistanceToReferenceSystem.replace('ly', '').trim())
    const bDistance = parseFloat(b.starSystemDistanceToReferenceSystem.replace('ly', '').trim())
    return aDistance - bDistance
  })
}

// getNearestStationsSellingCommodity(
//   process.argv[2] ?? 'Emergency Power Cells',
//   process.argv[3] ?? 'Col 285 Sector IF-T b18-9',
// ).catch((err) => {
//   console.error('Error:', err)
//   process.exitCode = 1
// })

import { join } from 'path'
import { z, ZodError } from 'zod'
import { GetNearestStationsSellingCommodityOptions } from './schemas/nearest-stations-selling-commodity-result.schema'
import { StationSearchResultsSchema } from './schemas/station-results.schema'

export const SearchSaveResultSchema = z.object({
  search_reference: z.string(),
})

export type SearchSaveResult = z.infer<typeof SearchSaveResultSchema>

export class SpanshClient {
  private static readonly BASE_URL = 'https://spansh.co.uk/api/'
  private static readonly HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:141.0) Gecko/20100101 Firefox/141.0',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'en-US',
    Origin: 'https://www.spansh.co.uk',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-GPC': '1',
  }
  private static readonly API_URLS = {
    stationSearch: join(SpanshClient.BASE_URL, 'stations', 'search'),
  }

  async getNearestStationsSellingCommodity<T>(
    options: GetNearestStationsSellingCommodityOptions,
    schema: z.ZodSchema<T> = StationSearchResultsSchema as unknown as z.ZodSchema<T>,
  ): Promise<T> {
    const { commodityName, referenceSystem, primaryEconomy, distance } = options
    const searchRequest = {
      filters: {
        primary_economy: primaryEconomy ? { value: [primaryEconomy] } : undefined,
        distance: distance ? { min: distance.min.toString(), max: distance.max.toString() } : undefined,
        has_market: { value: true },
        has_large_pad: { value: true },
        market: [{ name: commodityName, supply: { value: ['1', Number.MAX_SAFE_INTEGER], comparison: '<=>' } }],
        type: {
          value: [
            'Asteroid base',
            'Coriolis Starport',
            'Dockable Planet Station',
            'Mega ship',
            'Ocellus Starport',
            'Orbis Starport',
            'Outpost',
            'Planetary Construction Depot',
            'Planetary Outpost',
            'Planetary Port',
            'Settlement',
            'Space Construction Depot',
            'Surface Settlement',
          ],
        },
      },
      sort: [{ distance: { direction: 'asc' } }],
      size: 5,
      page: 0,
      reference_system: referenceSystem,
    }
    const searchBaseUrl = SpanshClient.API_URLS.stationSearch
    return await this.doSearch(searchBaseUrl, searchRequest, schema)
  }

  // The search API is async, it retuns a job ID (search_reference) that can be used to poll for results
  // makes a search and waits for the result
  private async doSearch<T>(searchBaseUrl: string, searchRequest: any, schema: z.ZodSchema<T>): Promise<T> {
    const searchSaveUrl = new URL(join(searchBaseUrl, 'save'))
    const response = await fetch(searchSaveUrl, {
      method: 'POST',
      headers: SpanshClient.HEADERS,
      body: JSON.stringify(searchRequest),
    })
    const data = SearchSaveResultSchema.parse(await response.json())
    if (!data.search_reference) {
      console.dir(
        {
          data,
          searchSaveUrl,
        },
        { depth: null },
      )
      throw new Error('Search reference not found in response')
    }
    return this.getSearchResult<T>(searchBaseUrl, data.search_reference, schema)
  }

  private async getSearchResult<T>(searchBaseUrl: string, searchReference: string, schema: z.ZodSchema<T>): Promise<T> {
    const recallUrl = new URL(join(searchBaseUrl, 'recall', searchReference))
    let attempt = 0
    const maxAttempts = 3
    const baseDelay = 1000
    let json: unknown
    do {
      try {
        const response = await fetch(recallUrl, {
          method: 'GET',
          headers: SpanshClient.HEADERS,
          signal: AbortSignal.timeout(30000),
        })
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        json = await response.json()
        const data = schema.parse(json)
        return data
      } catch (error) {
        attempt++
        if (attempt >= maxAttempts) {
          throw new Error(
            `Failed to get search result after ${maxAttempts} attempts: ${
              error instanceof ZodError
                ? JSON.stringify(error.issues)
                : error instanceof Error
                  ? error.message
                  : String(error)
            }, received data: ${JSON.stringify(json)}`,
          )
        }
        // Exponential backoff
        const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000
        console.warn(`Search result attempt ${attempt} failed, retrying in ${Math.round(delay)}ms...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    } while (attempt < maxAttempts)

    // This should never be reached due to the throw in the catch block
    throw new Error('Unexpected end of retry loop')
  }
}

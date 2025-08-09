import { z } from 'zod'
import { StationSearchResultsSchema } from './station-results.schema'

export type NearestStationsSellingCommodityResults = z.infer<typeof StationSearchResultsSchema>

export const GetNearestStationsSellingCommodityOptionsSchema = z.object({
  commodityName: z.string().describe('The name of the commodity to search for.'),
  referenceSystem: z
    .string()
    .describe('The reference system from which to find the nearest stations selling the commodity.'),
  primaryEconomy: z.string().optional().describe('The primary economy to filter the search results.'),
  distance: z
    .object({
      min: z.number().describe('The minimum distance in light years to filter the search results.'),
      max: z.number().describe('The maximum distance in light years to filter the search results.'),
    })
    .optional(),
})

export type GetNearestStationsSellingCommodityOptions = z.infer<typeof GetNearestStationsSellingCommodityOptionsSchema>

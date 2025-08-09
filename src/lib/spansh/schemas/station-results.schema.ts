import { z } from 'zod'

export const StationSearchResultMarketSchema = z.object({
      buy_price: z.number(),
      category: z.string(),
      commodity: z.string(),
      demand: z.number(),
      sell_price: z.number(),
      supply: z.number(),
    })

export const StationSearchResultSchema = z.object({
  controlling_minor_faction: z.string(),
  controlling_minor_faction_state: z.string(),
  distance: z.number(),
  distance_to_arrival: z.number(),
  economies: z.array(
    z.object({
      name: z.string(),
      share: z.number(),
    }),
  ),
  export_commodities: z.array(
    z.object({
      name: z.string(),
    }),
  ),
  government: z.string(),
  has_large_pad: z.boolean(),
  has_market: z.boolean(),
  id: z.string(),
  import_commodities: z.array(
    z.object({
      name: z.string(),
    }),
  ),
  is_planetary: z.boolean(),
  large_pads: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  market: z.array(StationSearchResultMarketSchema),
  market_id: z.number(),
  market_updated_at: z.string(),
  medium_pads: z.number(),
  name: z.string(),
  primary_economy: z.string(),
  services: z.array(
    z.object({
      name: z.string(),
    }),
  ),
  small_pads: z.number(),
  system_id64: z.number(),
  system_is_colonised: z.boolean(),
  system_name: z.string(),
  system_power: z.array(z.string()),
  system_primary_economy: z.string(),
  system_secondary_economy: z.string(),
  system_x: z.number(),
  system_y: z.number(),
  system_z: z.number(),
  type: z.string(),
  updated_at: z.string(),
}).partial()
export type StationSearchResult = z.infer<typeof StationSearchResultSchema>

export const StationSearchResultsSchema = z.object({
  results: z.array(StationSearchResultSchema),
  count: z.number(),
  from: z.number(),
  search_reference: z.string(),
  size: z.number(),
})
export type StationSearchResults = z.infer<typeof StationSearchResultsSchema>

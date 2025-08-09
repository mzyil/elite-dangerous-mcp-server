import { BaseTool } from '@mzyil/typescript-mcp-framework/tool/BaseTool.js'
import { z } from 'zod'
import { SpanshClient } from '../lib/spansh/spansh-client'
import {
  GetNearestStationsSellingCommodityOptions,
  GetNearestStationsSellingCommodityOptionsSchema,
} from '../lib/spansh/schemas/nearest-stations-selling-commodity-result.schema'
import { StationSearchResultSchema, StationSearchResultsSchema } from '../lib/spansh/schemas/station-results.schema'

const GetNearestStationsSellingCommodityInputSchema = GetNearestStationsSellingCommodityOptionsSchema.pick({
  commodityName: true,
  referenceSystem: true,
}).extend({
  shipLadenRange: z.number().min(1).describe("The range of the ship's cargo capacity in tons."),
})

type GetNearestStationsSellingCommodityInput = z.infer<typeof GetNearestStationsSellingCommodityInputSchema>

const GetNearestStationsSellingCommodityOutputSchema = StationSearchResultsSchema.pick({
  results: true,
})
  .extend({
    results: z.array(
      StationSearchResultSchema.pick({
        distance: true,
        distance_to_arrival: true,
        primary_economy: true,
        system_primary_economy: true,
        system_secondary_economy: true,
        economies: true,
        export_commodities: true,
        has_market: true,
        id: true,
        is_planetary: true,
        market_id: true,
        market_updated_at: true,
        name: true,
        type: true,
        updated_at: true,
      }).strip(),
    ),
  })
  .strip()
type GetNearestStationsSellingCommodityOutput = z.infer<typeof GetNearestStationsSellingCommodityOutputSchema>

export class GetNearestStationsSellingCommodityTool extends BaseTool<
  GetNearestStationsSellingCommodityInput,
  GetNearestStationsSellingCommodityOutput
> {
  spanshClient = new SpanshClient()

  constructor() {
    super({
      toolPathName: 'get-nearest-stations-selling-commodity',
      title: 'get-nearest-stations-selling-commodity',
      description: 'Lists the nearest stations selling a specific commodity from a reference system.',
      inputSchema: GetNearestStationsSellingCommodityInputSchema,
      outputSchema: GetNearestStationsSellingCommodityOutputSchema,
    })
  }

  async execute(input: GetNearestStationsSellingCommodityInput) {
    const transformedInput: GetNearestStationsSellingCommodityOptions =
      GetNearestStationsSellingCommodityInputSchema.parse(input)
    transformedInput.distance = input.shipLadenRange ? { min: 0, max: input.shipLadenRange * 2 } : undefined
    return await this.spanshClient.getNearestStationsSellingCommodity(transformedInput, this.outputSchema)
  }
}

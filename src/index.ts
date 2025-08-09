import { Server } from '@mzyil/typescript-mcp-framework/server.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { GetNearestStationsSellingCommodityTool } from './tools/GetNearestStationsSellingCommodityTool'

export async function main() {
  const tools = [GetNearestStationsSellingCommodityTool]
  const server = new Server(
    tools,
    {
      name: 'Elite Dangerous MCP Server',
      title: 'Elite Dangerous MCP Server',
      version: '0.0.1',
    },
    {
      stripMetaSchemaFeatures: !!process.env.STRIP_META_SCHEMA,
    },
  )
  const transport = new StdioServerTransport()
  return await server.connect(transport)
}

if (require.main === module) {
  main().catch((error) => {
    console.error('Error starting server:', error)
    process.exitCode = 1
  })
}

# Elite Dangerous MCP Server

A Model Context Protocol (MCP) server for Elite Dangerous that provides tools to query game data and assist with trading, exploration, and other activities in the Elite Dangerous universe.

> **⚠️ Active Development**: This project is currently in active development. Features and APIs may change. Contributions, suggestions, and ideas for new tools are very welcome!

## Features

- **Station Search**: Find the nearest stations selling specific commodities
- **Market Data**: Access real-time market information from the Elite Dangerous community
- **Trading Tools**: Optimize trading routes and commodity searches

## Tools Available

> 📋 **See it in action**: Check out [EXAMPLE.md](EXAMPLE.md) for a detailed example of using this MCP server to plan complex trading routes in Elite Dangerous.

### `get-nearest-stations-selling-commodity`

Lists the nearest stations selling a specific commodity from a reference system.

**Parameters:**
- `commodityName` (string): The name of the commodity to search for
- `referenceSystem` (string): The reference system from which to find the nearest stations
- `shipLadenRange` (number): The range of the ship's cargo capacity in tons (minimum: 1)

**Returns:**
- A list of stations with details including:
  - Distance from reference system
  - Distance to arrival at station
  - Market information and economies
  - Station type and planetary status
  - Market update timestamps

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd elite-dangerous-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npx tsc
```

## Usage

### As an MCP Server

This server implements the Model Context Protocol and can be used with any MCP-compatible client.

#### Running with uvx and mcpo

```bash
uvx mcpo --port 7000 --api-key "your-api-key" -- npx tsx src/index.ts
```

#### Configuration

The server can be configured with the following environment variables:
- `STRIP_META_SCHEMA`: Set to any truthy value to strip meta schema features

### Integration with Claude Desktop

Add this server to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "elite-dangerous": {
      "command": "npx",
      "args": ["tsx", "/path/to/elite-dangerous-mcp-server/src/index.ts"]
    }
  }
}
```

## Data Sources

This MCP server integrates with:
- **Spansh API**: For station and market data queries
- **Inara**: For commodity information and market data

## Development

### Project Structure

```
src/
├── index.ts                    # Main server entry point
├── lib/
│   ├── inara/                 # Inara API integration
│   │   ├── commodities-options.json
│   │   └── inara.ts
│   └── spansh/                # Spansh API integration
│       ├── spansh-client.ts
│       └── schemas/           # TypeScript schemas for API responses
└── tools/                     # MCP tools implementation
    └── GetNearestStationsSellingCommodityTool.ts
```

### Building

```bash
npx tsc
```

### Linting

```bash
npx eslint .
```

## Dependencies

- **@modelcontextprotocol/sdk**: Core MCP SDK
- **@mzyil/typescript-mcp-framework**: TypeScript framework for MCP servers
- **zod**: Runtime type validation
- **jsdom**: DOM manipulation for web scraping

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions to expand the functionality of this MCP server! Here are some ideas for additional tools that would be valuable:

### Potential Tool Ideas
- **Route Planning**: Multi-hop trading route optimization
- **Exploration Tools**: Undiscovered system finder, exploration route planning
- **Engineering**: Material location finder, blueprint requirements
- **Combat**: Conflict zone finder, bounty hunting locations
- **Mining**: Hotspot locator, mining equipment recommendations
- **Fleet Carriers**: Carrier market search, parking location finder
- **Community Goals**: Current CG status and participation tools
- **Powerplay**: Territory control information, merit optimization
- **Guardian/Thargoid Sites**: Archaeological site locations and requirements

### How to Contribute

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

For new tool ideas or feature requests, please open an issue to discuss the implementation approach.

## Disclaimer

This tool is for educational and personal use. Please respect the terms of service of the data providers (Spansh, Inara) and the game itself. Elite Dangerous is a trademark of Frontier Developments plc.
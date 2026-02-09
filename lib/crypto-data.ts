export interface CryptoAsset {
  id: string
  rank: number
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  circulatingSupply: number
  totalSupply: number
  allTimeHigh: number
  allTimeHighDate: string
  sparkline7d: number[]
  icon: string
}

export interface MarketStats {
  totalMarketCap: number
  btcDominance: number
  ethGasFees: number
  totalVolume24h: number
  activeCryptos: number
}

const COIN_DATA: Omit<CryptoAsset, "sparkline7d">[] = [
  { id: "bitcoin", rank: 1, name: "Bitcoin", symbol: "BTC", price: 97245.32, change24h: 2.14, marketCap: 1920000000000, volume24h: 42300000000, circulatingSupply: 19800000, totalSupply: 21000000, allTimeHigh: 109000, allTimeHighDate: "2025-01-20", icon: "BTC" },
  { id: "ethereum", rank: 2, name: "Ethereum", symbol: "ETH", price: 3842.17, change24h: -1.23, marketCap: 462000000000, volume24h: 18700000000, circulatingSupply: 120200000, totalSupply: 120200000, allTimeHigh: 4891, allTimeHighDate: "2021-11-10", icon: "ETH" },
  { id: "tether", rank: 3, name: "Tether", symbol: "USDT", price: 1.00, change24h: 0.01, marketCap: 139000000000, volume24h: 61000000000, circulatingSupply: 139000000000, totalSupply: 139000000000, allTimeHigh: 1.32, allTimeHighDate: "2018-07-24", icon: "USDT" },
  { id: "bnb", rank: 4, name: "BNB", symbol: "BNB", price: 714.82, change24h: 1.87, marketCap: 104000000000, volume24h: 2100000000, circulatingSupply: 145900000, totalSupply: 145900000, allTimeHigh: 793, allTimeHighDate: "2024-12-04", icon: "BNB" },
  { id: "solana", rank: 5, name: "Solana", symbol: "SOL", price: 242.68, change24h: 4.52, marketCap: 118000000000, volume24h: 5800000000, circulatingSupply: 486400000, totalSupply: 594700000, allTimeHigh: 295, allTimeHighDate: "2025-01-19", icon: "SOL" },
  { id: "xrp", rank: 6, name: "XRP", symbol: "XRP", price: 2.89, change24h: -0.67, marketCap: 166000000000, volume24h: 8900000000, circulatingSupply: 57400000000, totalSupply: 100000000000, allTimeHigh: 3.84, allTimeHighDate: "2018-01-07", icon: "XRP" },
  { id: "usdc", rank: 7, name: "USD Coin", symbol: "USDC", price: 1.00, change24h: 0.00, marketCap: 56000000000, volume24h: 8200000000, circulatingSupply: 56000000000, totalSupply: 56000000000, allTimeHigh: 1.17, allTimeHighDate: "2019-05-08", icon: "USDC" },
  { id: "cardano", rank: 8, name: "Cardano", symbol: "ADA", price: 1.12, change24h: 3.21, marketCap: 39400000000, volume24h: 1200000000, circulatingSupply: 35200000000, totalSupply: 45000000000, allTimeHigh: 3.10, allTimeHighDate: "2021-09-02", icon: "ADA" },
  { id: "dogecoin", rank: 9, name: "Dogecoin", symbol: "DOGE", price: 0.412, change24h: -2.34, marketCap: 60800000000, volume24h: 4100000000, circulatingSupply: 147600000000, totalSupply: 147600000000, allTimeHigh: 0.74, allTimeHighDate: "2021-05-08", icon: "DOGE" },
  { id: "avalanche", rank: 10, name: "Avalanche", symbol: "AVAX", price: 42.17, change24h: 5.67, marketCap: 17200000000, volume24h: 890000000, circulatingSupply: 408000000, totalSupply: 720000000, allTimeHigh: 146.22, allTimeHighDate: "2021-11-21", icon: "AVAX" },
  { id: "tron", rank: 11, name: "TRON", symbol: "TRX", price: 0.267, change24h: 1.12, marketCap: 23100000000, volume24h: 620000000, circulatingSupply: 86500000000, totalSupply: 86500000000, allTimeHigh: 0.30, allTimeHighDate: "2024-12-03", icon: "TRX" },
  { id: "polkadot", rank: 12, name: "Polkadot", symbol: "DOT", price: 8.94, change24h: -1.89, marketCap: 13800000000, volume24h: 450000000, circulatingSupply: 1540000000, totalSupply: 1540000000, allTimeHigh: 55.00, allTimeHighDate: "2021-11-04", icon: "DOT" },
  { id: "chainlink", rank: 13, name: "Chainlink", symbol: "LINK", price: 24.67, change24h: 2.78, marketCap: 15800000000, volume24h: 780000000, circulatingSupply: 640000000, totalSupply: 1000000000, allTimeHigh: 52.88, allTimeHighDate: "2021-05-10", icon: "LINK" },
  { id: "shiba-inu", rank: 14, name: "Shiba Inu", symbol: "SHIB", price: 0.0000272, change24h: -3.45, marketCap: 16000000000, volume24h: 1100000000, circulatingSupply: 589290000000000, totalSupply: 589290000000000, allTimeHigh: 0.0000886, allTimeHighDate: "2021-10-28", icon: "SHIB" },
  { id: "toncoin", rank: 15, name: "Toncoin", symbol: "TON", price: 6.12, change24h: 0.89, marketCap: 21200000000, volume24h: 340000000, circulatingSupply: 3470000000, totalSupply: 5110000000, allTimeHigh: 8.25, allTimeHighDate: "2024-06-15", icon: "TON" },
  { id: "stellar", rank: 16, name: "Stellar", symbol: "XLM", price: 0.458, change24h: 1.56, marketCap: 13800000000, volume24h: 450000000, circulatingSupply: 30100000000, totalSupply: 50000000000, allTimeHigh: 0.94, allTimeHighDate: "2018-01-04", icon: "XLM" },
  { id: "bitcoin-cash", rank: 17, name: "Bitcoin Cash", symbol: "BCH", price: 487.32, change24h: -0.45, marketCap: 9600000000, volume24h: 320000000, circulatingSupply: 19700000, totalSupply: 21000000, allTimeHigh: 4355, allTimeHighDate: "2017-12-20", icon: "BCH" },
  { id: "sui", rank: 18, name: "Sui", symbol: "SUI", price: 4.28, change24h: 6.78, marketCap: 13700000000, volume24h: 1800000000, circulatingSupply: 3200000000, totalSupply: 10000000000, allTimeHigh: 5.35, allTimeHighDate: "2025-01-06", icon: "SUI" },
  { id: "pepe", rank: 19, name: "Pepe", symbol: "PEPE", price: 0.0000189, change24h: -4.12, marketCap: 7900000000, volume24h: 2300000000, circulatingSupply: 420690000000000, totalSupply: 420690000000000, allTimeHigh: 0.0000284, allTimeHighDate: "2024-12-09", icon: "PEPE" },
  { id: "hedera", rank: 20, name: "Hedera", symbol: "HBAR", price: 0.342, change24h: 2.34, marketCap: 13000000000, volume24h: 670000000, circulatingSupply: 38000000000, totalSupply: 50000000000, allTimeHigh: 0.58, allTimeHighDate: "2021-09-16", icon: "HBAR" },
  { id: "uniswap", rank: 21, name: "Uniswap", symbol: "UNI", price: 14.23, change24h: 1.45, marketCap: 8500000000, volume24h: 340000000, circulatingSupply: 600000000, totalSupply: 1000000000, allTimeHigh: 44.97, allTimeHighDate: "2021-05-03", icon: "UNI" },
  { id: "litecoin", rank: 22, name: "Litecoin", symbol: "LTC", price: 128.45, change24h: 0.89, marketCap: 9600000000, volume24h: 560000000, circulatingSupply: 74800000, totalSupply: 84000000, allTimeHigh: 412.96, allTimeHighDate: "2021-05-10", icon: "LTC" },
  { id: "near", rank: 23, name: "NEAR Protocol", symbol: "NEAR", price: 6.78, change24h: -2.12, marketCap: 7900000000, volume24h: 430000000, circulatingSupply: 1170000000, totalSupply: 1220000000, allTimeHigh: 20.44, allTimeHighDate: "2022-01-16", icon: "NEAR" },
  { id: "aptos", rank: 24, name: "Aptos", symbol: "APT", price: 12.34, change24h: 3.45, marketCap: 6200000000, volume24h: 290000000, circulatingSupply: 505000000, totalSupply: 1120000000, allTimeHigh: 19.92, allTimeHighDate: "2024-01-25", icon: "APT" },
  { id: "internet-computer", rank: 25, name: "Internet Computer", symbol: "ICP", price: 13.12, change24h: -1.67, marketCap: 6100000000, volume24h: 210000000, circulatingSupply: 467000000, totalSupply: 520000000, allTimeHigh: 750, allTimeHighDate: "2021-05-10", icon: "ICP" },
  { id: "ethereum-classic", rank: 26, name: "Ethereum Classic", symbol: "ETC", price: 32.45, change24h: 1.23, marketCap: 4700000000, volume24h: 180000000, circulatingSupply: 146800000, totalSupply: 210700000, allTimeHigh: 176.16, allTimeHighDate: "2021-05-06", icon: "ETC" },
  { id: "render", rank: 27, name: "Render", symbol: "RNDR", price: 9.87, change24h: 4.56, marketCap: 5100000000, volume24h: 420000000, circulatingSupply: 517000000, totalSupply: 531000000, allTimeHigh: 13.53, allTimeHighDate: "2024-03-17", icon: "RNDR" },
  { id: "kaspa", rank: 28, name: "Kaspa", symbol: "KAS", price: 0.167, change24h: -0.98, marketCap: 4300000000, volume24h: 89000000, circulatingSupply: 25600000000, totalSupply: 28700000000, allTimeHigh: 0.21, allTimeHighDate: "2024-08-06", icon: "KAS" },
  { id: "cosmos", rank: 29, name: "Cosmos", symbol: "ATOM", price: 9.45, change24h: 2.67, marketCap: 3700000000, volume24h: 230000000, circulatingSupply: 390500000, totalSupply: 390500000, allTimeHigh: 44.45, allTimeHighDate: "2022-01-17", icon: "ATOM" },
  { id: "filecoin", rank: 30, name: "Filecoin", symbol: "FIL", price: 6.78, change24h: -1.45, marketCap: 4000000000, volume24h: 270000000, circulatingSupply: 592000000, totalSupply: 1960000000, allTimeHigh: 237.24, allTimeHighDate: "2021-04-01", icon: "FIL" },
  { id: "arbitrum", rank: 31, name: "Arbitrum", symbol: "ARB", price: 1.12, change24h: 3.89, marketCap: 4500000000, volume24h: 560000000, circulatingSupply: 4010000000, totalSupply: 10000000000, allTimeHigh: 2.39, allTimeHighDate: "2024-01-12", icon: "ARB" },
  { id: "vechain", rank: 32, name: "VeChain", symbol: "VET", price: 0.0534, change24h: 1.78, marketCap: 4300000000, volume24h: 120000000, circulatingSupply: 80500000000, totalSupply: 86700000000, allTimeHigh: 0.28, allTimeHighDate: "2021-04-19", icon: "VET" },
  { id: "optimism", rank: 33, name: "Optimism", symbol: "OP", price: 2.34, change24h: -2.56, marketCap: 3200000000, volume24h: 340000000, circulatingSupply: 1370000000, totalSupply: 4290000000, allTimeHigh: 4.85, allTimeHighDate: "2024-03-06", icon: "OP" },
  { id: "immutable", rank: 34, name: "Immutable", symbol: "IMX", price: 2.12, change24h: 5.12, marketCap: 3400000000, volume24h: 190000000, circulatingSupply: 1600000000, totalSupply: 2000000000, allTimeHigh: 3.63, allTimeHighDate: "2024-03-14", icon: "IMX" },
  { id: "injective", rank: 35, name: "Injective", symbol: "INJ", price: 32.45, change24h: -0.23, marketCap: 3100000000, volume24h: 170000000, circulatingSupply: 95600000, totalSupply: 100000000, allTimeHigh: 52.62, allTimeHighDate: "2024-03-14", icon: "INJ" },
  { id: "the-graph", rank: 36, name: "The Graph", symbol: "GRT", price: 0.312, change24h: 2.89, marketCap: 3000000000, volume24h: 150000000, circulatingSupply: 9620000000, totalSupply: 10800000000, allTimeHigh: 2.88, allTimeHighDate: "2021-02-12", icon: "GRT" },
  { id: "fetch-ai", rank: 37, name: "Artificial Superintelligence", symbol: "FET", price: 2.45, change24h: 7.23, marketCap: 6400000000, volume24h: 890000000, circulatingSupply: 2630000000, totalSupply: 2719000000, allTimeHigh: 3.48, allTimeHighDate: "2024-03-28", icon: "FET" },
  { id: "theta", rank: 38, name: "Theta Network", symbol: "THETA", price: 2.67, change24h: -1.34, marketCap: 2700000000, volume24h: 89000000, circulatingSupply: 1000000000, totalSupply: 1000000000, allTimeHigh: 15.72, allTimeHighDate: "2021-04-16", icon: "THETA" },
  { id: "sei", rank: 39, name: "Sei", symbol: "SEI", price: 0.612, change24h: 4.23, marketCap: 2300000000, volume24h: 340000000, circulatingSupply: 3800000000, totalSupply: 10000000000, allTimeHigh: 1.14, allTimeHighDate: "2024-03-16", icon: "SEI" },
  { id: "algorand", rank: 40, name: "Algorand", symbol: "ALGO", price: 0.412, change24h: 1.56, marketCap: 3400000000, volume24h: 150000000, circulatingSupply: 8300000000, totalSupply: 10000000000, allTimeHigh: 3.56, allTimeHighDate: "2019-06-21", icon: "ALGO" },
  { id: "stacks", rank: 41, name: "Stacks", symbol: "STX", price: 2.12, change24h: -3.12, marketCap: 3100000000, volume24h: 210000000, circulatingSupply: 1470000000, totalSupply: 1820000000, allTimeHigh: 3.85, allTimeHighDate: "2024-04-01", icon: "STX" },
  { id: "aave", rank: 42, name: "Aave", symbol: "AAVE", price: 312.45, change24h: 2.34, marketCap: 4700000000, volume24h: 340000000, circulatingSupply: 15100000, totalSupply: 16000000, allTimeHigh: 666.86, allTimeHighDate: "2021-05-18", icon: "AAVE" },
  { id: "maker", rank: 43, name: "Maker", symbol: "MKR", price: 1890.23, change24h: -0.78, marketCap: 1700000000, volume24h: 120000000, circulatingSupply: 900000, totalSupply: 1010000, allTimeHigh: 6292, allTimeHighDate: "2021-05-03", icon: "MKR" },
  { id: "fantom", rank: 44, name: "Fantom", symbol: "FTM", price: 0.89, change24h: 3.45, marketCap: 2500000000, volume24h: 230000000, circulatingSupply: 2800000000, totalSupply: 3170000000, allTimeHigh: 3.46, allTimeHighDate: "2022-01-17", icon: "FTM" },
  { id: "bonk", rank: 45, name: "Bonk", symbol: "BONK", price: 0.0000312, change24h: -5.67, marketCap: 2300000000, volume24h: 670000000, circulatingSupply: 73700000000000, totalSupply: 93700000000000, allTimeHigh: 0.0000592, allTimeHighDate: "2024-11-20", icon: "BONK" },
  { id: "worldcoin", rank: 46, name: "Worldcoin", symbol: "WLD", price: 3.45, change24h: 2.12, marketCap: 2800000000, volume24h: 340000000, circulatingSupply: 812000000, totalSupply: 10000000000, allTimeHigh: 11.74, allTimeHighDate: "2024-03-10", icon: "WLD" },
  { id: "flow", rank: 47, name: "Flow", symbol: "FLOW", price: 1.02, change24h: -1.23, marketCap: 1500000000, volume24h: 67000000, circulatingSupply: 1530000000, totalSupply: 1530000000, allTimeHigh: 46.16, allTimeHighDate: "2021-04-05", icon: "FLOW" },
  { id: "axie-infinity", rank: 48, name: "Axie Infinity", symbol: "AXS", price: 8.67, change24h: 1.89, marketCap: 1300000000, volume24h: 78000000, circulatingSupply: 150000000, totalSupply: 270000000, allTimeHigh: 164.90, allTimeHighDate: "2021-11-06", icon: "AXS" },
  { id: "sandbox", rank: 49, name: "The Sandbox", symbol: "SAND", price: 0.723, change24h: -0.56, marketCap: 1700000000, volume24h: 190000000, circulatingSupply: 2350000000, totalSupply: 3000000000, allTimeHigh: 8.44, allTimeHighDate: "2021-11-25", icon: "SAND" },
  { id: "decentraland", rank: 50, name: "Decentraland", symbol: "MANA", price: 0.612, change24h: 0.34, marketCap: 1200000000, volume24h: 120000000, circulatingSupply: 1930000000, totalSupply: 2190000000, allTimeHigh: 5.90, allTimeHighDate: "2021-11-25", icon: "MANA" },
]

function generateSparkline(): number[] {
  const points: number[] = []
  let value = 50 + Math.random() * 50
  for (let i = 0; i < 24; i++) {
    value += (Math.random() - 0.5) * 10
    value = Math.max(10, Math.min(100, value))
    points.push(value)
  }
  return points
}

export function getMockCryptoData(): CryptoAsset[] {
  return COIN_DATA.map((coin) => ({
    ...coin,
    sparkline7d: generateSparkline(),
  }))
}

export function getMockMarketStats(): MarketStats {
  return {
    totalMarketCap: 3420000000000,
    btcDominance: 56.2,
    ethGasFees: 12.4,
    totalVolume24h: 142000000000,
    activeCryptos: 14832,
  }
}

export function simulatePriceUpdate(assets: CryptoAsset[]): { updated: CryptoAsset[]; changedIds: Map<string, "up" | "down"> } {
  const changedIds = new Map<string, "up" | "down">()
  const updated = assets.map((asset) => {
    if (Math.random() > 0.6) {
      const delta = (Math.random() - 0.48) * asset.price * 0.002
      const newPrice = Math.max(0.000001, asset.price + delta)
      const direction = delta >= 0 ? "up" : "down"
      changedIds.set(asset.id, direction)
      return {
        ...asset,
        price: newPrice,
        change24h: asset.change24h + (Math.random() - 0.5) * 0.1,
      }
    }
    return asset
  })
  return { updated, changedIds }
}

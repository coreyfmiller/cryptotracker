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

import { fetchTop500Cryptos, fetchMarketStats } from "./api-client"

// Cache for crypto data to avoid excessive API calls
let cachedCryptoData: CryptoAsset[] | null = null
let cachedMarketStats: MarketStats | null = null
let lastFetchTime = 0
const CACHE_DURATION = 60000 // 1 minute cache

export async function getMockCryptoData(): Promise<CryptoAsset[]> {
  const now = Date.now()

  // Return cached data if it's still fresh
  if (cachedCryptoData && now - lastFetchTime < CACHE_DURATION) {
    return cachedCryptoData
  }

  try {
    cachedCryptoData = await fetchTop500Cryptos()
    lastFetchTime = now
    return cachedCryptoData
  } catch (error) {
    console.error("Failed to fetch crypto data:", error)
    // Return empty array on error
    return []
  }
}

export async function getMockMarketStats(): Promise<MarketStats> {
  const now = Date.now()

  // Return cached stats if still fresh
  if (cachedMarketStats && now - lastFetchTime < CACHE_DURATION) {
    return cachedMarketStats
  }

  try {
    cachedMarketStats = await fetchMarketStats()
    return cachedMarketStats
  } catch (error) {
    console.error("Failed to fetch market stats:", error)
    // Return fallback stats on error
    return {
      totalMarketCap: 0,
      btcDominance: 0,
      ethGasFees: 0,
      totalVolume24h: 0,
      activeCryptos: 0,
    }
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

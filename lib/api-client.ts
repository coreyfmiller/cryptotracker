import { CryptoAsset, MarketStats } from "./crypto-data"

const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
const BASE_URL = "https://api.coingecko.com/api/v3"

interface CoinGeckoMarket {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    total_volume: number
    price_change_percentage_24h: number
    circulating_supply: number
    total_supply: number | null
    ath: number
    ath_date: string
    sparkline_in_7d?: {
        price: number[]
    }
}

interface CoinGeckoGlobal {
    data: {
        total_market_cap: { usd: number }
        total_volume: { usd: number }
        market_cap_percentage: { btc: number; eth: number }
        active_cryptocurrencies: number
    }
}

/**
 * Fetch cryptocurrency market data from CoinGecko
 * @param page Page number (1-indexed)
 * @param perPage Number of results per page (max 250)
 */
export async function fetchCryptoData(
    page: number = 1,
    perPage: number = 100
): Promise<CryptoAsset[]> {
    try {
        const params = new URLSearchParams({
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: perPage.toString(),
            page: page.toString(),
            sparkline: "true",
            price_change_percentage: "24h",
            x_cg_demo_api_key: API_KEY || "",
        })

        const response = await fetch(`${BASE_URL}/coins/markets?${params}`)

        if (!response.ok) {
            throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`)
        }

        const data: CoinGeckoMarket[] = await response.json()

        return data.map((coin) => ({
            id: coin.id,
            rank: coin.market_cap_rank,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            change24h: coin.price_change_percentage_24h || 0,
            marketCap: coin.market_cap,
            volume24h: coin.total_volume,
            circulatingSupply: coin.circulating_supply,
            totalSupply: coin.total_supply || coin.circulating_supply,
            allTimeHigh: coin.ath,
            allTimeHighDate: coin.ath_date.split("T")[0],
            sparkline7d: coin.sparkline_in_7d?.price || generateFallbackSparkline(),
            icon: coin.symbol.toUpperCase(),
        }))
    } catch (error) {
        console.error("Error fetching crypto data:", error)
        throw error
    }
}

/**
 * Fetch global market statistics from CoinGecko
 */
export async function fetchMarketStats(): Promise<MarketStats> {
    try {
        const params = new URLSearchParams({
            x_cg_demo_api_key: API_KEY || "",
        })

        const response = await fetch(`${BASE_URL}/global?${params}`)

        if (!response.ok) {
            throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`)
        }

        const data: CoinGeckoGlobal = await response.json()

        return {
            totalMarketCap: data.data.total_market_cap.usd,
            btcDominance: data.data.market_cap_percentage.btc,
            ethGasFees: 12.4, // CoinGecko doesn't provide gas fees in free tier
            totalVolume24h: data.data.total_volume.usd,
            activeCryptos: data.data.active_cryptocurrencies,
        }
    } catch (error) {
        console.error("Error fetching market stats:", error)
        throw error
    }
}

/**
 * Fetch all top 500 cryptocurrencies in batches
 */
export async function fetchTop500Cryptos(): Promise<CryptoAsset[]> {
    const allCryptos: CryptoAsset[] = []
    const perPage = 100 // CoinGecko recommends max 250, but 100 is safer for rate limits
    const totalPages = 5 // 5 pages × 100 = 500 coins

    for (let page = 1; page <= totalPages; page++) {
        try {
            const cryptos = await fetchCryptoData(page, perPage)
            allCryptos.push(...cryptos)

            // Add a small delay between requests to respect rate limits
            if (page < totalPages) {
                await new Promise((resolve) => setTimeout(resolve, 500))
            }
        } catch (error) {
            console.error(`Error fetching page ${page}:`, error)
            // Continue with what we have so far
            break
        }
    }

    return allCryptos
}

/**
 * Generate a fallback sparkline if API doesn't provide one
 */
function generateFallbackSparkline(): number[] {
    const points: number[] = []
    let value = 50 + Math.random() * 50
    for (let i = 0; i < 168; i++) {
        // 7 days of hourly data
        value += (Math.random() - 0.5) * 10
        value = Math.max(10, Math.min(100, value))
        points.push(value)
    }
    return points
}

"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { MarketMarquee } from "@/components/market-marquee"
import { CryptoTable } from "@/components/crypto-table"
import { SearchBar } from "@/components/search-bar"
import { SmartSidebar } from "@/components/smart-sidebar"
import { CoinDetailSheet } from "@/components/coin-detail-sheet"
import { Zap } from "lucide-react"
import {
  getMockCryptoData,
  getMockMarketStats,
  simulatePriceUpdate,
  type CryptoAsset,
  type MarketStats,
} from "@/lib/crypto-data"

export default function Page() {
  const [assets, setAssets] = useState<CryptoAsset[]>([])
  const [marketStats, setMarketStats] = useState<MarketStats | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [watchlistOnly, setWatchlistOnly] = useState(false)
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set(["bitcoin", "ethereum", "solana"]))
  const [flashStates, setFlashStates] = useState<Map<string, "up" | "down">>(new Map())
  const [selectedCoin, setSelectedCoin] = useState<CryptoAsset | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [recentlyViewed, setRecentlyViewed] = useState<CryptoAsset[]>([])
  const assetsRef = useRef(assets)

  // Keep ref in sync
  useEffect(() => {
    assetsRef.current = assets
  }, [assets])

  // Initial data load
  useEffect(() => {
    setAssets(getMockCryptoData())
    setMarketStats(getMockMarketStats())
  }, [])

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const { updated, changedIds } = simulatePriceUpdate(assetsRef.current)
      setAssets(updated)
      if (changedIds.size > 0) {
        setFlashStates(new Map(changedIds))
        setTimeout(() => setFlashStates(new Map()), 650)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const toggleWatchlist = useCallback((id: string) => {
    setWatchlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleSelectCoin = useCallback((asset: CryptoAsset) => {
    setSelectedCoin(asset)
    setSheetOpen(true)
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((a) => a.id !== asset.id)
      return [asset, ...filtered].slice(0, 8)
    })
  }, [])

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      !searchQuery ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesWatchlist = !watchlistOnly || watchlist.has(asset.id)
    return matchesSearch && matchesWatchlist
  })

  if (!marketStats) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Zap className="h-5 w-5 animate-pulse text-[hsl(var(--primary))]" />
          <span className="font-mono text-sm">Connecting to markets...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Market Marquee */}
      <MarketMarquee stats={marketStats} />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-2xl">
        <div className="px-6 lg:px-8 py-5 lg:py-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
            CryptoTracker
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {"- Real-Time Market Dashboard"}
          </p>
        </div>
        {/* Neon green glow border */}
        <div className="relative h-[2px] w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--crypto-up))] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--crypto-up))] to-transparent blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--crypto-up))] to-transparent blur-md opacity-60" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Table Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="px-4 lg:px-6 py-4">
            <SearchBar
              query={searchQuery}
              onQueryChange={setSearchQuery}
              watchlistOnly={watchlistOnly}
              onWatchlistOnlyChange={setWatchlistOnly}
              resultCount={filteredAssets.length}
            />
          </div>
          <div className="flex-1 overflow-y-auto px-4 lg:px-6 pb-4">
            <CryptoTable
              assets={filteredAssets}
              flashStates={flashStates}
              watchlist={watchlist}
              onToggleWatchlist={toggleWatchlist}
              onSelectCoin={handleSelectCoin}
            />
          </div>
        </main>

        {/* Sidebar - hidden on small screens */}
        <div className="hidden lg:flex">
          <SmartSidebar
            assets={assets}
            recentlyViewed={recentlyViewed}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            onSelectCoin={handleSelectCoin}
          />
        </div>
      </div>

      {/* Detail Sheet */}
      <CoinDetailSheet
        asset={selectedCoin}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  )
}

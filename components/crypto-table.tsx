"use client"

import { Badge } from "@/components/ui/badge"
import { CoinIcon } from "@/components/coin-icon"
import { Sparkline } from "@/components/sparkline"
import { Star } from "lucide-react"
import type { CryptoAsset } from "@/lib/crypto-data"

function formatPrice(price: number): string {
  if (price >= 1) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  if (price >= 0.01) return `$${price.toFixed(4)}`
  return `$${price.toFixed(8)}`
}

function formatMarketCap(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`
  return `$${num.toLocaleString()}`
}

interface CryptoTableProps {
  assets: CryptoAsset[]
  flashStates: Map<string, "up" | "down">
  watchlist: Set<string>
  onToggleWatchlist: (id: string) => void
  onSelectCoin: (asset: CryptoAsset) => void
}

export function CryptoTable({ assets, flashStates, watchlist, onToggleWatchlist, onSelectCoin }: CryptoTableProps) {
  return (
    <div className="glass-panel rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="sticky top-0 z-10 border-b border-[hsl(var(--glass-border))] bg-[hsl(var(--glass))]/95 backdrop-blur-md">
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-8"></th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-10">#</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
              <th className="px-3 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
              <th className="px-3 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">24h</th>
              <th className="hidden md:table-cell px-3 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Market Cap</th>
              <th className="hidden lg:table-cell px-3 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">7d Chart</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => {
              const flash = flashStates.get(asset.id)
              const isPositive = asset.change24h >= 0
              const isWatchlisted = watchlist.has(asset.id)

              return (
                <tr
                  key={asset.id}
                  className="border-b border-[hsl(var(--glass-border))]/50 transition-colors hover:bg-[hsl(var(--secondary))]/50 cursor-pointer group"
                  onClick={() => onSelectCoin(asset)}
                >
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleWatchlist(asset.id)
                      }}
                      className="transition-colors"
                      aria-label={isWatchlisted ? `Remove ${asset.name} from watchlist` : `Add ${asset.name} to watchlist`}
                    >
                      <Star
                        className={`h-4 w-4 ${isWatchlisted ? "fill-[hsl(var(--chart-3))] text-[hsl(var(--chart-3))]" : "text-muted-foreground/30 hover:text-muted-foreground"}`}
                      />
                    </button>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{asset.rank}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <CoinIcon symbol={asset.symbol} />
                      <div>
                        <span className="font-medium text-foreground">{asset.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground font-mono">{asset.symbol}</span>
                      </div>
                    </div>
                  </td>
                  <td className={`px-3 py-3 text-right font-mono font-medium ${flash === "up" ? "flash-green" : flash === "down" ? "flash-red" : "text-foreground"}`}>
                    {formatPrice(asset.price)}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <Badge
                      variant="secondary"
                      className={`font-mono text-xs ${
                        isPositive
                          ? "bg-[hsl(var(--crypto-up))]/10 text-[hsl(var(--crypto-up))] border-[hsl(var(--crypto-up))]/20"
                          : "bg-[hsl(var(--crypto-down))]/10 text-[hsl(var(--crypto-down))] border-[hsl(var(--crypto-down))]/20"
                      }`}
                    >
                      {isPositive ? "+" : ""}{asset.change24h.toFixed(2)}%
                    </Badge>
                  </td>
                  <td className="hidden md:table-cell px-3 py-3 text-right font-mono text-muted-foreground">
                    {formatMarketCap(asset.marketCap)}
                  </td>
                  <td className="hidden lg:table-cell px-3 py-3 text-right">
                    <div className="flex justify-end">
                      <Sparkline data={asset.sparkline7d} positive={isPositive} width={80} height={28} />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

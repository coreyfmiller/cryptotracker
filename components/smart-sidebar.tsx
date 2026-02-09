"use client"

import { CoinIcon } from "@/components/coin-icon"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, TrendingUp, Clock } from "lucide-react"
import type { CryptoAsset } from "@/lib/crypto-data"

interface SmartSidebarProps {
  assets: CryptoAsset[]
  recentlyViewed: CryptoAsset[]
  isOpen: boolean
  onToggle: () => void
  onSelectCoin: (asset: CryptoAsset) => void
}

export function SmartSidebar({ assets, recentlyViewed, isOpen, onToggle, onSelectCoin }: SmartSidebarProps) {
  const gainers = [...assets]
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 8)

  return (
    <div
      className={`flex flex-col border-l border-[hsl(var(--glass-border))] bg-[hsl(var(--glass))]/60 backdrop-blur-xl transition-all duration-300 ${
        isOpen ? "w-72" : "w-12"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-center p-3 border-b border-[hsl(var(--glass-border))] hover:bg-secondary/50 transition-colors text-muted-foreground"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {isOpen && (
        <ScrollArea className="flex-1">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-[hsl(var(--crypto-up))]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Biggest Gainers</h3>
            </div>
            <div className="flex flex-col gap-1">
              {gainers.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => onSelectCoin(asset)}
                  className="flex items-center justify-between rounded-lg px-2.5 py-2 transition-colors hover:bg-secondary/50 text-left w-full"
                >
                  <div className="flex items-center gap-2">
                    <CoinIcon symbol={asset.symbol} size={24} />
                    <div>
                      <span className="text-sm font-medium text-foreground">{asset.symbol}</span>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="font-mono text-xs bg-[hsl(var(--crypto-up))]/10 text-[hsl(var(--crypto-up))] border-[hsl(var(--crypto-up))]/20"
                  >
                    +{asset.change24h.toFixed(2)}%
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {recentlyViewed.length > 0 && (
            <div className="p-4 border-t border-[hsl(var(--glass-border))]">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recently Viewed</h3>
              </div>
              <div className="flex flex-col gap-1">
                {recentlyViewed.slice(0, 6).map((asset) => {
                  const isPositive = asset.change24h >= 0
                  return (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => onSelectCoin(asset)}
                      className="flex items-center justify-between rounded-lg px-2.5 py-2 transition-colors hover:bg-secondary/50 text-left w-full"
                    >
                      <div className="flex items-center gap-2">
                        <CoinIcon symbol={asset.symbol} size={24} />
                        <span className="text-sm font-medium text-foreground">{asset.symbol}</span>
                      </div>
                      <span className={`font-mono text-xs ${isPositive ? "text-[hsl(var(--crypto-up))]" : "text-[hsl(var(--crypto-down))]"}`}>
                        {isPositive ? "+" : ""}{asset.change24h.toFixed(2)}%
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </ScrollArea>
      )}
    </div>
  )
}

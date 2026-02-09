"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { CoinIcon } from "@/components/coin-icon"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Calendar, Coins, BarChart3, Activity } from "lucide-react"
import type { CryptoAsset } from "@/lib/crypto-data"

function formatPrice(price: number): string {
  if (price >= 1) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  if (price >= 0.01) return `$${price.toFixed(4)}`
  return `$${price.toFixed(8)}`
}

function formatLargeNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  return `$${num.toLocaleString()}`
}

function formatSupply(num: number): string {
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
  return num.toLocaleString()
}

interface CoinDetailSheetProps {
  asset: CryptoAsset | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function LargeChart({ data, positive }: { data: number[]; positive: boolean }) {
  if (!data || data.length === 0) return null

  const width = 440
  const height = 180
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((value - min) / range) * (height - 16) - 8
    return `${x},${y}`
  }).join(" ")

  const areaPoints = `0,${height} ${points} ${width},${height}`
  const strokeColor = positive ? "hsl(var(--crypto-up))" : "hsl(var(--crypto-down))"

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id="detail-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#detail-grad)" />
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CoinDetailSheet({ asset, open, onOpenChange }: CoinDetailSheetProps) {
  if (!asset) return null

  const isPositive = asset.change24h >= 0

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg bg-[hsl(var(--glass))] border-[hsl(var(--glass-border))] backdrop-blur-xl text-foreground overflow-y-auto"
      >
        <SheetHeader className="pb-4">
          <div className="flex items-center gap-3">
            <CoinIcon symbol={asset.symbol} size={40} />
            <div>
              <SheetTitle className="text-foreground text-xl">{asset.name}</SheetTitle>
              <SheetDescription className="font-mono text-muted-foreground">{asset.symbol} / USD</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-6 pb-6">
          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold font-mono text-foreground">
              {formatPrice(asset.price)}
            </span>
            <Badge
              variant="secondary"
              className={`font-mono text-sm ${
                isPositive
                  ? "bg-[hsl(var(--crypto-up))]/10 text-[hsl(var(--crypto-up))] border-[hsl(var(--crypto-up))]/20"
                  : "bg-[hsl(var(--crypto-down))]/10 text-[hsl(var(--crypto-down))] border-[hsl(var(--crypto-down))]/20"
              }`}
            >
              {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {isPositive ? "+" : ""}{asset.change24h.toFixed(2)}%
            </Badge>
          </div>

          {/* Chart */}
          <div className="glass-panel rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">7-Day Price Chart</p>
            <LargeChart data={asset.sparkline7d} positive={isPositive} />
          </div>

          {/* Fundamentals */}
          <div className="glass-panel rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider font-medium">Key Fundamentals</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span className="text-xs">Market Cap</span>
                </div>
                <span className="font-mono text-sm font-medium text-foreground">{formatLargeNumber(asset.marketCap)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Activity className="h-3.5 w-3.5" />
                  <span className="text-xs">24h Volume</span>
                </div>
                <span className="font-mono text-sm font-medium text-foreground">{formatLargeNumber(asset.volume24h)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Coins className="h-3.5 w-3.5" />
                  <span className="text-xs">Circulating Supply</span>
                </div>
                <span className="font-mono text-sm font-medium text-foreground">{formatSupply(asset.circulatingSupply)} {asset.symbol}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Coins className="h-3.5 w-3.5" />
                  <span className="text-xs">Total Supply</span>
                </div>
                <span className="font-mono text-sm font-medium text-foreground">{formatSupply(asset.totalSupply)} {asset.symbol}</span>
              </div>
            </div>
          </div>

          {/* All Time High */}
          <div className="glass-panel rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider font-medium">All-Time High</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[hsl(var(--chart-3))]" />
                <span className="font-mono text-lg font-bold text-foreground">{formatPrice(asset.allTimeHigh)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-xs font-mono">{asset.allTimeHighDate}</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Distance from ATH</span>
                <span className="font-mono">{((1 - asset.price / asset.allTimeHigh) * 100).toFixed(1)}% below</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-[hsl(var(--chart-3))]"
                  style={{ width: `${Math.min(100, (asset.price / asset.allTimeHigh) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

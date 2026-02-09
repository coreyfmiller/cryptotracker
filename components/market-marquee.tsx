"use client"

import { Activity, Fuel, TrendingUp, BarChart3, Coins } from "lucide-react"
import type { MarketStats } from "@/lib/crypto-data"

function formatLargeNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  return `$${num.toLocaleString()}`
}

interface MarketMarqueeProps {
  stats: MarketStats
}

export function MarketMarquee({ stats }: MarketMarqueeProps) {
  const items = [
    { icon: TrendingUp, label: "Total Market Cap", value: formatLargeNumber(stats.totalMarketCap), color: "text-[hsl(var(--crypto-up))]" },
    { icon: Coins, label: "BTC Dominance", value: `${stats.btcDominance}%`, color: "text-[hsl(var(--chart-3))]" },
    { icon: Fuel, label: "ETH Gas", value: `${stats.ethGasFees} Gwei`, color: "text-[hsl(var(--chart-4))]" },
    { icon: BarChart3, label: "24h Volume", value: formatLargeNumber(stats.totalVolume24h), color: "text-foreground" },
    { icon: Activity, label: "Active Cryptos", value: stats.activeCryptos.toLocaleString(), color: "text-muted-foreground" },
  ]

  return (
    <div className="w-full overflow-hidden border-b border-[hsl(var(--glass-border))] bg-[hsl(var(--glass))]/80 backdrop-blur-md">
      <div className="flex animate-[marquee_30s_linear_infinite] items-center gap-10 px-4 py-2.5 whitespace-nowrap" style={{ width: "max-content" }}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
            <span className="text-muted-foreground">{item.label}</span>
            <span className={`font-mono font-semibold ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

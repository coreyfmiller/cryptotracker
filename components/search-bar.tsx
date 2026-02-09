"use client"

import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Search, Eye } from "lucide-react"

interface SearchBarProps {
  query: string
  onQueryChange: (q: string) => void
  watchlistOnly: boolean
  onWatchlistOnlyChange: (v: boolean) => void
  resultCount: number
}

export function SearchBar({ query, onQueryChange, watchlistOnly, onWatchlistOnlyChange, resultCount }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search coins by name or ticker..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="pl-9 bg-[hsl(var(--glass))] border-[hsl(var(--glass-border))] placeholder:text-muted-foreground/50 text-foreground"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-muted-foreground" />
          <label htmlFor="watchlist-toggle" className="text-sm text-muted-foreground cursor-pointer">
            Watchlist only
          </label>
          <Switch
            id="watchlist-toggle"
            checked={watchlistOnly}
            onCheckedChange={onWatchlistOnlyChange}
          />
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {resultCount} coins
        </span>
      </div>
    </div>
  )
}

"use client"

const COIN_COLORS: Record<string, string> = {
  BTC: "#F7931A",
  ETH: "#627EEA",
  USDT: "#26A17B",
  BNB: "#F3BA2F",
  SOL: "#9945FF",
  XRP: "#00AAE4",
  USDC: "#2775CA",
  ADA: "#0033AD",
  DOGE: "#C2A633",
  AVAX: "#E84142",
  TRX: "#FF0013",
  DOT: "#E6007A",
  LINK: "#2A5ADA",
  SHIB: "#FFA409",
  TON: "#0098EA",
  XLM: "#14B6E7",
  BCH: "#0AC18E",
  SUI: "#4DA2FF",
  PEPE: "#479F53",
  HBAR: "#00BFFF",
}

interface CoinIconProps {
  symbol: string
  size?: number
}

export function CoinIcon({ symbol, size = 28 }: CoinIconProps) {
  const color = COIN_COLORS[symbol] || "#6b7280"

  return (
    <div
      className="flex items-center justify-center rounded-full font-mono text-xs font-bold"
      style={{
        width: size,
        height: size,
        backgroundColor: `${color}20`,
        color: color,
        border: `1.5px solid ${color}40`,
      }}
    >
      {symbol.slice(0, 2)}
    </div>
  )
}

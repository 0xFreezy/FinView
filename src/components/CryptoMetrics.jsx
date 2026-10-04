import './CryptoMetrics.css'

export function CryptoMetrics({ crypto }) {

    const marketData = crypto.market_data
    function formatValue(value) {
        if (value >= 1_000_000_000_000) {
            return `$${(value / 1_000_000_000_000).toFixed(2)}T`
        }

        if (value >= 1_000_000_000) {
            return `$${(value / 1_000_000_000).toFixed(2)}B`
        }

        if (value >= 1_000_000) {
            return `$${(value / 1_000_000).toFixed(2)}M`
        }

        if (value >= 1_000) {
            return `$${(value / 1_000).toFixed(2)}K`
        }

        return `$${value.toLocaleString()}`
    }
    return (
        <div className="crypto-metrics">

            <div className="crypto-metric-card">
                <span>Market Cap</span>
                <strong>
                    {formatValue(marketData.market_cap.usd)}
                </strong>
            </div>

            <div className="crypto-metric-card">
                <span>24h Volume</span>
                <strong>
                    {formatValue(marketData.total_volume.usd)}
                </strong>
            </div>

            <div className="crypto-metric-card">
                <span>Circulating Supply</span>
                <strong>
                    {marketData.circulating_supply.toLocaleString()}
                </strong>
            </div>

            <div className="crypto-metric-card">
                <span>All-Time High</span>
                <strong>
                    {formatValue(marketData.ath.usd)}
                </strong>
            </div>

            <div className="crypto-metric-card">
                <span>Market Cap / FDV</span>
                <strong>
                    {marketData.fully_diluted_valuation?.usd
                        ? (
                            marketData.market_cap.usd /
                            marketData.fully_diluted_valuation.usd
                        ).toFixed(2)
                        : '-'
                    }
                </strong>
            </div>

        </div>
    )
}
import './CryptoStats.css'

export function CryptoStats({ crypto }) {

    const marketData = crypto.market_data

    return (
        <div className="crypto-stats">

            <h2>Market Information</h2>

            <div className="crypto-stats-grid">

                <div>
                    <span>24h High</span>
                    <strong>
                        ${marketData.high_24h.usd.toLocaleString()}
                    </strong>
                </div>

                <div>
                    <span>24h Low</span>
                    <strong>
                        ${marketData.low_24h.usd.toLocaleString()}
                    </strong>
                </div>

                <div>
                    <span>Total Supply</span>
                    <strong>
                        {marketData.total_supply
                            ? marketData.total_supply.toLocaleString()
                            : '-'
                        }
                    </strong>
                </div>

                <div>
                    <span>Max Supply</span>
                    <strong>
                        {marketData.max_supply
                            ? marketData.max_supply.toLocaleString()
                            : '-'
                        }
                    </strong>
                </div>

                <div>
                    <span>ATH Change</span>
                    <strong className={marketData.ath_change_percentage.usd>=0 ? 'positive' : 'negative'}>
                        {marketData.ath_change_percentage.usd.toFixed(2)}%
                    </strong>
                </div>

            </div>

        </div>
    )
}
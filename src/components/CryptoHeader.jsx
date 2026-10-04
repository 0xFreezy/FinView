import './CryptoHeader.css'

export function CryptoHeader({ crypto }) {

    const priceChange = crypto.market_data.price_change_percentage_24h

    return (
        <div className="crypto-dashboard-header">

            <div className="crypto-info">

                <img
                    src={crypto.image.large}
                    alt={crypto.symbol}
                    className="crypto-dashboard-logo"
                />

                <div className="crypto-name">
                    <h1>{crypto.name}</h1>
                    <span>{crypto.symbol.toUpperCase()}</span>
                </div>

            </div>

            <div className="header-divider"></div>

            <div className="crypto-price-info">

                <div className="crypto-price">
                    <strong>
                        ${crypto.market_data.current_price.usd.toLocaleString()}
                    </strong>

                    <span>USD</span>
                </div>

                <p className={priceChange >= 0 ? 'positive' : 'negative'}>
                    {priceChange >= 0 ? '+' : ''}
                    {priceChange.toFixed(2)}%
                </p>

            </div>

        </div>
    )
}
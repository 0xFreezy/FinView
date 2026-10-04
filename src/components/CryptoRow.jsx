import { Link } from 'react-router-dom'
import './CryptoRow.css'

export function CryptoRow({ rank, coin, marketCap }) {

    return (
        <Link to={`/crypto/${coin.id}`} className="crypto-row">
            <span className="crypto-rank">
                {rank}
            </span>

            <div className="crypto-row-name">

                <img
                    src={coin.image}
                    alt={coin.symbol}
                    className="crypto-logo"
                />

                <div>
                    <strong>{coin.name}</strong>
                    <span>{coin.symbol.toUpperCase()}</span>
                </div>

            </div>

            <p className="crypto-price">
                ${coin.current_price.toLocaleString()}
            </p>

            <p className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                {coin.price_change_percentage_24h !== null
                    ? `${coin.price_change_percentage_24h >= 0 ? '+' : ''}${coin.price_change_percentage_24h.toFixed(2)}%`
                    : '-'
                }
            </p>

            <p className="crypto-market-cap">
                {marketCap}
            </p>

        </Link>
    )
}
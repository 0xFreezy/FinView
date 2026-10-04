import { Link } from 'react-router-dom'
import './StockRow.css'
import { useEffect, useState } from 'react'
export function StockRow({ rank, ticker, name, price, change, marketCap }) {
    return (
        <Link to={`/dashboard/${ticker}`} className="stock-row">
            <span className="stock-rank">
                {rank}
            </span>

            <div className="stock-name">
                <img
                    className="stock-logo"
                    src={`https://img.loadlogo.com/ticker/${ticker}`}
                    alt={ticker}
                />

                <div>
                    <strong>{name}</strong>
                    <span>{ticker}</span>
                </div>
            </div>

            <p className="stock-price">
                ${price.toFixed(2)}
            </p>

            <p className={change >= 0 ? 'positive' : 'negative'}>
                {change >= 0 ? '+' : ''}
                {change.toFixed(2)}%
            </p>

            <p className="stock-market-cap">
                {marketCap}
            </p>
        </Link>
    )
}
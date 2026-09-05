import './StockCard.css'

export function StockCard({ticker,name,price,change}) {
    return (
        <div className="stock-card">
            <h3>{ticker}</h3>
            <p>{name}</p>
            <p>{price}</p>
            <p>{change}</p>
        </div>

    )
}
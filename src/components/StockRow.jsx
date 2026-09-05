import { Link } from 'react-router-dom'
import './StockRow.css'

export function StockRow({ ticker, name, price, change }) {
    return (
        <Link to={`/dashboard/${ticker}`} className="stock-row">
            <div>
                <strong>{ticker}</strong>
                <span>{name}</span>
            </div>

            <p>${price}</p>

            <p>{change}</p>
        </Link>
    )
}
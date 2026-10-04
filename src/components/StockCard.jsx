import './StockCard.css'
import { useNavigate } from 'react-router-dom'
export function StockCard({ ticker, name, price, change, logo, type, id }) {
    const navigate = useNavigate()

    function handleClick() {
        if (type === 'stock') {
            navigate(`/dashboard/${ticker}`)
        } else if (type === 'crypto') {
            navigate(`/crypto/${id}`)
        }
    }

    return (
        <div className="stock-card" onClick={handleClick}>

            <div className="stock-info">
                {logo && <img src={logo} alt={ticker} />}

                <div>
                    <h3>{ticker}</h3>
                    <p>{name}</p>
                </div>
            </div>

            <div className="stock-price">
                <strong>${price}</strong>

                <span className={change >= 0 ? 'positive' : 'negative'}>
                    {change >= 0 ? '+' : ''}{change}%
                </span>
            </div>

        </div>
    )
}
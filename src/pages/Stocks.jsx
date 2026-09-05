import { StockRow } from '../components/StockRow'
import './Stocks.css'
function Stocks() {
    const stocks = [
        {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            price: 189.3,
            change: '+1.25%'
        },
        {
            symbol: 'NVDA',
            name: 'NVIDIA',
            price: 350.3,
            change: '+2.00%'
        },
        {
            symbol: 'MSFT',
            name: 'Microsoft',
            price: 510.2,
            change: '+1.84%'
        },
        {
            symbol: 'TSLA',
            name: 'Tesla',
            price: 345.7,
            change: '-2.31%'
        },
        {
            symbol: 'AMZN',
            name: 'Amazon',
            price: 225.4,
            change: '+1.56%'
        }
    ]
    return (
        <div className='stocks'>
            <p>Stocks</p>
            <div className="stocks-layout">
                {stocks.map((stock) => (
                    <StockRow
                        key={stock.symbol}
                        ticker={stock.symbol}
                        name={stock.name}
                        price={stock.price}
                        change={stock.change}
                    />
                ))}
            </div>
        </div>
    )
}
export default Stocks
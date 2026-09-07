import { StockRow } from '../components/StockRow'
import './Stocks.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Stocks() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    function handleSearch(e) {
        if (e.key === 'Enter' && search.trim()) {
            navigate(`/dashboard/${search.toUpperCase()}`)
            setSearch('')
        }}
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
                <input
                    type="text"
                    placeholder="Search ticker..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearch}
               />
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
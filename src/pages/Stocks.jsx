import { StockRow } from '../components/StockRow'
import './Stocks.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { GlobalSearch } from '../components/GlobalSearch'
import { searchAsset } from '../services/searchService'

function Stocks() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()


    function formatMarketCap(value) {
        if (value >= 1_000_000_000_000) {
            return `$${(value / 1_000_000_000_000).toFixed(2)}T`
        }

        if (value >= 1_000_000_000) {
            return `$${(value / 1_000_000_000).toFixed(2)}B`
        }

        if (value >= 1_000_000) {
            return `$${(value / 1_000_000).toFixed(2)}M`
        }

        return `$${value.toLocaleString()}`
    }
    async function handleSearch(query) {
        const result = await searchAsset(query)


        if (result?.type === 'stock') {
            navigate(`/dashboard/${result.symbol}`)

        }
        if (result?.type === 'crypto') {
            navigate(`/crypto/${result.id}`)
        }
    }
    function cleanStockName(name) {
        return name

            .replace(/\s+(Common Stock|Common Shares)$/i, '')

            .trim()
    }

    const [stocksData, setStocksData] = useState([])
    const [loadingStocks, setLoadingStocks] = useState(true)
    useEffect(() => {
        async function fetchStocks() {
            const response = await fetch(
                'https://top-us-stock-tickers.zyhe.me/api/v2/tickers?collection=top_50&limit=40'
            )

            const data = await response.json()

            console.log(data.items)

            setStocksData(data.items)
            setLoadingStocks(false)
        }

        fetchStocks()
    }, [])
    if (loadingStocks) return <p>Loading...</p>
    return (
        <div className='stocks'>

            <GlobalSearch
                search={search}
                setSearch={setSearch}
                onSubmit={handleSearch}
            />
            <div className="stocks-header">
                <span>#</span>
                <span>Name</span>
                <span>Price</span>
                <span>24h</span>
                <span>Market Cap</span>
            </div>

            <div className="stocks-layout">
                {stocksData.map((stock, index) => (
                    <StockRow
                        key={stock.symbol}
                        rank={index + 1}
                        ticker={stock.symbol}
                        name={cleanStockName(stock.name)}
                        price={stock.price}
                        change={stock.percent_change}
                        marketCap={formatMarketCap(stock.market_cap)}

                    />
                ))}
            </div>
        </div>
    )
}
export default Stocks
import { StockCard } from '../components/StockCard'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { GlobalSearch } from '../components/GlobalSearch'
import { searchAsset } from '../services/searchService'
import './Home.css'
function Home() {
    async function handleSearch(query) {
    const result = await searchAsset(query)

    if (result?.type === 'stock') {
        navigate(`/dashboard/${result.symbol}`)
    }

    if (result?.type === 'crypto') {
        navigate(`/crypto/${result.id}`)
    }
}
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const [trendingAssets, setTrendingAssets] = useState([])
    useEffect(() => {
        async function fetchAssets() {
            const stockResponse = await fetch(
                'https://top-us-stock-tickers.zyhe.me/api/v2/tickers?collection=top_50&limit=2'
            )

            const stockData = await stockResponse.json()

            const stockAssets = stockData.items.map(stock => ({
                symbol: stock.symbol,
                name: stock.name
                    .replace(/\s+(Common Stock|Common Shares)$/i, '')
                    .replace(/\s+(Corporation|Corp\.?|Inc\.?|Ltd\.?)$/i, '')
                    .trim(),
                price: stock.price,
                change: stock.percent_change,
                logo: `https://img.loadlogo.com/ticker/${stock.symbol}`,
                 type: 'stock'
            }))

            const cryptoResponse = await fetch(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&sparkline=false'
            )

            const cryptoData = await cryptoResponse.json()

            const cryptoAssets = cryptoData.map(coin => ({
                symbol: coin.symbol.toUpperCase(),
                name: coin.name,
                price: coin.current_price,
                change: coin.price_change_percentage_24h,
                logo: coin.image,
                 type: 'crypto',
                id: coin.id
            }))

            setTrendingAssets([
                ...stockAssets,
                ...cryptoAssets
            ])
        }

        fetchAssets()
    }, [])



    return (
        <div className='home'>
            <h1>Welcome to FinView</h1>
            <p className="home-subtitle">Your Stock & Crypto Analysis Dashboard</p>
           <GlobalSearch 
    search={search}
    setSearch={setSearch}
    onSubmit={handleSearch}
/>

            <h2>Popular Assets</h2>

            <div className="trending">

                {trendingAssets.map((asset) => (
                    <StockCard
                        key={asset.symbol}
                        ticker={asset.symbol}
                        name={asset.name}
                        price={asset.price.toFixed(2)}
                        change={asset.change.toFixed(2)}
                        logo={asset.logo}
                        type={asset.type}
                        id={asset.id}
                    />
                ))}





            </div>
            <div className="explore-markets">

                <Link to="/stocks" className="explore-card">
                    <h3>Explore Stocks</h3>
                    <p>View 40 stocks</p>
                </Link>

                <Link to="/crypto" className="explore-card">
                    <h3>Explore Crypto</h3>
                    <p>View 40 crypto</p>
                </Link>

            </div>
        </div>
    )
}
export default Home
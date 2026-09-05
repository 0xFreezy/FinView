import { StockCard } from '../components/StockCard'
import { useState } from 'react'
import './Home.css'
function Home() {
    const [search, setSearch] = useState('')
    const trendingAssets = [
        {
            symbol: 'SPX',
            name: 'S&P 500',
            price: 5620,
            change: '+0.85'
        },
        {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            price: 189.3,
            change: '+1.25'
        },
        {
            symbol: 'ETH',
            name: 'Ethereum',
            price: 3500,
            change: '+2.10'
        },
        {
            symbol: 'BTC',
            name: 'Bitcoin',
            price: 65000,
            change: '+1.80'
        }
    ]


    return (
        <div className='home'>
            <h1>Welcome to FinView</h1>
            <input
                type='text'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search stocks, crypto, or companies..."
            />

            <h2>Trending Today</h2>

            <div className="trending">

                {trendingAssets.map((asset) => (
                    <StockCard
                        key={asset.symbol}
                        ticker={asset.symbol}
                        name={asset.name}
                        price={asset.price}
                        change={asset.change}
                    />
                ))}





            </div>
        </div>
    )
}
export default Home
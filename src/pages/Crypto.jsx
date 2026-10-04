import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlobalSearch } from '../components/GlobalSearch'
import { CryptoRow } from '../components/CryptoRow'
import { searchAsset } from '../services/searchService'

import './Crypto.css'

function Crypto() {

    const [cryptoData, setCryptoData] = useState([])
    const [loadingCrypto, setLoadingCrypto] = useState(true)
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

    useEffect(() => {
        async function fetchCrypto() {

            const response = await fetch(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=40&page=1&sparkline=false'
            )

            const data = await response.json()

            console.log(data)

            setCryptoData(data)
            setLoadingCrypto(false)
        }

        fetchCrypto()
    }, [])

    if (loadingCrypto) return <p>Loading...</p>

    return (
        <div className="crypto">

            <GlobalSearch
                search={search}
                setSearch={setSearch}
                onSubmit={handleSearch}
            />

            <div className="crypto-header">
                <span>#</span>
                <span>Name</span>
                <span>Price</span>
                <span>24h</span>
                <span>Market Cap</span>
            </div>

            <div className="crypto-layout">

                {cryptoData.map((coin, index) => (
                    <CryptoRow
                        key={coin.id}
                        rank={index + 1}
                        coin={coin}
                        marketCap={formatMarketCap(coin.market_cap)}
                    />
                ))}

            </div>

        </div>
    )
}

export default Crypto
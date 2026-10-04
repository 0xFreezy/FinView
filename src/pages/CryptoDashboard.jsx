import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CryptoHeader } from '../components/CryptoHeader'
import { CryptoMetrics } from '../components/CryptoMetrics'
import { CryptoChart } from '../components/CryptoChart'
import { CryptoStats } from '../components/CryptoStats'
import { GlobalSearch } from '../components/GlobalSearch'
import { searchAsset } from '../services/searchService'
import './CryptoDashboard.css'
function CryptoDashboard() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [crypto, setCrypto] = useState(null)
    const [loading, setLoading] = useState(true)
    const [chartData, setChartData] = useState([])
    const [timeRange, setTimeRange] = useState('1M')
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
                `https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=${import.meta.env.VITE_COINGECKO_Key}`
            )

            const data = await response.json()
            console.log(data)

            const chartResponse = await fetch(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`
            )

            const chart = await chartResponse.json()
            const formattedChartData = chart.prices.map(([timestamp, price]) => ({
                date: new Date(timestamp).toLocaleDateString(),
                price: price
            }))
            setChartData(formattedChartData)

            setCrypto(data)
            setLoading(false)
        }

        fetchCrypto()

    }, [id])

    if (loading) {
        return <p>Loading...</p>
    }
    let displayedChartData = chartData

    if (timeRange === '1D') displayedChartData = chartData.slice(-2)
    if (timeRange === '1W') displayedChartData = chartData.slice(-7)
    if (timeRange === '1M') displayedChartData = chartData.slice(-30)
    if (timeRange === '3M') displayedChartData = chartData.slice(-90)

    return (
        <div className="crypto-dashboard">
            <GlobalSearch
                search={search}
                setSearch={setSearch}
                onSubmit={handleSearch} />
            <CryptoHeader crypto={crypto} />
            <CryptoMetrics crypto={crypto} />
            <CryptoChart
                displayedChartData={displayedChartData}
                timeRange={timeRange}
                setTimeRange
                ={setTimeRange}
            />
            <CryptoStats crypto={crypto} />
        </div>
    )
}

export default CryptoDashboard
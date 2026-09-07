import { useParams } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from 'react'

import './Dashboard.css'

function Dashboard() {
    const { symbol } = useParams()
      const [stock, setStock] = useState(null)
    const [loading, setLoading] = useState(true)

    const priceData = [
        { date: 'Jan', price: 150 },
        { date: 'Feb', price: 160 },
        { date: 'Mar', price: 155 },
        { date: 'Apr', price: 170 },
        { date: 'May', price: 180 },
        { date: 'Jun', price: 189 },
    ]
useEffect(() => {
    async function fetchData() {
        const response = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=YOUR_KEY`
        )

        const data = await response.json()

        console.log(data)

        setStock({
            name: symbol,
            symbol: symbol,
            price: 189.23,
            change: '+1.25%'
        })

        setLoading(false)
    }

    fetchData()
}, [symbol])

if (loading) {
    return <p>Loading...</p>
}
    return (
        <div className="dashboard">
            <div className="company-header">
                <img src="" alt="logo" />
                <p>{stock.name}</p>
                <p>{stock.symbol}</p>
                <p>{stock.price}</p>
                <p>{stock.change}</p>
            </div>

            <div className="metrics">
                <div className="metric-card">
                    <p>P/E Ratio</p>
                    <h3>28.45</h3>
                </div>
                <div className="metric-card">
                    <p>EV/EBITDA</p>
                    <h3>19.22</h3>
                </div>
                <div className="metric-card">
                    <p>Revenue Growth</p>
                    <h3>8.26%</h3>
                </div>
                <div className="metric-card">
                    <p>Net Margin</p>
                    <h3>24.30%</h3>
                </div>
            </div>

            <div className="chart-valuation">
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={priceData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="price" stroke="#00ff88" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="valuation-summary">
                    <h3>Valuation Summary</h3>
                    <div className="val-row">
                        <p>DCF (10Y)</p>
                        <p>$205.50</p>
                        <p>+8.60%</p>
                    </div>
                    <div className="val-row">
                        <p>EV/EBITDA</p>
                        <p>$195.20</p>
                        <p>+3.16%</p>
                    </div>
                    <div className="val-row">
                        <p>P/E Comps</p>
                        <p>$215.30</p>
                        <p>+13.79%</p>
                    </div>
                    <div className="val-row">
                        <p>Graham Number</p>
                        <p>$170.95</p>
                        <p>-9.68%</p>
                    </div>
                </div>
            </div>
            <div className="financial-history">
                <h3>Financial History (USD in billions)</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>2021</th>
                            <th>2022</th>
                            <th>2023</th>
                            <th>2024</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Revenue</td>
                            <td>365.8</td>
                            <td>394.3</td>
                            <td>394.3</td>
                            <td>383.3</td>
                        </tr>
                        <tr>
                            <td>Gross Profit</td>
                            <td>152.8</td>
                            <td>170.8</td>
                            <td>169.1</td>
                            <td>174.3</td>
                        </tr>
                        <tr>
                            <td>Net Income</td>
                            <td>94.7</td>
                            <td>99.8</td>
                            <td>97.0</td>
                            <td>96.0</td>
                        </tr>
                        <tr>
                            <td>Free Cash Flow</td>
                            <td>71.0</td>
                            <td>111.4</td>
                            <td>110.5</td>
                            <td>97.5</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
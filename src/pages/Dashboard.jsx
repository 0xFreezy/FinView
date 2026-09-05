import { useParams } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import './Dashboard.css'

function Dashboard() {
    const { symbol } = useParams()

    const priceData = [
        { date: 'Jan', price: 150 },
        { date: 'Feb', price: 160 },
        { date: 'Mar', price: 155 },
        { date: 'Apr', price: 170 },
        { date: 'May', price: 180 },
        { date: 'Jun', price: 189 },
    ]

    const stock = {
        name: 'Apple Inc.',
        symbol: 'AAPL',
        price: 189.23,
        change: '+1.25%'
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
        </div>
    )
}

export default Dashboard
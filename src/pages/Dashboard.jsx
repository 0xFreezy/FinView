import { useParams } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from 'react'

import './Dashboard.css'

function Dashboard() {
    const { symbol } = useParams()
    const [stock, setStock] = useState(null)
    const [loading, setLoading] = useState(true)
    const [incomeStatement, setIncomeStatement] = useState([])
    const [cashFlow, setCashFlow] = useState([])
    const [chartData, setChartData] = useState([])
    const [timeRange, setTimeRange] = useState('1M')
    const [evEbitda, setEvEbitda] = useState(null)
    const [evEbitdaTargetPrice, setEvEbitdaTargetPrice] = useState(null)
    const [grahamNumber, setGrahamNumber] = useState(null)
    const [peTargetPrice, setPeTargetPrice] = useState(null)
    const [dcfTargetPrice, setDcfTargetPrice] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=252&apikey=${import.meta.env.VITE_TwelveData_Key}`
            )

            const data = await response.json()
            console.log(data)

            const quoteResponse = await fetch(
                `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${import.meta.env.VITE_TwelveData_Key}`
            )

            const quoteData = await quoteResponse.json()
            console.log(quoteData)

            const incomeResponse = await fetch(
                `https://financialmodelingprep.com/stable/income-statement?symbol=${symbol}&apikey=${import.meta.env.VITE_FMP_Key}`
            )

            const incomeData = await incomeResponse.json()
            console.log(incomeData[0])

            setIncomeStatement(incomeData)
            console.log(incomeData)

            const balanceResponse = await fetch(
                `https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${symbol}&apikey=${import.meta.env.VITE_FMP_Key}`
            )

            const balanceData = await balanceResponse.json()
            console.log(balanceData[0])
            const cashFlowResponse = await fetch(
                `https://financialmodelingprep.com/stable/cash-flow-statement?symbol=${symbol}&apikey=${import.meta.env.VITE_FMP_Key}`
            )

            const cashFlowData = await cashFlowResponse.json()
            console.log(cashFlowData[0])
            setCashFlow(cashFlowData)




            const cash = balanceData[0].cashAndCashEquivalents
            const debt = balanceData[0].totalDebt

            console.log(cash)
            console.log(debt)
            const shares = incomeData[0].weightedAverageShsOut



            const bookValuePerShare =
                balanceData[0].totalStockholdersEquity / shares

            const grahamNumberValue =
                Math.sqrt(22.5 * incomeData[0].eps * bookValuePerShare)

            setGrahamNumber(grahamNumberValue)

            const marketCap = Number(quoteData.close) * shares
            const enterpriseValue = marketCap + debt - cash
            setEvEbitda(enterpriseValue / incomeData[0].ebitda)


            console.log("Market Cap:", marketCap)
            console.log(balanceData[0])
            console.log("Enterprise Value:", enterpriseValue)
            console.log("EV/EBITDA:", evEbitda)



            const timeSeries = data.values
            if (!timeSeries) {
                console.log("No time series data")
                return
            }


            const currentPrice = Number(quoteData.close)
            const change = Number(quoteData.change)
            const percentChange = Number(quoteData.percent_change)

            console.log(timeSeries)

            const targetMultiple = 10

            const targetEnterpriseValue =
                incomeData[0].ebitda * targetMultiple

            const targetEquityValue =
                targetEnterpriseValue - debt + cash

            const targetPrice =
                targetEquityValue / shares

            setEvEbitdaTargetPrice(targetPrice)

            const targetPE = 30

            const peTargetPriceValue =
                incomeData[0].eps * targetPE

            setPeTargetPrice(peTargetPriceValue)


            const currentFCF = cashFlowData[0].freeCashFlow
            const growthRate = 0.08
            const discountRate = 0.10
            let dcfValue = 0
            for (let year = 1; year <= 10; year++) {
                const futureFCF =
                    currentFCF * Math.pow(1 + growthRate, year)

                const presentValue =
                    futureFCF / Math.pow(1 + discountRate, year)

                dcfValue += presentValue
            }
            const terminalGrowth = 0.03
            const terminalFCF =
                currentFCF *
                Math.pow(1 + growthRate, 10) *
                (1 + terminalGrowth)

            const terminalValue =
                terminalFCF /
                (discountRate - terminalGrowth)
            const presentTerminalValue =
                terminalValue /
                Math.pow(1 + discountRate, 10)

            dcfValue += presentTerminalValue
            const dcfEquityValue =
                dcfValue - debt + cash

            const dcfPrice =
                dcfEquityValue / shares
            setDcfTargetPrice(dcfPrice)


            const formattedChartData = timeSeries.map((values) => ({
                date: values.datetime,
                price: Number(values.close)
            })).reverse()

            setChartData(formattedChartData)

            console.log(chartData)

            setStock({
                name: quoteData.name,
                symbol: symbol,
                price: currentPrice,
                change: change,
                percentChange: percentChange
            })

            setLoading(false)
        }

        fetchData()
    }, [symbol])

    if (loading) {
        return <p>Loading...</p>
    }
    let displayedChartData = chartData

    if (timeRange === '1D') {
        displayedChartData = chartData.slice(-2)
    }

    if (timeRange === '1W') {
        displayedChartData = chartData.slice(-5)
    }

    if (timeRange === '1M') {
        displayedChartData = chartData.slice(-22)
    }

    if (timeRange === '3M') {
        displayedChartData = chartData.slice(-66)
    }
    const peRatio = stock.price / incomeStatement[0].eps

    const revenueGrowth =
        ((incomeStatement[0].revenue - incomeStatement[1].revenue) /
            incomeStatement[1].revenue) * 100

    const netMargin =
        (incomeStatement[0].netIncome / incomeStatement[0].revenue) * 100
    console.log("EPS:", incomeStatement[0].eps)
    console.log("Price:", stock.price)
    console.log("PE:", peRatio)

    const evEbitdaUpside =
        evEbitdaTargetPrice !== null
            ? ((evEbitdaTargetPrice - stock.price) / stock.price) * 100
            : null
    const grahamUpside =
        grahamNumber !== null
            ? ((grahamNumber - stock.price) / stock.price) * 100
            : null
    const peUpside =
        peTargetPrice !== null
            ? ((peTargetPrice - stock.price) / stock.price) * 100
            : null
    const dcfUpside =
        dcfTargetPrice !== null
            ? ((dcfTargetPrice - stock.price) / stock.price) * 100
            : null

    console.log(
        incomeStatement.map(statement => ({
            year: statement.date,
            revenue: statement.revenue,
            netIncome: statement.netIncome,
            grossProfit: statement.grossProfit
        }))
    )


    return (
        <div className="dashboard">
            <div className="company-header">


                <p>{stock.name}</p>
                <p>{stock.symbol}</p>
                <p>${stock.price.toFixed(2)}</p>
                <p>
                    {stock.change >= 0 ? '+' : ''}
                    {stock.change.toFixed(2)}
                    ({stock.percentChange >= 0 ? '+' : ''}
                    {stock.percentChange.toFixed(2)}%)
                </p>
            </div>

            <div className="metrics">
                <div className="metric-card">
                    <p>P/E Ratio</p>
                    <h3>{peRatio.toFixed(2)}</h3>
                </div>
                <div className="metric-card">
                    <p>EV/EBITDA</p>
                    <h3>{evEbitda !== null ? evEbitda.toFixed(2) : '-'}</h3>
                </div>
                <div className="metric-card">
                    <p>Revenue Growth</p>
                    <h3>{revenueGrowth.toFixed(2)}%</h3>
                </div>
                <div className="metric-card">
                    <p>Net Margin</p>
                    <h3>{netMargin.toFixed(2)}%</h3>
                </div>
            </div>

            <div className="chart-valuation">
                <div className="chart-container">
                    <div className="time-range">
                        <button
                            className={timeRange === '1D' ? 'active' : ''}
                            onClick={() => setTimeRange('1D')}
                        >
                            1D
                        </button>

                        <button
                            className={timeRange === '1W' ? 'active' : ''}
                            onClick={() => setTimeRange('1W')}
                        >
                            1W
                        </button>

                        <button
                            className={timeRange === '1M' ? 'active' : ''}
                            onClick={() => setTimeRange('1M')}
                        >
                            1M
                        </button>

                        <button
                            className={timeRange === '3M' ? 'active' : ''}
                            onClick={() => setTimeRange('3M')}
                        >
                            3M
                        </button>

                        <button
                            className={timeRange === '1Y' ? 'active' : ''}
                            onClick={() => setTimeRange('1Y')}
                        >
                            1Y
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={displayedChartData}>
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#8b8fa8', fontSize: 12 }}
                            />

                            <YAxis
                                domain={['auto', 'auto']}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#8b8fa8', fontSize: 12 }}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#151926',
                                    border: '1px solid #2a2f3e',
                                    borderRadius: '8px',
                                    color: 'white'
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#22C55E"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="valuation-summary">
                    <h3>Valuation Summary</h3>
                    <div className="val-row">
                        <p>DCF (10Y)</p>
                        <p>
                            {dcfTargetPrice !== null
                                ? `$${dcfTargetPrice.toFixed(2)}`
                                : '-'}
                        </p>

                        <p>
                            {dcfUpside !== null
                                ? `${dcfUpside >= 0 ? '+' : ''}${dcfUpside.toFixed(2)}%`
                                : '-'}
                        </p>
                    </div>
                    <div className="val-row">
                        <p>EV/EBITDA</p>
                        <p>
                            {evEbitdaTargetPrice !== null
                                ? `$${evEbitdaTargetPrice.toFixed(2)}`
                                : '-'}
                        </p>
                        <p>
                            {evEbitdaUpside !== null
                                ? `${evEbitdaUpside >= 0 ? '+' : ''}${evEbitdaUpside.toFixed(2)}%`
                                : '-'}
                        </p>
                    </div>
                    <div className="val-row">
                        <p>P/E Comps</p>
                        <p>
                            {peTargetPrice !== null
                                ? `$${peTargetPrice.toFixed(2)}`
                                : '-'}
                        </p>
                        <p>
                            {peUpside !== null
                                ? `${peUpside >= 0 ? '+' : ''}${peUpside.toFixed(2)}%`
                                : '-'}
                        </p>
                    </div>
                    <div className="val-row">
                        <h3>Graham Number</h3>

                        <p>
                            {grahamNumber !== null
                                ? `$${grahamNumber.toFixed(2)}`
                                : "Loading..."}
                        </p>

                        <span>
                            {grahamUpside !== null
                                ? `${grahamUpside >= 0 ? "+" : ""}${grahamUpside.toFixed(2)}%`
                                : "Loading..."}
                        </span>
                    </div>
                </div>
            </div>
            <div className="financial-history">
                <h3>Financial History (USD in billions)</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>2025</th>
                            <th>2024</th>
                            <th>2023</th>
                            <th>2022</th>
                            <th>2021</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Revenue</td>
                            <td>{(incomeStatement[0].revenue / 1_000_000_000).toFixed(1)}</td>
                            <td>{(incomeStatement[1].revenue / 1_000_000_000).toFixed(1)}</td>
                            <td>{(incomeStatement[2].revenue / 1_000_000_000).toFixed(1)}</td>
                            <td>{(incomeStatement[3].revenue / 1_000_000_000).toFixed(1)}</td>
                            <td>{(incomeStatement[4].revenue / 1_000_000_000).toFixed(1)}</td>
                        </tr>

                        <tr>
                            <td>Gross Profit</td>
                            <td>{(incomeStatement[0].grossProfit / 1_000_000_000).toFixed(1)}</td>
                            <td>{(incomeStatement[1].grossProfit / 1_000_000_000).toFixed(1)}</td>
                            <td>{(incomeStatement[2].grossProfit / 1_000_000_000).toFixed(1)}</td>
                            <td>{(incomeStatement[3].grossProfit / 1_000_000_000).toFixed(1)}</td>
                            <td>{(incomeStatement[4].grossProfit / 1_000_000_000).toFixed(1)}</td>
                        </tr>

                        <tr>
                            <td>Net Income</td>
                            <td>{(incomeStatement[0].netIncome / 1_000_000_000).toFixed(1)}</td>
                            <td>{(incomeStatement[1].netIncome / 1_000_000_000).toFixed(1)}</td>
                            <td>{(incomeStatement[2].netIncome / 1_000_000_000).toFixed(1)}</td>
                            <td>{(incomeStatement[3].netIncome / 1_000_000_000).toFixed(1)}</td>
                            <td>{(incomeStatement[4].netIncome / 1_000_000_000).toFixed(1)}</td>
                        </tr>
                        <tr>
                            <td>Free Cash Flow</td>
                            <td>{(cashFlow[0].freeCashFlow / 1_000_000_000).toFixed(1)}</td>
                            <td>{(cashFlow[1].freeCashFlow / 1_000_000_000).toFixed(1)}</td>
                            <td>{(cashFlow[2].freeCashFlow / 1_000_000_000).toFixed(1)}</td>
                            <td>{(cashFlow[3].freeCashFlow / 1_000_000_000).toFixed(1)}</td>
                            <td>{(cashFlow[4].freeCashFlow / 1_000_000_000).toFixed(1)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Dashboard
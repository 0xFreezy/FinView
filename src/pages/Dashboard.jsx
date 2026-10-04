import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CompanyHeader } from '../components/CompanyHeader'
import { Metrics } from '../components/Metrics'
import { StockChart } from '../components/StockChart'
import { ValuationSummary } from '../components/ValuationSummary.jsx'
import { FinancialHistory } from '../components/FinancialHistory'
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
    const [roe, setRoe] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchData() {

            try {
                //prvo site api fetching
                const response = await fetch(
                    `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=252&apikey=${import.meta.env.VITE_TwelveData_Key}`
                )

                const data = await response.json()
                const timeSeries = data.values

                if (!timeSeries) {
                    console.log("No time series data")
                    return
                }
                const formattedChartData = timeSeries.map((values) => ({
                    date: values.datetime,
                    price: Number(values.close)
                })).reverse()

                setChartData(formattedChartData)


                const quoteResponse = await fetch(
                    `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${import.meta.env.VITE_TwelveData_Key}`
                )

                const quoteData = await quoteResponse.json()
                const currentPrice = Number(quoteData.close)
                const change = Number(quoteData.change)
                const percentChange = Number(quoteData.percent_change)

                const stockData = {
                    name: quoteData.name,
                    symbol: symbol,
                    price: currentPrice,
                    change: change,
                    percentChange: percentChange
                }

                setStock(stockData)


                const incomeResponse = await fetch(
                    `https://financialmodelingprep.com/stable/income-statement?symbol=${symbol}&apikey=${import.meta.env.VITE_FMP_Key}`
                )

                const incomeData = await incomeResponse.json()

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

                //nekoj valuations
                const cash = balanceData[0].cashAndCashEquivalents
                const debt = balanceData[0].totalDebt
                const shares = incomeData[0].weightedAverageShsOut

                //graham presmetka
                const bookValuePerShare =
                    balanceData[0].totalStockholdersEquity / shares

                const grahamNumberValue =
                    Math.sqrt(22.5 * incomeData[0].eps * bookValuePerShare)

                setGrahamNumber(grahamNumberValue)
                //EV/EBITDA
                const marketCap = Number(quoteData.close) * shares
                const enterpriseValue = marketCap + debt - cash

                const evEbitdaValue =
                    enterpriseValue / incomeData[0].ebitda

                setEvEbitda(evEbitdaValue)

                const targetMultiple = 15

                const targetEnterpriseValue =
                    incomeData[0].ebitda * targetMultiple

                const targetEquityValue =
                    targetEnterpriseValue - debt + cash

                const targetPrice =
                    targetEquityValue / shares

                setEvEbitdaTargetPrice(targetPrice)

                //PE

                const targetPE = 35

                const peTargetPriceValue =
                    incomeData[0].eps * targetPE

                setPeTargetPrice(peTargetPriceValue)
                // DCF
                const currentFCF = cashFlowData[0].freeCashFlow
                const currentRevenue = incomeData[0].revenue
                const fcfMargin = currentFCF / currentRevenue
                const growthRate = 0.096
                const discountRate = 0.09

                let dcfValue = 0
                let revenue = currentRevenue

                for (let year = 1; year <= 10; year++) {
                    revenue = revenue * (1 + growthRate)

                    const futureFCF = revenue * fcfMargin

                    const presentValue =
                        futureFCF / Math.pow(1 + discountRate, year)

                    dcfValue += presentValue
                }

                const terminalGrowth = 0.03

                const terminalFCF =
                    revenue *
                    fcfMargin *
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
                //ROE
                const roeValue =
                    (incomeData[0].netIncome /
                        balanceData[0].totalStockholdersEquity) * 100

                setRoe(roeValue)




            } catch (error) {
                console.error(error)
                setError('Failed to load stock data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [symbol])

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
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
            <CompanyHeader stock={stock} />

            <Metrics
                peRatio={peRatio}
                evEbitda={evEbitda}
                revenueGrowth={revenueGrowth}
                netMargin={netMargin}
                roe={roe}
            />

            <div className="chart-valuation">
                <StockChart
                    displayedChartData={displayedChartData}
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                />

                <ValuationSummary
                    dcfTargetPrice={dcfTargetPrice}
                    dcfUpside={dcfUpside}
                    evEbitdaTargetPrice={evEbitdaTargetPrice}
                    evEbitdaUpside={evEbitdaUpside}
                    peTargetPrice={peTargetPrice}
                    peUpside={peUpside}
                    grahamNumber={grahamNumber}
                    grahamUpside={grahamUpside}
                />
            </div>
            <FinancialHistory
                incomeStatement={incomeStatement}
                cashFlow={cashFlow}
            />
        </div>
    )
}


export default Dashboard
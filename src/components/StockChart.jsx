import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'


export function StockChart({ displayedChartData, timeRange, setTimeRange }) {
    return (
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

            <ResponsiveContainer width="100%" height="100%">
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
    )
}


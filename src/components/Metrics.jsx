export function Metrics({ peRatio, evEbitda, revenueGrowth, netMargin, roe }) {
    return (
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

            <div className="metric-card">
                <p>ROE</p>
                <h3>{roe !== null ? roe.toFixed(2) : '-'}%</h3>
            </div>
        </div>
    )
}




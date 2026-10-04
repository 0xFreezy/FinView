export function ValuationSummary({
    dcfTargetPrice,
    dcfUpside,
    evEbitdaTargetPrice,
    evEbitdaUpside,
    peTargetPrice,
    peUpside,
    grahamNumber,
    grahamUpside
}) {
    return (
        <div className="valuation-summary">
            <h3>Valuation Summary</h3>

            <div className="val-row">
                <p>DCF (10Y)</p>

                <p>
                    {dcfTargetPrice !== null
                        ? `$${dcfTargetPrice.toFixed(2)}`
                        : '-'}
                </p>

                <p className={dcfUpside >= 0 ? 'positive' : 'negative'}>
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

                <p className={evEbitdaUpside >= 0 ? 'positive' : 'negative'}>
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

                <p className={peUpside >= 0 ? 'positive' : 'negative'}>
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
                        : 'Loading...'}
                </p>

                <span className={grahamUpside >= 0 ? 'positive' : 'negative'}>
                    {grahamUpside !== null
                        ? `${grahamUpside >= 0 ? '+' : ''}${grahamUpside.toFixed(2)}%`
                        : 'Loading...'}
                </span>
            </div>
        </div>
    )
}
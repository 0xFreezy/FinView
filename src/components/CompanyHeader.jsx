export function CompanyHeader({ stock }) {
    return (
        <div className="company-header-dashboard">

            <div className="company-info-dashboard">

                <div className="company-logo">
                    <img
                        src={`https://img.loadlogo.com/ticker/${stock.symbol}`}
                        alt={stock.symbol}
                        className="company-logo-img"
                    />
                </div>

                <div className="company-name-dashboard">
                    <p>{stock.name}</p>
                    <span>{stock.symbol} • NASDAQ</span>
                </div>

            </div>

            <div className="header-divider"></div>

            <div className="price-info">

                <div className="price">
                    <strong>${stock.price.toFixed(2)}</strong>
                    <span>USD</span>
                </div>

                <p className={stock.change >= 0 ? 'positive' : 'negative'}>
                    {stock.change >= 0 ? '+' : ''}
                    {stock.change.toFixed(2)}
                    {' '}
                    ({stock.percentChange >= 0 ? '+' : ''}
                    {stock.percentChange.toFixed(2)}%)
                </p>

            </div>

        </div>
    )
}
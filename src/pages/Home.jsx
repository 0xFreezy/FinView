import './Home.css'
function Home() {

    return (
        <div className='home'>
            <h1>Welcome to FinView</h1>
            <input
                type='text'
                placeholder="Search stocks, crypto, or companies..."
            />
            <h2>Trending Today</h2>

            <div className="trending">
                <div className="stock-card">SPX</div>
                <div className="stock-card">AAPL</div>
                <div className="stock-card">BTC</div>
                <div className="stock-card">ETH</div>
            </div>
        </div>
    )
}
export default Home
import './GlobalSearch.css'

export function GlobalSearch({ search, setSearch, onSubmit}) {

    function handleKeyDown(e) {
        if (e.key === 'Enter' && search.trim()) {
            onSubmit(search.trim())
        }
    }

    return (
        <div className="global-search-wrapper">

            <div className="global-search">

                <span className="search-icon">⌕</span>

                <input

                    type="text"
                    placeholder="Search stocks or crypto (e.g. AAPL, BTC)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                  
                />

            </div>

        </div>
    )
}
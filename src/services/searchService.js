export async function searchAsset(query) {

    const cleanQuery = query.trim().toLowerCase()

  //proveri stock symbol
    const stockResponse = await fetch(
        `https://finnhub.io/api/v1/search?q=${query}&token=${import.meta.env.VITE_FINNHUB_Key}`
    )

    const stockData = await stockResponse.json()

   
    const stock = stockData.result?.find(
        item =>
            item.type === 'Common Stock' &&
            item.symbol?.toLowerCase() === cleanQuery
    )

    if (stock) {
        return {
            type: 'stock',
            symbol: stock.symbol
        }
    }

    // proveri crypto symbol
    const cryptoResponse = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
    )

    if (!cryptoResponse.ok) {
        console.log(
            'CoinGecko search failed:',
            cryptoResponse.status
        )
    } else {

        const cryptoData = await cryptoResponse.json()

       
        const coinBySymbol = cryptoData.coins?.find(
            coin =>
                coin.symbol?.toLowerCase() === cleanQuery
        )

        if (coinBySymbol) {
            return {
                type: 'crypto',
                id: coinBySymbol.id
            }
        }

        // proveri crypto name
        const coinByName = cryptoData.coins?.find(
            coin =>
                coin.name?.toLowerCase() === cleanQuery
        )

        if (coinByName) {
            return {
                type: 'crypto',
                id: coinByName.id
            }
        }
    }

    // 3. proveri stocks name
    const stockByName = stockData.result?.find(
        item =>
            item.type === 'Common Stock' &&
            item.description?.toLowerCase().startsWith(cleanQuery)
    )

    if (stockByName) {
        return {
            type: 'stock',
            symbol: stockByName.symbol
        }
    }

    return null
}
export function FinancialHistory({ incomeStatement, cashFlow }) {
    return (
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
    )
}


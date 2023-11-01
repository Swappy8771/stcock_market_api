// StockChart.js
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { API_BASE_URL, IEX_CLOUD_API_TOKEN, TICKER_SYMBOLS } from './config';

const StockChart = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const promises = TICKER_SYMBOLS.map(async (symbol) => {
        const response = await fetch(`${API_BASE_URL}/stock/${symbol}/chart/1m?token=${IEX_CLOUD_API_TOKEN}`);
        const data = await response.json();
        return { symbol, data };
      });

      const allData = await Promise.all(promises);
      setStockData(allData);
    };

    fetchStockData();
  }, []);

  return (
    <div className="stock-chart">
      <LineChart width={800} height={400} data={stockData[0]?.data || []}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />

        {stockData.map((stock, index) => (
          <Line
            key={stock.symbol}
            type="monotone"
            dataKey="close"
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            name={stock.symbol}
          />
        ))}
      </LineChart>
    </div>
  );
};

export default StockChart;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const PieChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        const data = response.data;

        // Extracting unique categories and their counts
        const categories = {};
        data.forEach(item => {
          if (categories[item.category]) {
            categories[item.category] += 1;
          } else {
            categories[item.category] = 1;
          }
        });

        // Transforming data into an array of objects
        const chartData = Object.keys(categories).map(category => ({
          name: category,
          value: categories[category],
        }));

        setChartData(chartData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSliceClick = (data, index) => {
    const selectedData = chartData[index];
    setPopupData(selectedData);
  };

  return (
    <div className='piechart'>
    <h1>Pie Chart</h1>
      <PieChart width={1000} height={500} >
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={190}
          className='piediagram'
          fill="#8884d8"
          onClick={handleSliceClick}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`#${((Math.random() * 0xffffff) << 0).toString(16)}`} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {popupData && (
        <div className='pie'>
          <h3>Category - {popupData.name}</h3>
          <p>{popupData.value} items are Available</p>
        </div>
      )}
    </div>
  );
};

export default PieChartComponent;

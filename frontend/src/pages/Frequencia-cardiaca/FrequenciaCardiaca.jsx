import Menu from '../../components/Menu';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';

const HeartRateSimulator = () => {
  const [heartRate, setHeartRate] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [heartRateHistory, setHeartRateHistory] = useState([]);
  const [chartOptions, setChartOptions] = useState({
    options: {
      chart: {
        id: 'realtime',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000,
          },
        },
      },
      xaxis: {
        type: 'datetime',
        categories: [],
      },
      yaxis: {
        min: 0,
        max: 120,
      },
      // Add a horizontal baseline at y = 60
      annotations: {
        yaxis: [
          {
            y: 60,
            borderColor: '#999',
            label: {
              show: true,
              text: 'Baseline',
              style: {
                color: '#fff',
                background: '#00E396',
              },
            },
          },
        ],
      },
    },
    series: [
      {
        name: 'Heart Rate',
        data: [],
      },
    ],
  });

  useEffect(() => {
    let intervalId;

    const simulateHeartRate = () => {
      intervalId = setInterval(() => {
        const newHeartRate = Math.floor(Math.random() * (100 - 60 + 1) + 60);
        setHeartRate(newHeartRate);

        setHeartRateHistory((prevHistory) => [...prevHistory, newHeartRate]);

        setChartOptions((prevOptions) => {
          const currentTime = moment().valueOf();
          
          return {
            ...prevOptions,
            options: {
              ...prevOptions.options,
              xaxis: {
                ...prevOptions.options.xaxis,
                categories: [...prevOptions.options.xaxis.categories, currentTime],
              },
            },
            series: [
              {
                ...prevOptions.series[0],
                data: [...prevOptions.series[0].data, newHeartRate],
              },
            ],
          };
        });
      }, 1000);
    };

    if (isRunning) {
      simulateHeartRate();
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div>
      <h1>Heart Rate Simulator</h1>
      <p>Heart Rate: {heartRate} BPM</p>
      <button onClick={toggleSimulation}>
        {isRunning ? 'Stop Simulation' : 'Start Simulation'}
      </button>

      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default HeartRateSimulator;

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
  const drawBaseline = (y, chartOptions) => {
    const baselinePoints = [];
    const { categories } = chartOptions.options.xaxis;

    for (let i = 0; i < categories.length; i++) {
      baselinePoints.push([i, y]);
    }

    return baselinePoints;
  };
  const getRetaDDA = (x0, y0, xEnd, yEnd) => {
    let pontos = [];
    let dx = xEnd - x0,
      dy = yEnd - y0,
      steps,
      k;
    let xIncrement,
      yIncrement,
      x = x0,
      y = y0;

    if (Math.abs(dx) > Math.abs(dy)) {
      steps = Math.abs(dx);
    } else {
      steps = Math.abs(dy);
    }

    xIncrement = parseFloat(dx) / parseFloat(steps);
    yIncrement = parseFloat(dy) / parseFloat(steps);

    pontos.push([x, y]);

    for (k = 0; k < steps; k++) {
      x += xIncrement;
      y += yIncrement;

      const heartRateValue = Math.floor(Math.random() * (100 - 60 + 1) + 60);
      setHeartRate(heartRateValue);
      pontos.push([x, heartRateValue]);
    }

    return pontos;
  };

  const getRetaPontoMedio = (x0, y0, x1, y1) => {
    [x0, y0] = [Math.round(x0), Math.round(y0)];
    [x1, y1] = [Math.round(x1), Math.round(y1)];
    let [x, y] = [x0, y0];

    let incX = x1 > x0 ? 1 : x1 < x0 ? -1 : 0;
    let incY = y1 > y0 ? 1 : y1 < y0 ? -1 : 0;
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let steep = false;

    if (dy > dx) {
      steep = true;
      [x, y] = [y, x];
      [dx, dy] = [dy, dx];
      [incX, incY] = [incY, incX];
    }

    let d = dx - 2 * dy;
    const pontos = [];

    if (steep) {
      pontos.push([y, x]);
    } else {
      pontos.push([x, y]);
    }

    for (let count = 1; count <= dx; ++count) {
      if (d <= 0) {
        y += incY;
        d += 2 * dx;
      }

      x += incX;
      d -= 2 * dy;

      const heartRateValue = Math.floor(Math.random() * (100 - 60 + 1) + 60);
      setHeartRate(heartRateValue);

      if (steep) {
        pontos.push([y, heartRateValue]);
      } else {
        pontos.push([x, heartRateValue]);
      }
    }

    return pontos;
  };

  const calculateHeartRateLines = (heartRateData) => {
    const ddaLines = [];
    const midpointLines = [];
    const baseline = drawBaseline(60, chartOptions);

    for (let i = 0; i < heartRateData.length - 1; i++) {
      const [x0, y0] = [i, heartRateData[i]];
      const [x1, y1] = [i + 1, heartRateData[i + 1]];

      const ddaPoints = getRetaDDA(x0, y0, x1, y1);
      const midpointPoints = getRetaPontoMedio(x0, y0, x1, y1);

      ddaLines.push(...ddaPoints);
      midpointLines.push(...midpointPoints);
    }

    return { ddaLines, midpointLines, baseline };
  };

  useEffect(() => {
    let intervalId;

    const simulateHeartRate = () => {
      intervalId = setInterval(() => {
        const newHeartRate = Math.floor(Math.random() * (100 - 60 + 1) + 60);
        setHeartRate(newHeartRate);

        setHeartRateHistory((prevHistory) => [...prevHistory, newHeartRate]);

        setChartOptions((prevOptions) => {
          const currentTime = moment().valueOf();
          const { ddaLines, midpointLines } = calculateHeartRateLines([
            ...prevOptions.series[0].data,
            newHeartRate,
          ]);

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

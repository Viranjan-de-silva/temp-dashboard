import React, { useState, useEffect } from 'react';
import './TemperatureDashboard.css';
import GaugeDisplay from '../Gauge Component/GaugeComponent';
import BlobGaugeDisplay from '../Blob Gauage/BlobGauge';
import Frame from '../Frame/Frame';
import Slider from 'rsuite/Slider';
import 'rsuite/Slider/styles/index.css';

function TemperatureDashboard() {
  const [Tvalue, setTempValue] = useState(25.2);
  const [Hvalue, setHuValue] = useState(70.6);
  const [lastTemps, setLastTemps] = useState([]);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch('http://localhost:5000/sensor-data');
        const data = await response.json();
        setTempValue(data.temperature);
        setHuValue(data.humidity);
      } catch (error) {
        console.error('Error fetching temperature:', error);
      }
    };

    const intervalId = setInterval(fetchTemperature, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchLast5Temps = async () => {
    try {
      const response = await fetch('http://localhost:5000/last-5-records');
      const data = await response.json();
      if (Array.isArray(data)) {
        setLastTemps(data);
      } else {
        console.error('Data format is incorrect:', data);
      }
    } catch (error) {
      console.error('Error fetching the data:', error);
    }
  };

  const handleSliderChange = async (value) => {
    try {
      const response = await fetch('http://localhost:5000/slider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error posting slider value:', error);
    }
  };

  return (
    <div className="dashboard">
      {/* First Row: two gauges */}
      <div className="row">
        <Frame className="frame">
          <h1>Temperature Gauge</h1>
          <GaugeDisplay value={Tvalue} />
          <p>Current Value: {Tvalue}°C</p>
        </Frame>

        <Frame className="frame">
          <h1>Humidity Gauge</h1>
          <BlobGaugeDisplay value={Hvalue} />
          <p>Current Value: {Hvalue}%</p>
        </Frame>
      </div>

      {/* Second Row: Button */}
      <div className="row">
        <Frame className="frame-wide">
          <h1>Press update button to fetch last five temp and humidity data</h1>
          <button className="button" onClick={fetchLast5Temps}>
            Update
          </button>
          {lastTemps.length > 0 && (
            <div>
              <h3>Last 5 Records:</h3>
              <ul>
                {lastTemps.map((record, index) => (
                  <li key={index}>
                    <strong>Time:</strong> {record.time} | <strong>Temperature:</strong> {record.temperature}°C |{' '}
                    <strong>Humidity:</strong> {record.humidity}%
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Frame>
      </div>

      {/* Third Row: Slider */}
      <div className="row">
        <Frame className="frame-wide">
          <h1>Manual Fan speed controller</h1>
          <Slider
            progress
            min={0}
            max={60}
            defaultValue={0}
            onChange={handleSliderChange}
            className="slider"
          />
          <div className="slider-labels">
            <p className="min-speed">Min Speed</p>
            <p className="mid-speed">|</p>
            <p className="max-speed">Max Speed</p>
          </div>
        </Frame>
      </div>

      <footer className="footer">
        © 2024 Viranjan de Silva. All rights reserved.
      </footer>
    </div>
  );
}

export default TemperatureDashboard;

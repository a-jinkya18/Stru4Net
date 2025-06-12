// src/components/RealTimeSensorData.jsx
import React, { useState } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RealTimeSensorData = ({ bridge }) => {
  const [location, setLocation] = useState('A');

  // 1) Guard against undefined bridge or missing locations
  if (!bridge || !bridge.locations) {
    return <div className="p-6 text-center">Loading sensor data…</div>;
  }

  // 2) Safely pull out the array (or empty array if that key is missing)
  const dataForLoc = bridge.locations[location] || [];

  const getSensor = (type) => dataForLoc.find((s) => s.type === type) || {};

  // Example time-series generator for charts:
  const generateTimeSeries = (baseValue, variation = 2, points = 20) => {
    const now = new Date();
    return Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 60000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      value: parseFloat((baseValue + (Math.random() * variation - variation / 2)).toFixed(2)),
    }));
  };

  // Create series for each metric (falls back to 0)
  const tempSeries = generateTimeSeries(getSensor('DHT22').temperature_C ?? 0, 2, 20);
  const vibSeries = generateTimeSeries(getSensor('AcousticEmissionSensor').event_rate_per_min ?? 0, 5, 20);
  const corSeries = generateTimeSeries(getSensor('HalfCellPotential').potential_mV ?? 0, 10, 20);

  return (
    <div className="bg-white rounded-lg p-5 shadow-md w-full">
      {/* Header + Location Tabs */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Real time sensor data</h2>
        <div>
          {['A', 'B', 'C'].map((loc) => (
            <button
              key={loc}
              onClick={() => setLocation(loc)}
              className={`mx-1 px-3 py-1 rounded ${
                loc === location ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of charts + gauges */}
      <div className="grid grid-cols-2 gap-5">
        {/* Strain (using vibration as placeholder curve) */}
        <SensorWave title="Strain" data={vibSeries} />

        {/* Vibration */}
        <SensorWave title="Vibration" data={vibSeries} />

        {/* Corrosion */}
        <SensorWave title="Corrosion" data={corSeries} />

        {/* Temperature */}
        <SensorCircle
          title="Temperature"
          value={getSensor('DHT22').temperature_C ?? 0}
          unit="°C"
          maxValue={100}
          color="#007bff"
        />

        {/* Load (static/fallback) */}
        <SensorCircle title="Load" value={12400} unit="kg" maxValue={15000} color="#28a745" />

        {/* Humidity */}
        <SensorCircle
          title="Humidity"
          value={getSensor('DHT22').humidity_percent ?? 0}
          unit="%"
          maxValue={100}
          color="#ffc107"
        />
      </div>
    </div>
  );
};

export default RealTimeSensorData;

// ─── Supporting Components ───────────────────────────────────────────────────

const SensorWave = ({ title, data }) => (
  <div className="bg-gray-50 rounded p-4 shadow">
    <h3 className="font-semibold mb-2">{title}</h3>
    <ResponsiveContainer width="100%" height={80}>
      <LineChart data={data}>
        <XAxis dataKey="time" tick={{ fontSize: 8 }} />
        <YAxis hide />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#333" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const SensorCircle = ({ title, value, unit, maxValue, color }) => (
  <div className="bg-gray-50 rounded p-4 shadow text-center">
    <h3 className="font-semibold mb-2">{title}</h3>
    <div className="w-24 mx-auto">
      <CircularProgressbar
        value={value}
        maxValue={maxValue}
        text={`${value}${unit}`}
        styles={buildStyles({
          pathColor: color,
          textColor: '#000',
          trailColor: '#eee',
        })}
      />
    </div>
  </div>
);

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import AnalyticsCharts from '../components/AnalyticsCharts';

const Analytics = () => {
  const { data, loading } = useSelector(state => state.bridge);
  const [selectedBridgeIndex, setSelectedBridgeIndex] = useState(0);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Analytics & Trends</h1>

      <div className="flex space-x-3 mb-5">
        {data.map((bridge, index) => (
          <button
            key={index}
            onClick={() => setSelectedBridgeIndex(index)}
            className={`px-4 py-2 rounded ${index === selectedBridgeIndex ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {bridge.bridge_name}
          </button>
        ))}
      </div>

      {/* <AnalyticsCharts bridge={data[selectedBridgeIndex]} /> */}
    </div>
  );
};

export default Analytics;

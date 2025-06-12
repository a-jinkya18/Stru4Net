// src/components/SensorTable.jsx
import React from 'react';

const SensorTable = ({ locations }) => {
  return (
    <div className="overflow-x-auto my-5">
      {Object.entries(locations).map(([loc, sensors]) => (
        <div key={loc} className="mb-5">
          <h3 className="font-bold mb-2">Location {loc}</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Data</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {sensors.map((sensor, i) => (
                <tr key={i}>
                  <td className="p-2 border">{sensor.type}</td>
                  <td className="p-2 border">
                    {Object.entries(sensor)
                      .filter(([key]) => key !== 'type' && key !== 'status')
                      .map(([key, value]) => (
                        <div key={key}>
                          {key}: {value}
                        </div>
                      ))}
                  </td>
                  <td className="p-2 border">{sensor.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default SensorTable;

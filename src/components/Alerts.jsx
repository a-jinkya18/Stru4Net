import React from 'react';

const Alerts = ({ alerts }) => {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-bold mb-4">Alerts & Notifications</h2>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className="flex justify-between bg-gray-100 p-2 rounded">
            <span>{alert.message}</span>
            <span className="bg-gray-300 px-2 rounded">{alert.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;

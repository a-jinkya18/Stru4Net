// src/components/BridgeCard.jsx
import React, { useState } from 'react';

const statusMap = {
  stable: { text: 'Ok', colorClass: 'text-green-600' },
  maintenance_needed: { text: 'Maintenance needed', colorClass: 'text-red-600' },
  watch_required: { text: 'High risk', colorClass: 'text-red-600' },
};

function formatCoord(value, isLat = true) {
  const abs = Math.abs(value).toFixed(4);
  const hemi = isLat ? (value >= 0 ? 'N' : 'S') : (value >= 0 ? 'E' : 'W');
  return `${abs}° ${hemi}`;
}

// Determine recommendation based on sensor statuses at a location
function evaluateLocation(locSensors) {
  // If any sensor status indicates a critical alert
  const statuses = locSensors.map((s) => s.status);
  if (statuses.some((st) => st.includes('alert') || st.includes('risk') || st === 'maintenance_needed')) {
    return 'needed maintenance';
  }
  // If all sensors are OK or safe
  if (statuses.every((st) => st === 'ok' || st === 'safe')) {
    return 'Ok';
  }
  // Fallback
  return 'Check sensors';
}

const BridgeCard = ({ bridge }) => {
  const [showModal, setShowModal] = useState(false);
  const { bridge_name, status, geo_location, locations } = bridge;
  const stat = statusMap[status] || { text: status, colorClass: 'text-gray-600' };

  // Build recommendations per point
  const recommendations = Object.entries(locations).map(([point, sensors]) => ({
    point,
    recommendation: evaluateLocation(sensors),
  }));

  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm">
      <h2 className="text-xl font-semibold mb-1">{bridge_name}</h2>
      <p className={`${stat.colorClass} mb-2 font-medium`}>{stat.text}</p>
      <p className="text-gray-600 text-sm mb-1">
        {formatCoord(geo_location.latitude, true)}, {formatCoord(geo_location.longitude, false)}
      </p>
      <p className="text-gray-600 mb-4 text-sm">{bridge.city || 'Unknown City'}</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setShowModal(true)}
      >
        Report
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Bridge Report</h3>
            <p><span className="font-medium">Bridge name:</span> {bridge_name}</p>
            <p><span className="font-medium">Status:</span> {stat.text}</p>
            <p><span className="font-medium">Date:</span> {new Date().toLocaleDateString()}</p>
            <div className="mt-4">
              <p className="font-medium mb-2">Further recommendation:</p>
              <ul className="list-disc list-inside">
                {recommendations.map((rec) => (
                  <li key={rec.point}>
                    Point {rec.point}: {rec.recommendation}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="mt-6 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BridgeCard;

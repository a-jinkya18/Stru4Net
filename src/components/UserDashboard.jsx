// src/pages/UserDashboard.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBridgeData } from '../features/BridgeSlice';
import RealTimeSensorData from '../components/RealTimeSensorData';
import Alerts from '../components/Alerts';
import Header from '../components/Header';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { data: bridges, loading, error } = useSelector((state) => state.bridge);

  useEffect(() => {
    dispatch(fetchBridgeData());
  }, [dispatch]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  const bridge = bridges[0];

  const alerts = [
    { message: 'Strain sensor reading exceeds high threshold at A', level: 'HIGH' },
    { message: 'Increased corrosion rate detected at B', level: 'Warning' },
    { message: 'All vibration sensors within normal range', level: 'OK' },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-60 bg-[#0b1f3a] text-white p-6">
          <ul className="space-y-4">
            <li className="bg-blue-600 px-4 py-2 rounded">Dashboard</li>
          </ul>
        </aside>

        <main className="flex-1 bg-gray-100 p-6 overflow-auto flex ">
          {/* Real-time sensor data */}
          <div className="flex-1 bg-white rounded-lg p-6  mr-6 h-[100vh]">
            <RealTimeSensorData bridge={bridge} />
          </div>

          {/* Alerts & Notifications */}
          <div className="w-80 bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold mb-4">Alerts & Notifications</h2>
            <Alerts alerts={alerts} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;

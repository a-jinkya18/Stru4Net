import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBridgeData } from '../features/bridgeSlice';
import BridgeCard from '../components/BridgeCard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: bridges, loading, error } = useSelector((state) => state.bridge);

  useEffect(() => {
    dispatch(fetchBridgeData());
  }, [dispatch]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bridges.map((bridge, index) => (
        <BridgeCard key={index} bridge={bridge} />
      ))}
    </main>
  );
};

export default Dashboard;
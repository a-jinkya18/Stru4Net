export const generateTimeSeries = (baseValue, variation = 2, points = 20) => {
  const now = new Date();
  return Array.from({ length: points }, (_, i) => ({
    time: new Date(now.getTime() - (points - i) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value: parseFloat((baseValue + (Math.random() * variation - variation / 2)).toFixed(2))
  }));
};

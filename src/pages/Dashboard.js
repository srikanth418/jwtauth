import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/dashboard-data')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Dashboard;

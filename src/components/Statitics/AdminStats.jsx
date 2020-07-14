import React, { useState,useEffect } from 'react';
import axios from 'axios';

const AdminStats = () => {
  const [number, setNumber] = useState(0);
  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/stats/admins`)
      .then((response) => response.data)
      .then((data) => setNumber(data[0].admins));
  }, []);

  return (
    <div className="Statistics-Blocks-Overall Admins col-4">
      <div className="Statistics-Blocks-Left col-8">
        <div className="Statistics-Blocks-Number">
          {number}
        </div>
        <div className="Statistics-Blocks-notice">
          <p><strong>Adminstrateurs</strong>  sur la plateforme</p>
        </div>
      </div>
        <div className="Statistics-Blocks-Fas col-4">
          <span className="fas fa-users-cog fa-4x" />
        </div>
    </div>
  );
};

export default AdminStats;

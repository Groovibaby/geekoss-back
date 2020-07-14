import React, { useState,useEffect } from 'react';
import axios from 'axios';

const UsersStats = () => {
  const [number, setNumber] = useState(0);
  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/stats/users`)
      .then((response) => response.data)
      .then((data) => setNumber(data[0].users));
  }, []);

  return (
    <div className="Statistics-Blocks-Overall Users col-4">
      <div className="Statistics-Blocks-Left col-8">
        <div className="Statistics-Blocks-Number">
          {number}
        </div>
        <div className="Statistics-Blocks-notice">
          <p><strong>Utilsiateurs</strong>  inscrits sur Geekoss</p>
        </div>
      </div>
        <div className="Statistics-Blocks-Fas col-4">
          <span className="fas fa-users fa-4x" />
        </div>
    </div>
  );
};

export default UsersStats;

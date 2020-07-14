import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminItem from './AdminItem';

const AdminsList = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/admins`)
      .then((response) => response.data)
      .then((data) => setOffers(data));
  }, []);

  return (
    <section>
      {offers.map((item) => (
        <AdminItem
          key={item.id}
          id={item.id}
          firstname={item.firstname}
          lastname={item.lastname}
          email={item.email}
        />
      ))}
    </section>
  );
};

export default AdminsList;

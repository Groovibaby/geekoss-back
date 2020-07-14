import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsersItem from './UserItem';

const UsersList = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users`)
      .then((response) => response.data)
      .then((data) => setOffers(data));
  }, []);

  return (
    <section>
      {offers.map((item) => (
        <UsersItem
          key={item.id}
          id={item.id}
          firstname={item.firstname}
          lastname={item.lastname}
          email={item.email}
          avatar={item.avatar}
        />
      ))}
    </section>
  );
};

export default UsersList;

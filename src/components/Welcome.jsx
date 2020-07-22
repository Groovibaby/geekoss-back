import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import '../App.css';
import { authContext } from '../contexts/AuthContext';
import AdminStats from './Statitics/AdminStats';
import UsersStats from './Statitics/UsersStats';
import OffersStats from './Statitics/OffersStats';

const Welcome = () => {
  const { auth } = useContext(authContext);
  const [Profile, setProfile] = useState({
    firstname: '',
    lastname: '',
  });

  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/auth',
      headers: {
        Authorization: `Bearer ${auth.data}`,
      },
    })
      .then((response) => response.data)
      .then((data) => setProfile(data.authData.admin[0]));
  }, [auth.data]);

  console.log('Profile', Profile);
  return (
    <>
      <Header />
      <section className="ContainerBody">
        <h1>
          Bienvenue {Profile.firstname} {Profile.lastname}
        </h1>
        <h2>Voici les dernières statistiques</h2>
        <div className="Statistics-Blocks">
          <AdminStats />
          <UsersStats />
          <OffersStats />
        </div>
      </section>
    </>
  );
};

export default Welcome;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OfferItem from './OfferItem';

const OffersList = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/offers`)
      .then((response) => response.data)
      .then((data) => setOffers(data));
  }, []);

  return (
    <section>
      {offers.map((item) => (
        <OfferItem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          localisation={item.localisation}
          price={item.price}
        />
      ))}
    </section>
  );
};

export default OffersList;

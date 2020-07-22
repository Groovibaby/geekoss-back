import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarouselItem from './CarouselItem';

const GeekossList = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/banners`)
      .then((response) => response.data)
      .then((data) => setBanners(data));
  }, []);

  return (
    <section>
      {banners.map((item) => (
        <CarouselItem
          key={item.id}
          id={item.id}
          url_img={item.url_img}
          title={item.title}
          description={item.description}
        />
      ))}
    </section>
  );
};

export default GeekossList;

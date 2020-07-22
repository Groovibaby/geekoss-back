import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import CarouselList from './CarouselList';
import Header from '../Header';

const CarouselGeekoss = () => {
  return (
    <>
      <Header />
      <section className="ContainerBody">
        <div className="Panel">
          <div className="col-md-4">
            <h1 className="PanelTitle">Toutes les bannières</h1>
          </div>
          <div className="ActionPanel col-md-8">
            <Link to="/admin/carousels/add-banners">
              <button type="button" className="ButtonAction Action">
                Ajouter une bannière
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div className="ItemTitle">
            <div className="col-md-1 ActionTitle ActionTitleFont">
              <p>ID</p>
            </div>
            <div className="col-md-2 ActionTitle ActionTitleFont">
              <p>Bannières</p>
            </div>
            <div className="col-md-3  ActionInfos ActionTitleFont">
              <p>Titre</p>
            </div>
            <div className="col-md-5  ActionInfos ActionTitleFont">
              <p>Description</p>
            </div>
            <div className="col-md-1 ActionIcons ActionTitleFont">
              <p>Actions</p>
            </div>
          </div>
        </div>
        <div>
          <CarouselList />
        </div>
      </section>
    </>
  );
};

export default CarouselGeekoss;

import React from 'react';
import '../../App.css';
import OffersList from './OffersList';
import Header from '../Header';

const Offers = () => {
  return (
    <>
      <Header />
      <section className="ContainerBody">
        <div className="Panel">
          <div className="col-md-4">
            <h1 className="PanelTitle">Toutes les annonces</h1>
          </div>
        </div>
        <div>
          <div className="ItemTitle">
            <div className="col-md-1 ActionTitle ActionTitleFont">
              <p>ID</p>
            </div>
            <div className="col-md-2 ActionTitle ActionTitleFont">
              <p>Titre de l'annonce</p>
            </div>
            <div className="col-md-5  ActionInfos ActionTitleFont">
              <p>Description</p>
            </div>
            <div className="col-md-1  ActionInfos ActionTitleFont">
              <p>Prix</p>
            </div>
            <div className="col-md-2  ActionInfos ActionTitleFont">
              <p>Localisation</p>
            </div>
            <div className="col-md-1 ActionIcons ActionTitleFont">
              <p>Actions</p>
            </div>
          </div>
        </div>
        <div>
          <OffersList />
        </div>
      </section>
    </>
  );
};

export default Offers;

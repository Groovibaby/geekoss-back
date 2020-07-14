import React from 'react';
import '../../App.css';
import AdminsList from './AdminsList';
import Header from '../Header';

const Admins = () => {
  return (
    <>
      <Header />
      <section className="ContainerBody">
        <div className="Panel">
          <div className="col-md-4">
            <h1 className="PanelTitle">Tous les admins</h1>
          </div>
        </div>
        <div>
          <div className="ItemTitle">
            <div className="col-md-1 ActionTitle ActionTitleFont">
              <p>ID</p>
            </div>
            <div className="col-md-5 ActionTitle ActionTitleFont">
              <p>Prénom et Nom</p>
            </div>
            <div className="col-md-5  ActionInfos ActionTitleFont">
              <p>Email</p>
            </div>
            <div className="col-md-1 ActionIcons ActionTitleFont">
              <p>Actions</p>
            </div>
          </div>
        </div>
        <div>
          <AdminsList />
        </div>
      </section>
    </>
  );
};

export default Admins;

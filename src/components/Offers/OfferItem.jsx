import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const OfferItem = (props) => {
  const [show, setShow] = useState(false);
  const { id, title, description, localisation, price } = props;

  const handleClose = () => {
    setShow(false);
  };

  const deleteOffer = () => {
    axios
      .delete(`http://localhost:3000/api/offers/${id}`)
      .then(window.location.reload(false))
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(`Erreur lors de la suppression de l'annonce : ${err.message}`);
      });
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer l'annonce {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cette annonce ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => handleClose()}>
            Annuler
          </Button>
          <Button variant="outline-danger" onClick={deleteOffer}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="ItemList">
        <div className="col-md-1 ActionTitle">
          <p>{id}</p>
        </div>
        <div className="col-md-2 ActionTitle">
          <h3>{title}</h3>
        </div>
        <div className="col-md-5  ActionInfos">
          <p>{description}</p>
        </div>
        <div className="col-md-1  ActionInfos">
          <p>{price}€</p>
        </div>
        <div className="col-md-2  ActionInfos">
          <p>{localisation}</p>
        </div>
        <div className="col-md-1 ActionIcons">
          <span
            className="fas fa-trash"
            onClick={() => setShow(true)}
            role="button"
            tabIndex="0"
            onKeyDown={handleClose}
            aria-label="Delete"
          />
        </div>
      </div>
    </>
  );
};

OfferItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

export default OfferItem;

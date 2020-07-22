import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const CarouselItem = (props) => {
  const [show, setShow] = useState(false);
  const { id, url_img, title, description } = props;

  const handleClose = () => {
    setShow(false);
  };

  const deleteOffer = () => {
    axios
      .delete(`http://localhost:3000/api/banners/${id}`)
      .then(window.location.reload(false))
      .catch((err) => {
        alert(`Erreur lors de la suppression de la bannière : ${err.message}`);
      });
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer la bannière {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cette bannière ?
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
        <div className="col-md-2  ActionInfos">
          <img src={url_img} alt={title} className="Banner" />
        </div>
        <div className="col-md-3 ActionTitle">
          <h3>{title}</h3>
        </div>
        <div className="col-md-5  ActionInfos">
          <p>{description}</p>
        </div>
        <div className="col-md-1 ActionIcons">
          <Link to={`/admin/carousels/update-banners/${id}`}>
            <span className="fas fa-pen" />
          </Link>
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

CarouselItem.propTypes = {
  id: PropTypes.number.isRequired,
  url_img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CarouselItem;

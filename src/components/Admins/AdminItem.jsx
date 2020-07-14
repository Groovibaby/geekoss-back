import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const AdminItem = (props) => {
  const [show, setShow] = useState(false);
  const { id, firstname, lastname, email } = props;

  const handleClose = () => {
    setShow(false);
  };

  const defaultImg =
  'https://kuduconsulting.co.zm/wp-content/uploads/2017/11/default-portrait-image-generic-profile.jpg';

  const deleteOffer = () => {
    axios
      .delete(`http://localhost:3000/api/admins/${id}`)
      .then(window.location.reload(false))
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(`Erreur lors de la suppression de l'admin : ${err.message}`);
      });
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer l'administrateur {firstname} {lastname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cet administrateur ?
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
        <div className="col-md-5 ActionTitle">
          <h3>
            {firstname} {lastname}
          </h3>
        </div>
        <div className="col-md-5  ActionInfos">
          <p>{email}</p>
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

AdminItem.propTypes = {
  id: PropTypes.number.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default AdminItem;

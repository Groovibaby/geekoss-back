import React, { useState } from 'react';
import { Modal, Form, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AddBanners = () => {
  const [inputs, setInputs] = useState({
    url_img: '',
    title: '',
    description: '',
  });

  const [show, handleShow] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    const url = `http://localhost:3000/api/banners/`;
    axios.post(url, inputs).then((res) => res.data);
  };

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Modal size="lg" show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>La bannière {inputs.title} a bien été ajoutée !</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Link to="/admin/carousels">
            <button type="button" className="ButtonAction Action">
              Ok
            </button>
          </Link>
        </Modal.Footer>
      </Modal>
      <section className="ContainerBody">
        <div className="Panel">
          <div className="col-md-4">
            <h2 className="mb-5">Ajouter un jeu</h2>
          </div>
          <div className="ActionPanel col-md-8">
            <Link to="/admin/carousels">
              <button type="button" className="ButtonAction Return">
                Retour
              </button>
            </Link>
          </div>
        </div>
        <Form onSubmit={submitForm}>
          <Form.Group onChange={onChange}>
            <Form.Label>URL de l'image</Form.Label>
            <Form.Control type="text" name="url_img" />
          </Form.Group>
          <Form.Group onChange={onChange}>
            <Form.Label>Titre de la bannière</Form.Label>
            <Form.Control type="text" name="title" />
          </Form.Group>
          <Form.Group onChange={onChange}>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" />
          </Form.Group>
          <button
            className="ButtonAction Action"
            type="submit"
            onClick={() => handleShow(true)}
          >
            Créer
          </button>
        </Form>
      </section>
    </>
  );
};

export default AddBanners;

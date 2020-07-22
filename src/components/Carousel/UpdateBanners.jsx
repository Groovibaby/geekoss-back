import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UpdateBanners = ({ match }) => {
  const [inputs, setInputs] = useState({
    url_img: '',
    title: '',
    description: '',
  });

  const [show, handleShow] = useState(false);
  const { id } = match.params;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/banners/${id}`)
      .then((response) => response.data)
      .then((data) => setInputs(data[0]));
  }, [id]);

  const submitForm = (event) => {
    event.preventDefault();
    const url = `http://localhost:3000/api/banners/${id}`;
    axios.put(url, inputs).then((res) => res.data);
  };

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  console.log(inputs);
  return (
    <>
      <Modal size="lg" show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>La bannière {inputs.title} a bien été modifié !</Modal.Title>
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
          <div className="col-md-8">
            <h2 className="mb-8">Modifier la bannière</h2>
          </div>
          <div className="ActionPanel col-md-4">
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
            <Form.Control type="text" name="url_img" value={inputs.url_img} />
          </Form.Group>
          <Form.Group onChange={onChange}>
            <Form.Label>Titre de la bannière</Form.Label>
            <Form.Control type="text" name="title" value={inputs.title} />
          </Form.Group>
          <Form.Group onChange={onChange}>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" value={inputs.description} />
          </Form.Group>
          <button
            className="ButtonAction Action"
            type="submit"
            onClick={() => handleShow(true)}
          >
            Modifier
          </button>
        </Form>
      </section>
    </>
  );
};

UpdateBanners.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default UpdateBanners;

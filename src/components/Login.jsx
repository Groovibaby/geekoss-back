/* eslint-disable react/prop-types */
import React, { useReducer, useContext } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { authContext } from '../contexts/AuthContext';
import geekoss from '../img/geekoss-logo-sm.png';
import '../App.css';

const Login = (props) => {
  const { setAuthData } = useContext(authContext);
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      password: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = 'http://localhost:3000/api/auth/login';
    axios
      .post(url, userInput)
      .then((res) => setAuthData(res.data.token))
      .then(() => props.history.push('/admin'))
      .catch();
  };

  return (
    <section className="LoginBkg">
      <div className="LoginForm">
        <div className="Nav-logo">
          <img src={geekoss} className="Img-logo" alt="Tricky" />
        </div>
        <h1 className="text-center font-weight-bold">Connexion admin</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label className="LoginLabels">Adresse email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Entrez votre email"
              value={userInput.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="LoginLabels">Mot de passe</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              value={userInput.password}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="text-center">
            <button
              className="Action ButtonAction"
              type="submit"
            >Se connecter</button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Login;

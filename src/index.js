import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { queryApi } from './helpers/Api';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

localStorage.clear(); // limpiar localStorage para evitar errores de sesión

if ((await queryApi('GET', 'health')).status !== 'success') {
  root.render(
    <React.StrictMode>
      <h1>No se ha podido conectar con la API.</h1>
      <p>
        El servicio API debe ser accesible en la URL y puerto especificados.
        La dirección por defecto es <code>http://localhost:3001</code>.
        Para modificarla, hay que establecer las variables de entorno <code>API_URL</code> y <code>API_PORT</code> a través de un archivo <code>.env</code> en la raíz del proyecto.
      </p>
    </React.StrictMode>
  );
}

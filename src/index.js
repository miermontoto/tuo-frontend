import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { queryApi } from './helpers/Api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if ((await queryApi('GET', 'health')).status !== 'success') {
  root.render(
    <React.StrictMode>
      <div id='health-error'>
        <h1>No se ha podido conectar con la API.</h1>
        <p>
          El servicio API debe ser accesible en la URL y puerto especificados.
          La dirección por defecto es <code>http://localhost:3001</code>.
          Para modificarla, hay que establecer las variables de entorno <code>API_URL</code> y <code>API_PORT</code> a través de un archivo <code>.env</code> en la raíz del proyecto.
        </p>
      </div>
    </React.StrictMode>
  )

  localStorage.clear()
}

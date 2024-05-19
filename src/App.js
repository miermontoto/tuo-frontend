import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/users/LoginForm';


function App() {
  const [user, setUser] = useState(null);

  return (
    <div className='container'>
      <nav>
        <ul className='navbar'>
          <li> <Link to='/'>Inicio</Link> </li>

          <div id='login'>
            {user == null ? (
              <div>
                <li> <Link to='/login' setUser={setUser}>Iniciar sesión</Link> </li>
                <li> <Link to='/register'>Registrarse</Link> </li>
              </div>
            ) : (
              <div>
                <li> <Link to='/profile'>Perfil</Link> </li>
                <li> <Link to='/logout'>Cerrar sesión</Link> </li>
              </div>
            )}
          </div>
        </ul>
      </nav>

      <Routes>
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;

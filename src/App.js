import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/users/LoginForm';
import RegisterForm from './components/users/RegisterForm';
import LogoutForm from './components/users/LogoutForm';


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
                <li> <Link to='/login'>Iniciar sesión</Link> </li>
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
        <Route path='/login' element={<LoginForm setUser={setUser} />} />
        <Route path='/register' element={<RegisterForm setUser={setUser} />} />
        <Route path='/logout' element={<LogoutForm setUser={setUser} user={user} />} />
      </Routes>
    </div>
  );
}

export default App;

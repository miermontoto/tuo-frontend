import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/users/LoginForm';
import RegisterForm from './components/users/RegisterForm';
import LogoutForm from './components/users/LogoutForm';
import PresentList from './components/presents/PresentList';
import NewPresent from './components/presents/NewPresent';


function App() {
  const [user, setUser] = useState(null);

  return (
    <div className='container'>
      <nav>
        <ul className='navbar'>
          <li> <Link to='/'>Inicio</Link> </li>

            {user != null && (
              <div id='endpoints'>
                <li> <Link to='/presents'>Regalos</Link> </li>
                <li> <Link to='/friends'>Amigos</Link> </li>
              </div>
            )}

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

        <Route path='/presents' element={<PresentList />} />
        <Route path='/presents/new' element={<NewPresent />} />
      </Routes>
    </div>
  );
}

export default App;

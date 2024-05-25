import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';

import FriendsList from './components/friends/FriendsList';
import NewFriend from './components/friends/NewFriend';
import NewPresent from './components/presents/NewPresent';
import PresentDetail from './components/presents/PresentDetail';
import PresentList from './components/presents/PresentList';
import Profile from './components/profile/Profile';
import LoginForm from './components/users/LoginForm';
import LogoutForm from './components/users/LogoutForm';
import RegisterForm from './components/users/RegisterForm';

function App() {
  const [user, setUser] = useState(window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null)

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
                <li> <Link to='/profile'>{user.name}</Link> </li>
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
        <Route path='/presents/edit' element={<NewPresent />} />
        <Route path='/presents/view' element={<PresentDetail />} />

        <Route path='/friends' element={<FriendsList />} />
        <Route path='/friends/new' element={<NewFriend />} />

        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;

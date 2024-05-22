import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryApi } from '../../helpers/Api';


export const HandleLogin = async (setUser, email, password) => {
	const response = await queryApi('POST', 'users/login', { email, password })

	if (!response?.data) return false
	if (response.data.apiKey) {
		localStorage.setItem('token', response.data.apiKey)
		setUser(response.data.user)
	}

	return true
}

const LoginForm = ({ setUser }) => {
	LoginForm.propTypes = {
		setUser: PropTypes.func.isRequired,
	}

	const [inputs, setInputs] = useState({ email: '', password: '' })
	const navigate = useNavigate()

	const handleInputChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const email = inputs.email
		const password = inputs.password

		const result = await HandleLogin(setUser, email, password)
		if (!result || !localStorage.getItem('token')) return // TODO: mostrar mensaje de error

		navigate('/')
	}

	return (
		<div id='login-container'>
			<h2>Inicio de sesión</h2>

			<form onSubmit={handleSubmit}>
				<input
					type='email'
					name='email'
					placeholder='Email'
					value={inputs.email || ''}
					onChange={handleInputChange}
				/>
				<input
					type='password'
					name='password'
					placeholder='Contraseña'
					value={inputs.password || ''}
					onChange={handleInputChange}
				/>
				<button type='submit'>Iniciar sesión</button>
			</form>
		</div>
  	);
}

export default LoginForm;

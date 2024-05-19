import { useState } from 'react'
import { queryApi } from '../../helpers/Api'
import PropTypes from 'prop-types';

import { HandleLogin } from './LoginForm';

const RegisterForm = (props) => {
	RegisterForm.propTypes = {
		setUser: PropTypes.func.isRequired,
	}

	const [inputs, setInputs] = useState({ email: '', password: '', name: ''})
	const { setUser } = props

	const handleInputChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value })
	}


	const handleSubmit = async (e) => {
		e.preventDefault()
		const email = inputs.email
		const password = inputs.password
		const nombre = inputs.name

		const response = await queryApi('POST', 'users/', { email, nombre, password })
		if (!response) return
		if (response.status === 'success') await HandleLogin(setUser, email, password)
	}


	return (
		<div id='register-container'>
			<h2>Registro</h2>

			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='name'
					placeholder='Nombre'
					value={inputs.name || ''}
					onChange={handleInputChange}
				/>
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
				<button type='submit'>Registrarse</button>
			</form>
		</div>
  	);
}

export default RegisterForm

import { useState } from 'react'
import { queryApi } from '../../helpers/Api'
import PropTypes from 'prop-types';
const LoginForm = (props) => {
	LoginForm.propTypes = {
		setUser: PropTypes.func.isRequired,
	}

	const [inputs, setInputs] = useState({ email: '', password: '' })
	const { setUser } = props

	const handleInputChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const email = inputs.email
		const password = inputs.password

		const response = await queryApi('POST', 'users/login', { email, password })

		if (!response) return
		console.log(response)
		if (response.data.apiKey) {
			localStorage.setItem('token', response.data.apiKey)
			window.location.href = '/'
			setUser(response.data.apiKey)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label> Email:
			<input
				type='email'
				name='email'
				value={inputs.email || ''}
				onChange={handleInputChange}
			/>
			</label>
			<label> Contraseña:
			<input
				type='password'
				name='password'
				value={inputs.password || ''}
				onChange={handleInputChange}
			/>
			</label>
			<button type='submit'>Iniciar sesión</button>
		</form>
  	);
}

export default LoginForm

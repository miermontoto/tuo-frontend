import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { queryApi } from '../../helpers/Api';


const LogoutForm = ({ setUser, user }) => {
	LogoutForm.propTypes = {
		setUser: PropTypes.func.isRequired,
		user: PropTypes.object,
	}

	const navigate = useNavigate()

	if (user == null) navigate('/') // TODO: fix this

	const handleSubmit = async (e) => {
		e.preventDefault()

		await queryApi('POST', 'users/disconnect')

		localStorage.removeItem('token')
		setUser(null)
		navigate('/')
	}

	return (
		<div id='logout-container'>
			<h2>Cerrar sesión</h2>

			<span>¿Desea cerrar su sesión?</span>
			<form onSubmit={handleSubmit}>
				<button type='submit' className='red'>Cerrar sesión</button>
				<button onClick={() => navigate('/')}>Volver</button>
			</form>
		</div>
	)
}

export default LogoutForm
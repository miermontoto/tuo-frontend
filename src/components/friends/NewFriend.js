import { useState } from 'react'
import { queryApi } from '../../helpers/Api'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const NewFriend = ({ setFriendsList }) => {
	NewFriend.propTypes = {
		setFriendsList: PropTypes.func.isRequired
	}

	const navigate = useNavigate()
	const [inputs, setInputs] = useState({ email: '' })

	const handleInputChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const result = await queryApi('POST', 'friends', inputs.email)
		if (result?.status === 'success') {
			setFriendsList(friends => [...friends, result.data.friend])
			navigate('/friends')
		}
	}

	return (
		<div id='new-friend'>
			<h2>Nuevo amigo</h2>

			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='email'
					placeholder='Correo electrónico'
					value={inputs.email || ''}
					onChange={handleInputChange}
					required
				/>
				<button type='submit'>Guardar</button>
			</form>
		</div>
	)
}

export default NewFriend

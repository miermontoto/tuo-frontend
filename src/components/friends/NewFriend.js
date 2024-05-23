import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryApi } from '../../helpers/Api';


const NewFriend = () => {
	const target = new URLSearchParams(window.location.search).get('email')

	const navigate = useNavigate()
	const [inputs, setInputs] = useState({ email: target || '' })

	const handleInputChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const result = await queryApi('POST', 'friends', {email: inputs.email})
		if (result?.status === 'success') {
			navigate('/friends')
		}
		console.log(result)
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

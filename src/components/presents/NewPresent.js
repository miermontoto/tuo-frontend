import { useState } from 'react'
import { queryApi } from '../../helpers/Api'
import { useNavigate } from 'react-router-dom';

const NewPresent = () => {
	const navigate = useNavigate()
	const [inputs, setInputs] = useState({ name: '', price: '', description: '', url: '' })

	const handleInputChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		await queryApi('POST', 'presents', inputs)
		navigate('/presents')
		// TODO: gestionar mensaje de success/error, no redirigir directamente
	}

	return (
		<div id='new-present'>
			<h2>Nuevo regalo</h2>

			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='name'
					placeholder='Nombre'
					value={inputs.name || ''}
					onChange={handleInputChange}
				/>
				<input
					type='textarea'
					name='description'
					placeholder='Descripción'
					value={inputs.description || ''}
					onChange={handleInputChange}
				/>
				<input
					type='number'
					name='price'
					placeholder='Precio'
					value={inputs.price || ''}
					onChange={handleInputChange}
				/>
				<input
					type='url'
					name='url'
					placeholder='URL (opcional)'
					value={inputs.url || ''}
					onChange={handleInputChange}
				/>
				<button type='submit'>Guardar</button>
			</form>
		</div>
	)
}

export default NewPresent

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryApi } from '../../helpers/Api';

const NewPresent = () => {
	const id = new URLSearchParams(window.location.search).get('id')
	const navigate = useNavigate()

	// TODO: redirigir a /presents/new si no hay ID
	// TODO: redirigir a /presents/edit si hay ID y está en /presents/new
	useEffect(() => {
		const presentData = async (id) => {
			const present = await queryApi('GET', `presents/${id}`)
			if (present?.data) setInputs(present.data.present)
		}

		if (id) presentData(id)
	}, [id])

	const [inputs, setInputs] = useState({ name: '', price: '', description: '', url: '' })

	const handleInputChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const method = id ? 'PUT' : 'POST'
		const target = id ? `presents/${id}` : 'presents'
		const result = await queryApi(method, target, inputs)
		if (result?.status === 'success') navigate('/presents')
		// TODO: gestionar mensaje de success/error, no redirigir directamente
	}

	return (
		<div id='new-present'>
			{id ? <h2>Editar regalo</h2> : <h2>Nuevo regalo</h2>}

			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='name'
					placeholder='Nombre'
					value={inputs.name || ''}
					onChange={handleInputChange}
					required
				/>
				<input
					type='textarea'
					name='description'
					placeholder='Descripción (opcional)'
					value={inputs.description || ''}
					onChange={handleInputChange}
				/>
				<input
					type='number'
					name='price'
					placeholder='Precio'
					value={inputs.price || ''}
					onChange={handleInputChange}
					required
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

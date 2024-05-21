import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryApi } from '../../helpers/Api';


const PresentList = () => {
	const navigate = useNavigate()
	const [presentList, setPresentList] = useState([])

	useEffect(() => {
		const getPresents = async () => {
			if (!localStorage.getItem('token')) navigate('/login')
			const presents = await queryApi('GET', 'presents')
			setPresentList(presents.data.presents)
		}

		getPresents()
	}, [navigate])

	const handleDelete = async (id) => {
		await queryApi('DELETE', `presents/${id}`)
		setPresentList(presentList.filter(present => present.id !== id))
	}

	return (
		<div id='present-list'>
			<h2>Regalos</h2>
			{presentList.map(present => (
				<div key={present.id} className='present'>
					<h3>{present.name}</h3>
					<p>{present.description}</p>
					<span>{present.price}€ @ <a href ={present.url} target='_blank' rel='noreferrer'>enlace</a></span>
					<button onClick={() => handleDelete(present.id)} className='delete-button'>Eliminar</button>
				</div>
			))}

			<button onClick={() => navigate('/presents/new')}>Nuevo regalo</button>
		</div>
	)
}

export default PresentList

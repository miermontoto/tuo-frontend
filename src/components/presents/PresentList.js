import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryApi } from '../../helpers/Api';


const PresentList = () => {
	const email = new URLSearchParams(window.location.search).get('email')

	const navigate = useNavigate()
	const [presentList, setPresentList] = useState([])

	useEffect(() => {
		const getPresents = async () => {
			if (!localStorage.getItem('token')) navigate('/login')
			const target = email ? `presents?userEmail=${email}` : 'presents'
			const presents = await queryApi('GET', target)
			if (!presents?.data) return
			setPresentList(presents.data.presents)
		}

		getPresents()
	}, [navigate, email])

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
					<div className='priceAndLink'>
						<span className='price'>{present.price}€</span>
						{present.url && (
							<div className='link'>
								<span>@ </span>
								<a href ={present.url} target='_blank' rel='noreferrer'>enlace</a>
							</div>
						)}
					</div>
					{!email && (
						<div className='actions'>
							<button onClick={() => handleDelete(present.id)} className='red'>Eliminar</button>
						</div>
					)}
				</div>
			))}

			{!email && (<button onClick={() => navigate('/presents/new')}>Nuevo regalo</button>)}
		</div>
	)
}

export default PresentList

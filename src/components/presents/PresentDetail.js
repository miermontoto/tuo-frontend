import React, { useEffect, useState } from 'react'
import { queryApi } from '../../helpers/Api'
import ProfileBadge from '../profile/ProfileBadge'

const PresentDetail = () => {
	const id = new URLSearchParams(window.location.search).get('id')

	const [present, setPresent] = useState({})
	const [canBeChosen, setCanBeChosen] = useState(false)
	const [isYours, setIsYours] = useState(false)

	useEffect(() => {
		const getPresent = async () => {
			const present = await queryApi('GET', `presents/${id}`)
			console.log(present)
			if (!present?.data) return
			setPresent(present.data.present)
			const yours = present.data.userId === JSON.parse(localStorage.getItem('user')).id
			setIsYours(yours)
			setCanBeChosen(present.data.chosenBy == null && !yours)
		}

		getPresent()
	}, [id])

	if (!id) return null

	return (
		<div id='present-detail'>
			<h2>Detalles del regalo</h2>
			<div className='box'>
				<div><b>Nombre:</b> {present.name}</div>
				{present.description && <div><b>Descripción:</b> {present.description}</div>}
				<div><b>Precio:</b> {present.price}€</div>
				{present.url && (
					<div className='link'>
						<span><b>Enlace:</b> </span>
						<a href={present.url} target='_blank' rel='noreferrer'> {present.url}</a>
					</div>
				)}
			</div>

			<div>
				{canBeChosen && <button>Elegir</button>}
				{isYours && <button>Editar</button>}
				{isYours && <button>Eliminar</button>}
			</div>
			<hr />
			<div id='present-creator'>
				<h3>Propietario del regalo</h3>
				<ProfileBadge iEmail={present.email} />
			</div>
		</div>
	)
}

export default PresentDetail

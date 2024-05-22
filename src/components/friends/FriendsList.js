import { useState, useEffect } from 'react'
import { queryApi } from '../../helpers/Api'
import { useNavigate } from 'react-router-dom';

const FriendsList = () => {
	const navigate = useNavigate()
	const [friendsList, setFriendsList] = useState([])

	const handleDelete = async (email) => {
		await queryApi('DELETE', `friends/${email}`)
		setFriendsList(friendsList.filter(friend => friend.email !== email))
	}

	useEffect(() => {
		const getFriends = async () => {
			if (!localStorage.getItem('token')) navigate('/login')
			const friends = await queryApi('GET', 'friends')
			setFriendsList(friends.data.friends)
		}

		getFriends()
	}, [navigate])

	return (
		<div id='friends-list'>
			<h2>Amigos</h2>
			{friendsList.map(friend => (
				<div key={friend.id} className='friend'>
					<h3>{friend.name}</h3>
					<p>{friend.email}</p>
					<button onClick={() => handleDelete(friend.email)} className='delete-button'>Eliminar</button>
				</div>
			))}

			<button onClick={() => navigate('/friends/new')}>Nuevo amigo</button>
		</div>
	)
}

export default FriendsList

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryApi } from '../../helpers/Api';

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
			const friends = await queryApi('GET', 'friends?with=friendship')
			if (!friends?.data) return
			setFriendsList(friends.data.friends)
		}

		getFriends()
	}, [navigate])

	return (
		<div id='friends-list'>
			<h2>Amigos</h2>
			{friendsList.map(friend => (
				<div key={friend.id} className='friend'>
					<h3 onClick={() => navigate(`/profile?email=${friend.email}`)}>{friend.name}</h3>
					<p>{friend.email}</p>
					<div className='actions'>
						{friend.friendship ? (<button onClick={() => navigate(`/presents?email=${friend.email}`)} className='edit-button blue'>Regalos</button>) : (<></>)}
						<button onClick={() => handleDelete(friend.email)} className='red'>Eliminar</button>
					</div>
				</div>
			))}

			<button onClick={() => navigate('/friends/new')}>Nuevo amigo</button>
		</div>
	)
}

export default FriendsList

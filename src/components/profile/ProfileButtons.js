import React, { useEffect, useState } from 'react'
import { queryApi } from '../../helpers/Api'
import { useNavigate } from 'react-router-dom'

const ProfileButtons = () => {
	const email = new URLSearchParams(window.location.search).get('email') ?? JSON.parse(localStorage.getItem('user')).email
	const isMe = email === JSON.parse(localStorage.getItem('user')).email

	const [myFriend, setMyFriend] = useState(isMe)
	const [hisFriend, setHisFriend] = useState(isMe)

	useEffect(() => {
		const checkFriendship = async () => {
			const myFriend = await queryApi('GET', 'friends?with=friendship')
			setMyFriend(myFriend.data?.friends.some(friend => friend.email === email))
			if (!myFriend) return
			setHisFriend(myFriend.data.friends.some(friend => (friend.email === email && friend.friendship === 1)))
		}

		if (!isMe) checkFriendship()
	}, [email, isMe])

	const navigate = useNavigate()
	if (isMe) return null

	return (
		<div id='profile-buttons'>
			{hisFriend ?
				<button onClick={() => navigate(`/presents?email=${email}`)} className='blue'>Ver regalos</button> :
				<p className='note'>Este usuario no te ha añadido a su lista de amigos, por lo que no puedes ver sus regalos.</p>
			}
			{myFriend ?
				<button onClick={() => navigate(`/friends?email=${email}`)} className='red'>Eliminar amigo</button> :
				<button onClick={() => navigate(`/friends/new?email=${email}`)}>Añadir amigo</button>
			}
		</div>
	)
}

export default ProfileButtons

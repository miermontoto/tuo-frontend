import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queryApi } from '../../helpers/Api';
import ProfileBadge from "./ProfileBadge";
import ProfileButtons from "./ProfileButtons";

const Profile = () => {
	const navigate = useNavigate()

	const email = new URLSearchParams(window.location.search).get('email') ?? JSON.parse(localStorage.getItem('user')).email
	const isMe = email === JSON.parse(localStorage.getItem('user')).email

	const [myFriend, setMyFriend] = useState(isMe)
	const [hisFriend, setHisFriend] = useState(isMe)

	useEffect(() => {
		const checkFriendship = async () => {
			const myFriend = await queryApi('GET', 'friends')
			setMyFriend(myFriend.data?.friends.some(friend => friend.email === email))
			if (!myFriend) return

			const result = await queryApi('GET', 'friends?userEmail=' + email)
			setHisFriend(result.status)
		}

		if (!isMe) checkFriendship()
	}, [email, isMe])


	return (
		<div id='profile'>
			<h2>Perfil</h2>
			<ProfileBadge />
			<ProfileButtons isMe={isMe} myFriend={myFriend} hisFriend={hisFriend} email={email} />
		</div>
	)
}

export default Profile

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryApi } from '../../helpers/Api';

const ProfileBadge = ({ iEmail }) => {
	ProfileBadge.defaultProps = {
		iEmail: ''
	}

	const navigate = useNavigate()
	const [profile, setProfile] = useState({})

	const email = new URLSearchParams(window.location.search).get('email') || iEmail

	useEffect(() => {
		const getProfile = async () => {
			if (!localStorage.getItem('token') && !email) navigate('/login')
			const target = email ? `users?userEmail=${email}` : 'users'
			const profile = await queryApi('GET', target)
			if (!profile?.data) return
			setProfile(profile.data)
		}

		getProfile()
	}, [navigate, email])

	return (
		<div id='profile-badge'>
			<div id='user-info' className='box'>
				<h3 onClick={() => {navigate(`/profile?email=${profile.email}`)}}>{profile.name}</h3>
				<p><b>Correo: </b>{profile.email}</p>
				<p><b>Rol: </b>{profile.role}</p>
			</div>
			<div id='present-info' className='box'>
				<p><b>Regalos: </b>{profile.presents}</p>
				<p><b>Amigos: </b>{profile.friends}</p>
			</div>
		</div>
	)
}

export default ProfileBadge

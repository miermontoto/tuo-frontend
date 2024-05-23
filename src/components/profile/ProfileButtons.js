import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileButtons = ({ isMe, myFriend, hisFriend, email }) => {
	ProfileButtons.propTypes = {
		isMe: PropTypes.bool.isRequired,
		myFriend: PropTypes.bool.isRequired,
		hisFriend: PropTypes.bool.isRequired,
		email: PropTypes.string.isRequired
	}

	const navigate = useNavigate()
	if (isMe) return null

	return (
		<div id='profile-buttons'>
			{hisFriend ?
				<button onClick={() => navigate(`/presents?email=${email}`)}>Ver regalos</button> :
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

const API_URL = process.env.APP_URL || 'http://localhost'
const API_PORT = process.env.APP_PORT || 3000
const apiRoute = `${API_URL}:${API_PORT}`
export const queryApi = async (method, endpoint, content = {}) => {
	let url = `${apiRoute}/${endpoint}`

	let params = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
		},
	}

	if (Object.keys(content).length > 0) {
		params.body = JSON.stringify(content)
	}

	try {
		let response = await fetch(url, params);
		if (!response.ok) throw new Error('Error en la petición')
		return await response.json()
	} catch (error) {
		console.log(error)
	}
}

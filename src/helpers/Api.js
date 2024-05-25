const API_URL = process.env.API_URL || 'http://localhost'
const API_PORT = process.env.API_PORT || 3001
const apiRoute = `${API_URL}:${API_PORT}`
export const queryApi = async (method, endpoint, content = {}) => {
	let url = `${apiRoute}/${endpoint}`

	let params = {
		method: method,
		headers: { 'Content-Type': 'application/json' }
	}

	if (localStorage.getItem('token')) {
		params.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
	}

	if (Object.keys(content).length > 0) {
		params.body = JSON.stringify(content)
	}

	try {
		let response = await fetch(url, params);
		if (!response.ok) throw new Error(response)
		return await response.json()
	} catch (error) {
		return error
	}
}

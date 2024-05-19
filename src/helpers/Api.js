const API_URL = process.env.APP_URL || 'http://localhost'
const API_PORT = process.env.APP_PORT || 3000
const apiRoute = `${API_URL}:${API_PORT}`
export const queryApi = async (method, endpoint, content = {}) => {
	const url = `${apiRoute}/${endpoint}`

	try {
		let response = await fetch(url, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(content),
		});

		if (!response.ok) {
			throw new Error('Error en la petición')
		}

		return await response.json()
	} catch (error) {
		console.log(error)
	}
}

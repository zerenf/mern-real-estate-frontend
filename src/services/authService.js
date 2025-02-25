import axios from "axios"

const VITE_LOCALHOST = import.meta.env.VITE_LOCALHOST
const API_URL = `${VITE_LOCALHOST}/api/auth`

// Login
export const login = async (email, password) => {
	try {
		const res = await axios.post(`${API_URL}/login`, { email, password })

		return res.data
	} catch (error) {
		throw error.response?.data || "Login request failed!"
	}
}

// Register
export const register = async (name, email, password) => {
	try {
		const res = await axios.post(`${API_URL}/register`, { name, email, password })
		return res.data
	} catch (error) {
		throw error.response?.data || "Register request failed"
	}
}

// Get Profile
export const getProfile = async (token) => {
	try {
		const res = await axios.get(`${API_URL}/profile`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		return res.data
	} catch (error) {
		throw error.response?.data || "Profile request failed"
	}
}

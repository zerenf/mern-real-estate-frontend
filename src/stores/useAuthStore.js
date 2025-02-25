import { create } from "zustand"
import { login, register, getProfile } from "../services/authService"

const useAuthStore = create((set) => ({
	user: null,
	userInfo: null,
	loading: true,
	error: null,

	// Login
	login: async (email, password) => {
		set({ loading: true, error: null })
		try {
			const data = await login(email, password)
			localStorage.setItem("token", data.token)
			set({ user: data.user, userInfo: data.user, loading: false })
		} catch (error) {
			console.error("Login error:", error)
			set({ error: error.message, loading: false })
		}
	},

	// Register
	register: async (name, email, password) => {
		set({ loading: true, error: null })

		try {
			const data = await register(name, email, password)
			console.log("data:", data.user)
			localStorage.setItem("token", data.token)
			set({ user: data.user, userInfo: data.user, loading: false })
		} catch (error) {
			console.error("Register error:", error)
			set({ loading: false, error: error.message })
		}
	},

	// Logout
	logout: () => {
		set({ loading: true })
		localStorage.removeItem("token")
		set({ user: null, loading: false })
	},

	// Check Auth
	checkAuth: async () => {
		set({ loading: true })

		const token = localStorage.getItem("token")
		if (token) {
			try {
				const userData = await getProfile(token)
				set({ user: userData, userInfo: userData.user, loading: false })
			} catch (error) {
				console.error("Auth check failed:", error)
				localStorage.removeItem("token")
				set({ user: null, loading: false, error: error.message })
			}
		} else {
			set({ loading: false })
		}
	},
}))

export default useAuthStore

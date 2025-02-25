import axios from "axios"

const VITE_LOCALHOST = import.meta.env.VITE_LOCALHOST

const API_URL = `${VITE_LOCALHOST}/api/estates`

// Get Estates
export const getEstates = async (filterParams) => {
	const queryParams = new URLSearchParams()

	if (filterParams.status) queryParams.append("status", filterParams.status)
	if (filterParams.type) queryParams.append("type", filterParams.type)
	if (filterParams.rooms) queryParams.append("rooms", filterParams.rooms)
	if (filterParams.location) queryParams.append("location", filterParams.location)
	if (filterParams.minPrice) queryParams.append("minPrice", filterParams.minPrice)
	if (filterParams.maxPrice) queryParams.append("maxPrice", filterParams.maxPrice)

	if (
		!filterParams.status &&
		!filterParams.type &&
		!filterParams.rooms &&
		!filterParams.location &&
		!filterParams.minPrice &&
		!filterParams.maxPrice
	) {
		queryParams.append("limit", "10")
	}

	const response = await axios.get(`${API_URL}?${queryParams.toString()}`)
	return response.data
}

// Get Single Estate
export const getSingleEstate = async (id) => {
	const response = await axios.get(`${API_URL}/estate/${id}`)
	return response.data
}

// Create Estates
export const createEstate = async (formData) => {
	const response = await axios.post(`${API_URL}/create-estate`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})
	return response.data
}

// Update Estate
export const updateEstate = async (id, formData) => {
	const response = await axios.put(`${API_URL}/update-estate/${id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})
	return response.data
}

// Remove Estate
export const removeEstate = async (id) => {
	const response = await axios.delete(`${API_URL}/delete-estate/${id}`)
	return response.data
}

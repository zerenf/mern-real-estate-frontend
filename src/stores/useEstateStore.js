import { create } from "zustand"
import { getEstates, getSingleEstate, removeEstate, createEstate, updateEstate } from "../services/estateService"

const useEstateStore = create((set, get) => ({
	estates: [],
	singleEstate: null,
	loading: false,
	error: null,
	filterParams: {
		status: "",
		type: "",
		rooms: "",
		location: "",
		minPrice: "",
		maxPrice: "",
	},

	// Fetch Estates
	fetchEstates: async () => {
		set({ loading: true })
		try {
			const data = await getEstates(get().filterParams)
			set({ estates: data.data, loading: false })
		} catch (error) {
			set({ error: error.message, loading: false })
		}
	},

	// Filter Params
	setFilterParams: (newFilterParams) => {
		set({ filterParams: { ...get().filterParams, ...newFilterParams } })
	},

	// Reset Filter Params
	resetFilterParams: () => {
		set({
			filterParams: {
				status: "",
				type: "",
				rooms: "",
				location: "",
				minPrice: "",
				maxPrice: "",
			},
		})
	},

	// Fetch Single Estate
	fetchSingleEstate: async (id) => {
		set({ loading: true })
		try {
			const data = await getSingleEstate(id)
			set({ singleEstate: data.data, loading: false })
		} catch (error) {
			set({ error: error.message, loading: false })
		}
	},

	// Create Estate
	createEstate: async (formData) => {
		set({ loading: true })
		try {
			const data = await createEstate(formData)
			set((state) => ({
				estates: [...state.estates, data.data],
				loading: false,
			}))
			return data
		} catch (error) {
			set({ error: error.message, loading: false })
			throw error
		}
	},

	// Update Estate
	updateEstate: async (id, formData) => {
		set({ loading: true })
		try {
			const data = await updateEstate(id, formData)
			set((state) => ({
				estates: state.estates.map((estate) => (estate._id === id ? data.data : estate)),
				loading: false,
			}))
			return data
		} catch (error) {
			set({ error: error.message, loading: false })
			throw error
		}
	},

	// Delete Estate
	deleteEstate: async (id) => {
		set({ loading: true })
		try {
			await removeEstate(id)
			set((state) => ({
				estates: state.estates.filter((estate) => estate._id !== id),
				loading: false,
			}))
		} catch (error) {
			console.error("Error deleting estate:", error)
			set({ error: error.message, loading: false })
		}
	},
}))

export default useEstateStore

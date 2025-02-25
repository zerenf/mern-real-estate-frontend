import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { showSuccessToast } from "../utils/toast"
import { useEstate } from "../hooks/useEstate"

const CreateEstate = () => {
	const navigate = useNavigate()

	const location = useLocation()

	const { createEstate } = useEstate()

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		price: "",
		type: "",
		status: "",
		location: "",
		size: "",
		rooms: "",
		images: [],
		selectedImageIndex: 0,
		removeOldImages: false,
	})

	const handleChange = (e) => {
		const { name, value, files } = e.target

		if (name === "images") {
			setFormData({
				...formData,
				images: Array.from(files),
			})
		} else {
			setFormData({
				...formData,
				[name]: value,
			})
		}
	}

	const handleSelectImageIndex = (index) => {
		setFormData({
			...formData,
			selectedImageIndex: index,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formDataToSend = new FormData()
		formDataToSend.append("title", formData.title)
		formDataToSend.append("description", formData.description)
		formDataToSend.append("price", formData.price)
		formDataToSend.append("type", formData.type)
		formDataToSend.append("status", formData.status)
		formDataToSend.append("location", formData.location)
		formDataToSend.append("size", formData.size)
		formDataToSend.append("rooms", formData.rooms)
		formDataToSend.append("selectedImageIndex", formData.selectedImageIndex)
		formDataToSend.append("removeOldImages", formData.removeOldImages)

		formData.images.forEach((image) => {
			formDataToSend.append("images", image)
		})

		try {
			await createEstate(formDataToSend)

			setFormData({
				title: "",
				description: "",
				price: "",
				type: "",
				status: "",
				location: "",
				size: "",
				rooms: "",
				images: [],
				selectedImageIndex: 0,
				removeOldImages: false,
			})

			navigate(location.state?.from || "/")
			showSuccessToast("Emlak başarıyla eklendi!")
		} catch (error) {
			console.error("Error adding estate:", error)
			alert("Bir hata oluştu. Lütfen tekrar deneyin.")
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 p-2">
			<div className="md:mx-0">
				<div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-xl">
					<h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Emlak Ekle</h2>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Başlık */}
							<div>
								<label className="block text-sm font-medium text-gray-700">Başlık</label>
								<input
									type="text"
									name="title"
									value={formData.title}
									onChange={handleChange}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent focus:ring-1 focus:outline-none"
									required
									autoComplete="off"
								/>
							</div>

							{/* Fiyat */}
							<div>
								<label className="block text-sm font-medium text-gray-700">Fiyat</label>
								<input
									type="number"
									name="price"
									value={formData.price}
									onChange={handleChange}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-smfocus:border-accent focus:ring-accent focus:ring-1 focus:outline-none"
									required
									autoComplete="off"
								/>
							</div>

							{/* Tür */}
							<div>
								<label className="block text-sm font-medium text-gray-700">Tür</label>
								<select
									name="type"
									value={formData.type}
									onChange={handleChange}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent focus:ring-1 focus:outline-none"
									required
								>
									<option value="">Tür Seçin</option>
									<option value="Daire">Daire</option>
									<option value="Villa">Villa</option>
									<option value="Ofis">Ofis</option>
								</select>
							</div>

							{/* Durum */}
							<div>
								<label className="block text-sm font-medium text-gray-700">Durum</label>
								<select
									name="status"
									value={formData.status}
									onChange={handleChange}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent focus:ring-1 focus:outline-none"
									required
								>
									<option value="">Durum Seçin</option>
									<option value="Satılık">Satılık</option>
									<option value="Kiralık">Kiralık</option>
								</select>
							</div>

							{/* Konum */}
							<div>
								<label className="block text-sm font-medium text-gray-700">Konum</label>
								<input
									type="text"
									name="location"
									value={formData.location}
									onChange={handleChange}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent focus:ring-1 focus:outline-none"
									required
									autoComplete="off"
								/>
							</div>

							{/* Boyut */}
							<div>
								<label className="block text-sm font-medium text-gray-700">Boyut (m²)</label>
								<input
									type="number"
									name="size"
									value={formData.size}
									onChange={handleChange}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent focus:ring-1 focus:outline-none"
									required
									autoComplete="off"
								/>
							</div>

							{/* Oda Sayısı */}
							<div>
								<label className="block text-sm font-medium text-gray-700">Oda Sayısı</label>
								<input
									type="number"
									name="rooms"
									value={formData.rooms}
									onChange={handleChange}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent focus:ring-1 focus:outline-none"
									required
									autoComplete="off"
								/>
							</div>
						</div>

						{/* Açıklama */}
						<div>
							<label className="block text-sm font-medium text-gray-700">Açıklama</label>
							<textarea
								name="description"
								value={formData.description}
								onChange={handleChange}
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent focus:ring-1 focus:outline-none"
								rows="4"
								required
								autoComplete="off"
							/>
						</div>

						{/* Resimler */}
						<div>
							<label className="block text-sm font-medium text-gray-700">Resimler</label>
							<input
								type="file"
								name="images"
								multiple
								onChange={handleChange}
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent focus:ring-1 focus:outline-none"
							/>
						</div>

						{/* Seçilen Resimler */}
						<div>
							<label className="block text-sm font-medium text-gray-700">Seçilen Resimler</label>
							{formData.images.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-2">
									{formData.images.map((image, index) => (
										<img
											key={index}
											src={URL.createObjectURL(image)}
											alt={`img-${index}`}
											className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
												index === formData.selectedImageIndex ? "border-2 border-indigo-500" : ""
											}`}
											onClick={() => handleSelectImageIndex(index)}
										/>
									))}
								</div>
							)}
						</div>

						{/* Gönder Butonu */}
						<div className="text-center">
							<button
								type="submit"
								className="w-full md:w-1/4 bg-accent hover:bg-accentHover text-white px-6 py-3 rounded-lg transition-colors duration-300"
							>
								Ekle
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CreateEstate

import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEstate } from "../hooks/useEstate"
import { showSuccessToast } from "../utils/toast"
import Loader from "../components/Loader"

const VITE_LOCALHOST = import.meta.env.VITE_LOCALHOST

const UpdateEstate = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const location = useLocation()

	// Zustand store'dan gerekli fonksiyonları ve state'i alıyoruz
	const { fetchSingleEstate, updateEstate, singleEstate, loading } = useEstate()

	// Form verilerini tutmak için state oluşturuyoruz
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		price: "",
		type: "",
		status: "",
		location: "",
		size: "",
		rooms: "",
		images: [], // images array olacak
		selectedImageIndex: null, // seçilen resmi tutacak
		removeOldImages: false,
	})

	// Emlak verilerini alalım
	useEffect(() => {
		// Zustand store'daki fetchSingleEstate fonksiyonunu çağırıyoruz
		fetchSingleEstate(id)
	}, [id, fetchSingleEstate])

	// singleEstate değiştiğinde formData'yı güncelle
	useEffect(() => {
		if (singleEstate) {
			setFormData({
				title: singleEstate.title,
				description: singleEstate.description,
				price: singleEstate.price,
				type: singleEstate.type,
				status: singleEstate.status,
				location: singleEstate.location,
				size: singleEstate.size,
				rooms: singleEstate.rooms,
				images: singleEstate.images || [],
				selectedImageIndex: singleEstate.selectedImageIndex,
				removeOldImages: singleEstate.removeOldImages,
			})
		}
	}, [singleEstate])

	const handleChange = (e) => {
		const { name, value, files } = e.target

		if (name === "images") {
			// Eski resimler (backend'den gelenler) korunacak
			setFormData({
				...formData,
				images: [...formData.images, ...Array.from(files)], // Burada yalnızca yeni resimleri tutuyoruz
			})
		} else {
			// Diğer form elemanlarını güncelliyoruz
			setFormData({
				...formData,
				[name]: value,
			})
		}
	}

	const clear = () => {
		setFormData({
			...formData,
			removeOldImages: true,
			selectedImageIndex: 0,
			images: formData.images.filter((img) => img instanceof File), // Sadece yeni eklenen dosyaları bırak
		})
	}

	// Seçilen resmi güncelleme
	const handleSelectImageIndex = (index) => {
		setFormData({
			...formData,
			selectedImageIndex: index,
		})
	}

	// Form gönderildiğinde çalışacak handler
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
		formDataToSend.append("removeOldImages", formData.removeOldImages)

		// Sadece yeni seçilen resimleri formData'ya ekliyoruz
		formData.images?.forEach((image) => {
			formDataToSend.append("images", image)
		})

		// Seçilen resim için de ayrı bir alan ekliyoruz
		formDataToSend.append("selectedImageIndex", formData.selectedImageIndex)

		try {
			// Zustand store'daki updateEstate fonksiyonunu çağırıyoruz
			await updateEstate(id, formDataToSend)

			// Formu sıfırlıyoruz
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
				selectedImageIndex: null,
				removeOldImages: false,
			})

			navigate(location.state?.from || "/")

			showSuccessToast("Emlak başarıyla güncellendi!")
		} catch (error) {
			console.error("Error updating estate:", error)
			alert("Bir hata oluştu. Lütfen tekrar deneyin!")
		}
	}

	if (loading) return <Loader />

	return (
		<div className="min-h-screen bg-gray-50 py-10">
			<div className="md:mx-0 mx-2">
				<div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-xl">
					<h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Emlak Güncelle</h2>
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
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent focus:ring-1 focus:outline-none"
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

						{/* Mevcut Resimler */}
						<div>
							{formData.images.length > 0 && (
								<button
									type="button"
									onClick={clear}
									className="w-full md:w-1/4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 mb-4"
								>
									Eski Resimleri Sil
								</button>
							)}

							<label className="block text-sm font-medium text-gray-700">Mevcut Resimler</label>
							{formData.images.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-2">
									{formData.images.map((image, index) => (
										<img
											key={index}
											src={
												image instanceof File
													? URL.createObjectURL(image) // Eğer resim yeni seçilmişse, dosya nesnesinden URL oluşturuyoruz
													: `${VITE_LOCALHOST}/uploads/${image}` // Eski resimleri sunucudan alıyoruz
											}
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
								Güncelle
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default UpdateEstate

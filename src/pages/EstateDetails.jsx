import { useParams } from "react-router-dom"
import { useEstate } from "../hooks/useEstate"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import { HiCurrencyDollar } from "react-icons/hi2"
import { BsBookmarkStarFill } from "react-icons/bs"
import { FaLocationDot } from "react-icons/fa6"
import { FaRulerCombined, FaBed, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa"

const VITE_LOCALHOST = import.meta.env.VITE_LOCALHOST

const EstateDetails = () => {
	const { id } = useParams()

	const { fetchSingleEstate, singleEstate, loading } = useEstate()

	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [openLightbox, setOpenLightbox] = useState(false)

	useEffect(() => {
		fetchSingleEstate(id)
	}, [id, fetchSingleEstate])

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % singleEstate.images.length)
	}

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + singleEstate.images.length) % singleEstate.images.length)
	}

	return (
		<div className="container mx-auto">
			{loading ? (
				<div className="flex items-center justify-center min-h-screen">
					<Loader />
				</div>
			) : singleEstate ? (
				<div className="flex md:flex-row flex-col justify-center gap-10 my-10">
					{/* Emlak Görseli */}
					<div className="mx-5">
						{/* Ana resim */}
						<div className="w-full h-60 md:h-96 sm:h-72 cursor-pointer" onClick={() => setOpenLightbox(true)}>
							<img
								src={`${VITE_LOCALHOST}/uploads/${singleEstate?.images[currentImageIndex]}`}
								alt="Main"
								className="w-full h-full object-cover rounded-lg"
							/>
						</div>

						{/* Thumbnail Resimler */}
						<div className="flex gap-2 mt-4 flex-wrap">
							{singleEstate.images.map((image, index) => (
								<img
									key={index}
									src={`${VITE_LOCALHOST}/uploads/${image}`}
									alt={`Thumbnail ${index}`}
									className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
										currentImageIndex === index ? "border-blue-500" : "border-transparent"
									}`}
									onClick={() => setCurrentImageIndex(index)}
								/>
							))}
						</div>
					</div>

					{/* Lightbox */}
					{openLightbox && (
						<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center">
							<button className="absolute top-10 right-10 text-white text-2xl" onClick={() => setOpenLightbox(false)}>
								<FaTimes />
							</button>

							<button className="absolute left-5 text-white text-3xl" onClick={prevImage}>
								<FaChevronLeft />
							</button>

							<img
								src={`${VITE_LOCALHOST}/uploads/${singleEstate.images[currentImageIndex]}`}
								alt="Lightbox Image"
								className="max-w-full max-h-full object-contain"
							/>

							<button className="absolute right-5 text-white text-3xl" onClick={nextImage}>
								<FaChevronRight />
							</button>
						</div>
					)}

					{/* Emlak Bilgileri */}
					<div className="p-4">
						<h1 className="text-2xl font-bold mb-4">{singleEstate.title}</h1>
						<p className="flex items-center text-gray-600 mb-2">
							<FaLocationDot className="text-gray-500 mr-2" />
							<strong className="mr-1">Konum: </strong> {singleEstate.location || "Bilinmiyor"}
						</p>
						<p className="flex items-center text-gray-600 mb-2">
							<HiCurrencyDollar className="text-gray-500 mr-2" />
							<strong className="mr-1">Fiyat: </strong> {singleEstate.price ? `${singleEstate.price.toLocaleString()} TL` : "Bilinmiyor"}
						</p>
						<p className="flex items-center text-gray-600 mb-2">
							<BsBookmarkStarFill fontSize={14} className="text-gray-500 mr-2" />
							<strong className="mr-1">Durum: </strong> {singleEstate.status || "Bilinmiyor"}
						</p>
						<p className="flex items-center text-gray-600 mb-2">
							<FaRulerCombined fontSize={14} className="text-gray-500 mr-2" />
							<strong className="mr-1">Büyüklük: </strong> {singleEstate.size ? `${singleEstate.size} m²` : "Bilinmiyor"}
						</p>
						<p className="flex items-center text-gray-600 mb-2">
							<FaBed className="text-gray-500 mr-2" />
							<strong className="mr-1">Oda Sayısı: </strong> {singleEstate.rooms || "Bilinmiyor"}
						</p>
						<p className="text-gray-700">{singleEstate.description || "Açıklama bulunmamaktadır."}</p>
					</div>
				</div>
			) : (
				<div className="text-center text-gray-500">Emlak bilgisi bulunamadı.</div>
			)}
		</div>
	)
}

export default EstateDetails

import { useState } from "react"
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa"

const images = [
	"/images/1.webp",
	"/images/2.webp",
	"/images/3.webp",
	"/images/4.webp",
	"/images/5.webp",
	"/images/6.webp",
	"/images/7.webp",
	"/images/8.webp",
	"/images/9.webp",
	"/images/10.webp",
]

const ImageGallery2 = () => {
	const [mainImage, setMainImage] = useState(images[0])

	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	const [openLightbox, setOpenLightbox] = useState(false)

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % images.length)
	}

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
	}

	return (
		<>
			<div className="flex flex-col items-center p-4">
				<div className="w-96 h-96 cursor-pointer" onClick={() => setOpenLightbox(true)}>
					<img src={mainImage} alt="Main" className="w-full h-full object-cover rounded-lg" />
				</div>

				<div className="flex gap-2 mt-4">
					{images.map((image, index) => (
						<img
							key={index}
							src={image}
							alt={`Thumbnail ${index}`}
							className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
								mainImage === image ? "border-blue-500" : "border-transparent"
							}`}
							onClick={() => {
								setMainImage(image)
								setCurrentImageIndex(index) // resimler arasın geçişi kolay yapmak için current index'i almamız gerek.
							}}
						/>
					))}
				</div>

				{openLightbox && (
					<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center">
						<button className="absolute top-10 right-10 text-white text-2xl" onClick={() => setOpenLightbox(false)}>
							<FaTimes />
						</button>

						<button className="absolute left-5 text-white text-3xl" onClick={prevImage}>
							<FaChevronLeft />
						</button>

						<img src={images[currentImageIndex]} alt="Lightbox Image" className="max-w-full max-h-full object-contain" />

						<button className="absolute right-5 text-white text-3xl" onClick={nextImage}>
							<FaChevronRight />
						</button>
					</div>
				)}
			</div>
		</>
	)
}

export default ImageGallery2

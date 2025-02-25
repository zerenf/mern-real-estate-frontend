import { FiEdit } from "react-icons/fi"
import { FaTrash } from "react-icons/fa"
import { FaEye } from "react-icons/fa"
import { BsBookmarkStarFill } from "react-icons/bs"
import { FaLocationDot } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { showSuccessToast } from "../utils/toast"
import { useAuth } from "../hooks/useAuth"
import { useEstate } from "../hooks/useEstate"

const VITE_LOCALHOST = import.meta.env.VITE_LOCALHOST

const EstateCard = ({ estate }) => {
	const { user } = useAuth()
	const { deleteEstate } = useEstate()

	const handleDelete = async (id) => {
		alert("İlanı silmek istediğinize emin misiniz?")
		await deleteEstate(id)
		showSuccessToast("Emlak başarıyla silindi.")
	}

	return (
		<div key={estate._id} className="max-w-[380px] rounded overflow-hidden shadow-lg bg-white border border-gray-200 p-3 max-sm:mx-5">
			{/* Resim */}
			<img
				src={`${VITE_LOCALHOST}/uploads/${estate.images[estate.selectedImageIndex]}`}
				alt={estate.title}
				className="w-[380px] h-56 sm:h-48 "
			/>
			{/* Detaylar */}
			<div className="p-4">
				<h2 className="text-xl font-semibold text-gray-800 mb-2">{estate.title}</h2>
				<p className="text-base text-blue-600 font-medium mb-2">Fiyat: {estate.price.toLocaleString()} TL</p>
				<p className="flex items-center text-sm text-gray-600">
					<FaLocationDot className="text-gray-500 mr-1" fontSize={16} />
					Konum: {estate.location}
				</p>
				<p className="flex items-center text-sm text-gray-600 mb-2">
					<BsBookmarkStarFill className="text-gray-500 mr-1" fontSize={14} />
					Durum: {estate.status}
				</p>
				<p className="text-sm text-gray-700">{estate.description.slice(0, 30) + "..."}</p>
			</div>
			{/* Düzenle Butonu */}
			<div className="w-full flex justify-end">
				{user ? (
					<>
						<Link className=" bg-blue-600 text-white p-2 sm:p-3 m-1 rounded-md hover:bg-blue-700" to={`/estate-details/${estate._id}`}>
							<FaEye />
						</Link>
						<Link className=" bg-green-600 text-white p-2 sm:p-3 m-1 rounded-md hover:bg-green-700" to={`/update-estate/${estate._id}`}>
							<FiEdit />
						</Link>
						<Link onClick={() => handleDelete(estate._id)} className="bg-red-600 text-white p-2 sm:p-3 m-1 rounded-md hover:bg-red-700">
							<FaTrash />
						</Link>
					</>
				) : (
					<Link className=" bg-blue-600 text-white p-2 sm:p-3 m-1 rounded-md hover:bg-blue-700" to={`/estate-details/${estate._id}`}>
						<FaEye />
					</Link>
				)}
			</div>
		</div>
	)
}

export default EstateCard

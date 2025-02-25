import { useEffect } from "react"
import { useEstate } from "../hooks/useEstate"
import { FiEdit } from "react-icons/fi" // İkonları ekledik
import { Link, useLocation } from "react-router-dom"
import { FaEye, FaTrash } from "react-icons/fa"
import { showSuccessToast } from "../utils/toast"
import styles from "./EstateList.module.css" // CSS Module dosyasını import et
import Loader from "../components/Loader"

const VITE_LOCALHOST = import.meta.env.VITE_LOCALHOST

const EstateList = () => {
	const { fetchEstates, loading, estates, deleteEstate } = useEstate()
	const location = useLocation()

	useEffect(() => {
		fetchEstates()
	}, [fetchEstates])

	const handleDelete = async (id) => {
		alert("İlanı silmek istediğinize emin misiniz?")
		await deleteEstate(id)
		showSuccessToast("Emlak başarıyla silindi.")
	}

	if (loading) return <Loader />

	return (
		<div className={styles.container}>
			<h2>Estate List</h2>
			<div className={styles.header}>
				<span className={styles.headerText}>Resim</span>
				<span className={styles.headerText}>Başlık</span>
				<span className={styles.headerText}>Fiyat</span>
				<span className={styles.headerText}>Durum</span>
				<span className={`${styles.headerText} ${styles.actionsHeader}`}>İşlem</span>
			</div>
			<div className={styles.list}>
				{estates.map((estate) => (
					<div key={estate._id} className={styles.row}>
						<span className={styles.cell}>
							{estate.images.length > 0 && (
								<img
									src={`${VITE_LOCALHOST}/uploads/${estate.images[estate.selectedImageIndex]}`}
									alt={estate.title}
									className={styles.image}
								/>
							)}
						</span>
						<span className={styles.cell}>{estate.title}</span>
						<span className={styles.cell}>{estate.price} ₺</span>
						<span className={styles.cell}>{estate.status}</span>
						<span className={`${styles.cell} ${styles.actions}`}>
							<Link
								className={`link bg-blue-600 text-white p-2 sm:p-2 m-1 rounded-md hover:bg-blue-700`}
								to={`/estate-details/${estate._id}`}
							>
								<FaEye />
							</Link>
							<Link
								className={`link bg-green-600 text-white p-2 sm:p-2 m-1 rounded-md hover:bg-green-700`}
								to={`/update-estate/${estate._id}`}
								state={{ from: location.pathname }}
							>
								<FiEdit />
							</Link>
							<Link
								onClick={() => handleDelete(estate._id)}
								className={`link bg-red-600 text-white p-2 sm:p-2 m-1 rounded-md hover:bg-red-700`}
							>
								<FaTrash />
							</Link>
						</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default EstateList

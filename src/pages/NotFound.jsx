import { HiHome } from "react-icons/hi2"
import { Link } from "react-router-dom"

const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
			<h1 className="text-6xl font-bold mb-4">404</h1>
			<p className="text-xl mb-6">Üzgünüz, aradığınız sayfa bulunamadı :(</p>
			<Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 flex justify-between items-center">
				<HiHome fontSize={24} className="text-slate-100 mr-2" /> Ana Sayfaya Dön
			</Link>
		</div>
	)
}

export default NotFound

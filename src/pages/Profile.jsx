import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { Link } from "react-router-dom"

const Profile = () => {
	const { userInfo, logout } = useAuth()

	const [isImageLoaded, setIsImageLoaded] = useState(false)

	const handleImageLoad = () => {
		setIsImageLoaded(true)
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-lg p-6 w-[280px] md:w-96 text-center">
				<h1 className="text-2xl font-bold text-gray-700">Hoşgeldiniz!</h1>
				{userInfo ? (
					<div className="mt-4">
						{!isImageLoaded && (
							<div className="flex justify-center items-center w-32 h-32 mx-auto border rounded-full">
								<div className="animate-spin border-t-4 border-blue-500 border-solid w-8 h-8 rounded-full"></div>
							</div>
						)}
						<img
							src={
								userInfo?.email === "seher@gmail.com"
									? "/images/sehos.jpg"
									: userInfo?.email === "firat@gmail.com"
									? "/images/ben.jpg"
									: "/images/person.png"
							}
							className={`w-32 h-32 rounded-full mx-auto border object-cover ${!isImageLoaded ? "hidden" : "block"}`}
							onLoad={handleImageLoad} // Yüklenme tamamlandığında isImageLoaded state'ini güncelle
						/>
						<h2 className="mt-2 text-lg font-semibold text-gray-800">{userInfo.name || "Kullanıcı"}</h2>
						<p className="text-gray-600">{userInfo.email}</p>
						<button className="mt-4 bg-blue-500 text-white px-4 py-2 mx-2 rounded hover:bg-blue-600">
							<Link to={"/"}>Anasayfa</Link>
						</button>
						<button className="mt-4 bg-red-600 text-white px-4 py-2 mx-2 rounded hover:bg-red-700" onClick={logout}>
							Çıkış Yap
						</button>
					</div>
				) : (
					<p className="text-gray-600 mt-4">Lütfen giriş yapın.</p>
				)}
			</div>
		</div>
	)
}

export default Profile

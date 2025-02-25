import { Route, Routes } from "react-router-dom"
import "./App.css"
import "./index.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CreateEstate from "./pages/CreateEstate"
import UpdateEstate from "./pages/UpdateEstate"
import EstateDetails from "./pages/EstateDetails"
import ImageGallery from "./pages/ImageGallery"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import PublicRoute from "./components/PublicRoute"
import PrivateRoute from "./components/PrivateRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SidebarLayout from "./components/SidebarLayout"
import { useAuth } from "./hooks/useAuth"
import { useEffect } from "react"
import Loader from "./components/Loader"
import EstateList from "./pages/EstateList"

function App() {
	const { checkAuth, loading } = useAuth()

	useEffect(() => {
		checkAuth()
	}, [checkAuth])

	if (loading) return <Loader />

	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/login"
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<PublicRoute>
							<Register />
						</PublicRoute>
					}
				/>

				<Route path="/estate-details/:id" element={<EstateDetails />} />

				{/* Sidebar ile birlikte kullanılacak sayfalar */}
				<Route element={<SidebarLayout />}>
					<Route
						path="/estate-list"
						element={
							<PrivateRoute>
								<EstateList />
							</PrivateRoute>
						}
					/>

					<Route
						path="/profile"
						element={
							<PrivateRoute>
								<Profile />
							</PrivateRoute>
						}
					/>
					<Route
						path="/create-estate"
						element={
							<PrivateRoute>
								<CreateEstate />
							</PrivateRoute>
						}
					/>
					<Route
						path="/update-estate/:id"
						element={
							<PrivateRoute>
								<UpdateEstate />
							</PrivateRoute>
						}
					/>

					<Route
						path="/image-gallery"
						element={
							<PrivateRoute>
								<ImageGallery />
							</PrivateRoute>
						}
					/>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
			<ToastContainer />
		</>
	)
}

export default App

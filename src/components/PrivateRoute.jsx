import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import Loader from "./Loader"

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth()

	if (loading) {
		return <Loader />
	}

	return user ? children : <Navigate to="/login" /> //Kullanıcı varsa children'dan devam et yoksa login yönlendir
}

export default PrivateRoute

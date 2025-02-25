import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import Loader from "./Loader"

const PublicRoute = ({ children }) => {
	const { user, loading } = useAuth()

	if (loading) {
		return <Loader />
	}

	return !user ? children : <Navigate to="/profile" /> // Kullanıcı varsa childeren'da ne varsa ondan devam et yoksa profile yönlendir
}

export default PublicRoute

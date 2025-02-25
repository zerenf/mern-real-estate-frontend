import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import LoginForm from "../components/LoginForm/LoginForm"

const Login = () => {
	const navigate = useNavigate()

	const { login } = useAuth()

	const handleLogin = async (email, password) => {
		await login(email, password)
		navigate("/profile")
	}

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<LoginForm onLogin={handleLogin} />
			</div>
		</div>
	)
}

export default Login

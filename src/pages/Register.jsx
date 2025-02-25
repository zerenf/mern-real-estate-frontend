import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import RegisterForm from "../components/RegisterForm/RegisterForm"

const Register = () => {
	const { register } = useAuth()
	const navigate = useNavigate()

	const handleRegister = async (name, email, password) => {
		await register(name, email, password)
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
				<RegisterForm onRegister={handleRegister} />
			</div>
		</div>
	)
}

export default Register

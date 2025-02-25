import { useState } from "react"
import "./LoginForm.css"
import { useAuth } from "../../hooks/useAuth"

const LoginForm = ({ onLogin }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { error } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()

		await onLogin(email, password)
	}

	return (
		<div className="center">
			<h1>Giriş</h1>
			<form onSubmit={handleSubmit} autoComplete="off">
				<div className="txt_field">
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoComplete="off"
						name="random-email"
						placeholder=" "
					/>
					<span></span>
					<label>E-Mail</label>
				</div>
				<div className="txt_field">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="off"
						name="random-password"
						placeholder=" "
					/>
					<span></span>
					<label>Şifre</label>
				</div>
				{error && <p style={{ color: "red", margin: "10px 0" }}>{error}</p>}
				<input type="submit" value="Giriş" />
				<div className="signup_link">
					Hesabınız yok mu? <a href="/register">Kayıt Ol</a>
				</div>
			</form>
		</div>
	)
}

export default LoginForm

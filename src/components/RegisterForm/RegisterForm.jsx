import { useState } from "react"
import "./RegisterForm.css"
import { useAuth } from "../../hooks/useAuth"

const RegisterForm = ({ onRegister }) => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { error } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()

		await onRegister(name, email, password)
	}

	return (
		<div className="center">
			<h1>Kayıt Ol</h1>
			<form onSubmit={handleSubmit} autoComplete="off">
				<div className="txt_field">
					<input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" name="random-name" placeholder=" " />
					<span></span>
					<label>İsim-Soyisim</label>
				</div>
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
				<input type="submit" value="Kayıt Ol" />
				<div className="signup_link">
					Hesabınız var mı? <a href="/login">Giriş Yap</a>
				</div>
			</form>
		</div>
	)
}

export default RegisterForm

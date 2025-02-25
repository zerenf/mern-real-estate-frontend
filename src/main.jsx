import App from "./App.jsx"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<App />
		<ToastContainer />
	</BrowserRouter>
)

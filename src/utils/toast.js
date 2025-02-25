import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const showToast = (message, type) => {
	toast[type](message, {
		position: "top-right",
		autoClose: 3000,
	})
}

export const showSuccessToast = (message) => {
	showToast(message, "success")
}

export const showErrorToast = (message) => {
	showToast(message, "error")
}

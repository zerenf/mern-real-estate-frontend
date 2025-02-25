import "../assets/css/Input.css"
import { FiSearch } from "react-icons/fi"

const Input = ({ placeholder, value, onChange }) => {
	return (
		<div className="flex justify-start items-center relative w-[240px]">
			<input type="text" placeholder={placeholder} className="custom-input" value={value} onChange={onChange} />
			<FiSearch size={20} className="absolute right-1" color="#ccc" />
		</div>
	)
}

export default Input

import { FaStar } from "react-icons/fa"
import { FaSquarePlus } from "react-icons/fa6"
import { Link } from "react-router-dom"

const SectionTitle = ({ title, subtitle }) => {
	return (
		<div className="w-screen h-[160px] mb-16 bg-accent bg-opacity-10 px-6 py-6 flex justify-between items-center">
			<div>
				<div className="flex my-3">
					<FaStar className="text-[#ffa171]" />
					<FaStar className="text-[#ffa171] mx-2" />
					<FaStar className="text-[#ffa171]" />
				</div>
				<h1 className="text-lg md:text-3xl font-bold text-gray-700 "> {title} </h1>
				<h6 className="text-gray-500 text-sm md:text-lg"> {subtitle} </h6>
			</div>
			<Link to="/create-estate">
				<FaSquarePlus fontSize={38} className="text-blue-600" />
			</Link>
		</div>
	)
}

export default SectionTitle

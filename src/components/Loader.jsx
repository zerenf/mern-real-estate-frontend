import { CirclesWithBar } from "react-loader-spinner"

const Loader = () => {
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<CirclesWithBar
				height="140"
				width="140"
				color="#4fa94d"
				outerCircleColor="#388da8"
				innerCircleColor="#4fa94d"
				barColor="#4fa94d"
				ariaLabel="circles-with-bar-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</div>
	)
}

export default Loader

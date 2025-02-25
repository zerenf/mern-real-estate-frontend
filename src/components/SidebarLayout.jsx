// SidebarLayout.jsx
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

const SidebarLayout = () => {
	return (
		<div className="flex">
			{/* Sidebar sabit kalır */}
			<Sidebar />
			{/* Outlet, Sidebar dışındaki içerikleri göstermek için kullanılır */}
			<div className="flex-1 p-4 md:p-7 min-h-screen">
				<Outlet />
			</div>
		</div>
	)
}

export default SidebarLayout

import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const Sidebar = () => {
	const [open, setOpen] = useState(true)
	const { logout } = useAuth()

	const Menus = [
		{ title: "İlanlar", src: "ilanlar", path: "/estate-list" },
		{ title: "İlan Ekle", src: "3", path: "/create-estate" },
		{ title: "Anasayfa", src: "2", gap: true, path: "/" },
		{ title: "Profil ", src: "4", path: "/profile" },
	]

	const logOut = [{ title: "Çıkış", src: "5", gap: true, path: "/login" }]

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 991) {
				setOpen(false)
			} else {
				setOpen(true)
			}
		}

		handleResize()
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return (
		<div className="flex">
			<div className={`${open ? "w-72" : "w-20"} bg-accent h-full p-5 pt-8 relative duration-300`}>
				<img
					src="/images/control.png"
					className={`absolute cursor-pointer -right-3 top-9 w-7 border-accent border-2 rounded-full ${!open && "rotate-180"}`}
					onClick={() => setOpen(!open)}
				/>
				<div className="flex gap-x-4 items-center">
					<img src="/images/re.png" className={`w-[33px] cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
					<h1 className={`${!open && "hidden"} text-[18px] ml-[-20px] mb-[2px] font-semibold text-slate-50 origin-left duration-200`}>
						STATE
					</h1>
				</div>
				<ul className="pt-6">
					{Menus.map((Menu, index) => {
						return (
							<NavLink
								key={index}
								to={Menu.path}
								className={({ isActive }) =>
									`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-slate-50 text-sm items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${isActive ? "bg-light-white" : ""}`
								}
								onClick={() => setOpen(false)}
								state={{ from: location.pathname }}
							>
								<img src={`/images/iconlar/${Menu.src}.png`} className="w-[24px]" />
								<span className={`${open ? "block" : "hidden"} origin-left duration-400 whitespace-nowrap`}>{Menu.title}</span>
							</NavLink>
						)
					})}
					<NavLink
						to={logOut[0].path}
						className={({ isActive }) =>
							`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-slate-50 text-sm items-center gap-x-4 
              ${logOut[0].gap ? "mt-9" : "mt-2"} ${isActive ? "bg-light-white" : ""}`
						}
						onClick={logout}
					>
						<img src={`/images/iconlar/${logOut[0].src}.png`} className="w-[24px]" />
						<span className={`${!open && "hidden"} origin-left duration-200`}>{logOut[0].title}</span>
					</NavLink>
				</ul>
			</div>
		</div>
	)
}

export default Sidebar

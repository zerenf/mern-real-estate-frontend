import { Link } from "react-router-dom"
import { HiHome } from "react-icons/hi2"
import { useAuth } from "../hooks/useAuth"
import { MdLogin } from "react-icons/md"
// import { MdLogout } from "react-icons/md"
// import { MdPerson } from "react-icons/md"
// import { MdOutlineAddHome } from "react-icons/md"

const Navbar = () => {
	const { user } = useAuth()

	return (
		<section className="w-screen h-[90px] bg-accent  shadow-md">
			<nav className="w-full h-full flex justify-between items-center px-8 md:px-12">
				{user ? (
					<div className="flex w-full items-center justify-end">
						<div>
							<Link to="/estate-list">
								<img src="/images/iconlar/1.png" className="w-[30px]" />
							</Link>
						</div>

						{/* <div className="w-1/3">
							<Link to="/">
								<HiHome fontSize={28} className="text-slate-100" />
							</Link>
						</div>
						<div className="w-1/3">
							<Link to="/" className="flex items-center justify-center">
								<h1 className="text-3xl text-slate-100 font-bold">
									<span className="text-[#ffa171]">RE</span>STATE
								</h1>
							</Link>
						</div>
						<div className="flex items-center justify-end gap-x-8 w-1/3">
							<Link to="/create-estate">
								<MdOutlineAddHome fontSize={28} className="text-slate-100" />
							</Link>

							<Link to="/profile">
								<MdPerson fontSize={26} className="text-slate-100" />
							</Link>

							<Link onClick={logout}>
								<MdLogout fontSize={24} className="text-slate-100" />
							</Link>
						</div> */}
					</div>
				) : (
					<div className="flex w-full justify-between items-center">
						<Link to="/">
							<HiHome fontSize={38} className="text-slate-100" />
						</Link>
						<Link to="/" className="flex items-center justify-center">
							<h1 className="text-3xl text-slate-100 font-bold">
								<span className="text-[#ffa171]">RE</span>STATE
							</h1>
						</Link>
						<Link to="/login">
							<MdLogin fontSize={32} className="text-slate-100" />
						</Link>
					</div>
				)}
			</nav>
		</section>
	)
}

export default Navbar

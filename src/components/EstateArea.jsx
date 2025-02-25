import { useEffect, useState } from "react"
import { useEstate } from "../hooks/useEstate"
import EstateCard from "./EstateCard"
import Loader from "./Loader"
import Input from "./Input"

const EstateArea = () => {
	const { estates, loading, fetchEstates, setFilterParams, filterParams, resetFilterParams } = useEstate()

	const [searchTerm, setSearchTerm] = useState("")

	useEffect(() => {
		fetchEstates()
	}, [fetchEstates])

	const handleFilterChange = (e) => {
		const { name, value } = e.target // Bunları dinamik olarak kullanacağımız için destruc ederek değişken haline getiriyoruz.

		// const name = e.target.name // Bu da başka yöntem ama destruct etmek daha modern ve iyi
		// const value = e.target.value

		setFilterParams({ [name]: value })
	}

	const fetchButton = () => {
		fetchEstates() // Ara butonu basılınca tekrar verileri çek
	}

	// Filtreleri sıfırlama fonksiyonu
	const resetButton = () => {
		resetFilterParams()
		setSearchTerm("")
		fetchEstates()
	}

	// Arama işlemi
	const searchFields = ["title", "location", "status", "type"]

	const filteredEstates = estates.filter((estate) => {
		if (searchTerm === "") return true // Bu kontrol olmazsa her öğe üzerinde döngü olur ve performans düşer. (Boşsa döngü yapma hepsini yazdır)

		return searchFields.some((field) => estate[field].toLowerCase().includes(searchTerm.toLowerCase())) //some kullandık çünkü herhangi bir yerinde ilgili kelime olması yeterli.
	})

	return (
		<div className="container mx-auto min-h-[900px]">
			{loading ? (
				<div className="flex items-center justify-center min-h-screen">
					<Loader />
				</div>
			) : (
				<>
					<div className="flex justify-center items-center mb-10 flex-wrap">
						<div className="flex justify-center items-center  flex-wrap">
							<Input placeholder={"Ara: isim, tür, durum, konum..."} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
							<div className="my-3">
								<button className=" h-[40px] py-2 px-5 border ml-2 rounded-md" onClick={fetchButton}>
									Ara
								</button>
								<button className=" h-[40px] py-2 px-5 border ml-2 rounded-md" onClick={resetButton}>
									Sıfırla
								</button>
							</div>
						</div>

						{/* Filtreleme alanları */}
						<div className="filters md:flex mx-2 ">
							<div className="w-full md:w-36 flex items-center">
								<select
									name="status"
									value={filterParams.status}
									onChange={handleFilterChange}
									className="h-[40px] w-full md:w-36 m-2 py-2 px-5 rounded-md"
								>
									<option value="">Durum</option>
									<option value="Kiralık">Kiralık</option>
									<option value="Satılık">Satılık</option>
								</select>
							</div>

							<div className="w-full md:w-36 flex items-center">
								<select
									name="type"
									value={filterParams.type}
									onChange={handleFilterChange}
									className="h-[40px] w-full md:w-36 m-2 py-2 px-5 rounded-md"
								>
									<option value="">Tür</option>
									<option value="Daire">Daire</option>
									<option value="Ofis">Ofis</option>
									<option value="İş Yeri">İş Yeri</option>
									<option value="Villa">Villa</option>
									<option value="Arsa">Arsa</option>
								</select>
							</div>

							<div className="w-full md:w-36 flex items-center">
								<select
									name="rooms"
									value={filterParams.rooms}
									onChange={handleFilterChange}
									className="h-[40px] w-full md:w-36 m-2 py-2 px-5 rounded-md"
								>
									<option value="">Oda Sayısı</option>
									<option value="1+0">1+0</option>
									<option value="1+1">1+1</option>
									<option value="2+1">2+1</option>
									<option value="3+1">3+1</option>
								</select>
							</div>

							<div className="flex">
								<input
									type="number"
									name="minPrice"
									placeholder="Min Fiyat"
									value={filterParams.minPrice}
									onChange={handleFilterChange}
									className="h-[40px] w-[49%] m-2 py-2 px-5 rounded-md border"
								/>

								<input
									type="number"
									name="maxPrice"
									placeholder="Max Fiyat"
									value={filterParams.maxPrice}
									onChange={handleFilterChange}
									className="h-[40px] w-[49%] m-2 py-2 px-5 rounded-md border"
								/>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center my-5">
						{filteredEstates.length === 0 ? (
							<p>İsteğinizle eşleşen sonuç bulunamadı.</p>
						) : (
							filteredEstates.map((estate) => <EstateCard key={estate._id} estate={estate} />)
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default EstateArea

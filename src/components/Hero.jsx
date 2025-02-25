import heroImage from "/images/hero.png"

const Hero = () => {
	return (
		<>
			<section className="w-screen h-full flex justify-center items-center py-16">
				<div className="w-[65%]">
					<img src={heroImage} alt="" />
				</div>
			</section>
		</>
	)
}

export default Hero

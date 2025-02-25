import EstateArea from "./EstateArea"
import SectionTitle from "./SectionTitle"

const EstateSection = () => {
	return (
		<div className="my-16">
			<SectionTitle title={"YAŞAM ALANLARI"} subtitle={"Konfor ve şıklığı bir arada sunan yaşam alanları."} />
			<EstateArea />
		</div>
	)
}

export default EstateSection

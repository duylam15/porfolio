import '/src/stylesheets/sections/Home.css'
import SocialLinks from '/src/components/elements/SocialLinks'
import { profile } from '/src/data.js'
import Button from '../elements/Button'

const Home = () => {
	const { name, role, description } = profile

	return (
		<section className='Home section' id='home'>
			<div className='container'>
				<div className='Home-caption'>
					<span className='Home-hi'>Hi I'm</span>
					<h1 className='Home-h1'>{name}</h1>
					<h2 className='Home-h2'>{role}</h2>
					<p className='Home-description'>
						{description}
					</p>
					<SocialLinks />
					<Button text={"My CV"}/>
				</div>
			</div>
		</section>
	)
}

export default Home

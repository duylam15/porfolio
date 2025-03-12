import * as icon from 'react-icons/si'

const profile = {
	name: 'Duy Lam',
	role: 'Front End Developer',
	description: 'Tôi yêu thích tạo ra những giao diện web trực quan, mượt mà và thân thiện với người dùng.',
};

const social = [
	{ icon: icon.SiGithub, link: 'https://github.com/duylam15' },
	{ icon: icon.SiTwitter, link: 'https://www.twitter.com/' },
	{ icon: icon.SiInstagram, link: 'https://www.instagram.com/' },
];

const brand = 'Porfolio'


const work = [
	{
		name: 'Đặt vé máy bay',
		description: 'Hệ thống giúp người dùng dễ dàng tìm kiếm, đặt vé và quản lý chuyến bay một cách nhanh chóng và thuận tiện.',
		stack: [
			{ icon: icon.SiHtml5, name: 'HTML' },
			{ icon: icon.SiCss3, name: 'CSS' },
			{ icon: icon.SiJavascript, name: 'Javascript' },
			{ icon: icon.SiReact, name: 'ReactJS' },
		],
		linkProject: 'https://github.com/duylam15/react-sport-field-booking-system',
		linkGithub: 'https://github.com/duylam15/react-flight-management-system',
	},
	{
		name: 'Đặt sân bóng',
		description: 'Nền tảng hỗ trợ người dùng tìm kiếm, đặt sân bóng nhanh chóng và quản lý lịch đặt dễ dàng.',
		stack: [
			{ icon: icon.SiHtml5, name: 'HTML' },
			{ icon: icon.SiCss3, name: 'CSS' },
			{ icon: icon.SiJavascript, name: 'Javascript' },
			{ icon: icon.SiReact, name: 'ReactJS' },
		],
		linkProject: 'https://github.com/duylam15/react-sport-field-booking-system',
		linkGithub: 'https://github.com/duylam15/react-sport-field-booking-system',
	},
]


const stack = [
	{
		name: 'Front End',
		items: [
			{ icon: icon.SiHtml5, name: 'HTML' },
			{ icon: icon.SiCss3, name: 'CSS' },
			{ icon: icon.SiBootstrap, name: 'Bootstrap', },
			{ icon: icon.SiJavascript, name: 'Javascript' },
			{ icon: icon.SiTypescript, name: 'Typescript' },
			{ icon: icon.SiReact, name: 'React', },
		],
	}
]

const contact = {
	description: 'Liên hệ với chúng tôi để biết thêm thông tin.',
	email: 'duylam468213@email.com'
};

export { profile, social, work, stack, contact, brand }
import React, { useState, useEffect } from 'react';
import './index.css';

const RECENT_POSTS = [
	{
		id: '1',
		title: 'Preventing Race Conditions in Flash Sales with Redis Lua Scripts',
		date: '15 Nov 2026',
		tags: 'Backend, Redis, Concurrency',
		excerpt:
			'How I eliminated inventory overselling under 1,000 concurrent virtual users by moving check-and-decrement logic into atomic Redis Lua scripts and async workers.',
		content: [
			{
				heading: 'The Problem: Overselling Under High Concurrency',
				text: 'When 1,000 concurrent virtual users compete for 500 limited flash-sale items, standard read-then-write database queries suffer from race conditions. Multiple requests read the same remaining stock count before any transaction commits, resulting in negative inventory.',
			},
			{
				heading: 'Atomic Check-and-Decrement with Redis Lua',
				text: 'Redis executes Lua scripts atomically on a single thread, guaranteeing no other command can interleave while stock is checked and decremented:',
				code: `local stock = tonumber(redis.call('GET', KEYS[1]) or '0')
if stock <= 0 then
  return -1
end
redis.call('DECR', KEYS[1])
return stock - 1`,
			},
			{
				heading: 'Benchmark Results (k6 on 1 vCPU, 2GB RAM VPS)',
				text: 'By combining atomic Redis Lua gating with asynchronous Redis Streams workers for PostgreSQL persistence, the system sustained (~ 70 RPS, 2.03s p(95) latency) with exactly 500 accepted orders and 500 cleanly rejected requests—zero overselling.',
			},
		],
	},
	{
		id: '2',
		title: 'Syncing Dashboard Tabs with URL Query Params in Next.js',
		date: '02 Nov 2026',
		tags: 'Frontend, Next.js, UX',
		excerpt:
			'A lightweight pattern for preserving active tab states across browser reloads and shared links without extra state-management libraries.',
		content: [
			{
				heading: 'Why Local Component State Falls Short',
				text: 'Storing active dashboard tabs purely in React useState resets the user back to the default tab whenever they refresh the page or share a direct link to specific k6 benchmark metrics.',
			},
			{
				heading: 'URL-Driven State Pattern',
				text: 'By reading the active tab from URL search parameters (?tab=metrics) and updating history cleanly on tab switch, browser Back/Forward navigation and page reloads work out of the box:',
				code: `const params = new URLSearchParams(window.location.search);
const activeTab = params.get('tab') || 'overview';

const handleTabChange = (nextTab) => {
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set('tab', nextTab);
  window.history.pushState({}, '', nextUrl);
};`,
			},
			{
				heading: 'Takeaway',
				text: 'Treating the URL as the single source of truth keeps frontend components stateless, improves shareability, and requires zero third-party routing overhead.',
			},
		],
	},
];

const TECH_STACK = [
	{
		title: 'Frontend',
		skills: ['HTML5', 'CSS3', 'SCSS', 'JavaScript (ES6+)', 'TypeScript', 'ReactJS', 'Next.js', 'Vite', 'Tailwind CSS', 'Ant Design'],
	},
	{
		title: 'Backend & Database',
		skills: ['Node.js', 'Express.js', 'Django', 'RESTful API', 'Socket.IO', 'JWT', 'PostgreSQL', 'Redis', 'Prisma'],
	},
	{
		title: 'DevOps & Tools',
		skills: ['Docker', 'Nginx', 'Git / GitHub', 'GitHub Actions', 'Linux VPS', 'Cloudflare', 'k6', 'Storybook', 'Figma'],
	},
];

const FEATURED_WORKS = [
	{
		title: 'Flash Sale Benchmark Engine',
		year: '2026',
		category: 'Fullstack & Load-Testing Dashboard',
		image: '/flashsale.png',
		description:
			'High-concurrency e-commerce flash sale simulator and interactive dashboard visualizing system architecture and real-time k6 load-test metrics. Engineered atomic Redis Lua inventory locking to handle 1,000 concurrent VUs (~ 70 RPS, 2.03s p(95) latency) with zero overselling.',
		stack: ['Next.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'Redis', 'Docker', 'k6'],
		liveUrl: 'https://netto.id.vn',
		repoUrl: 'https://github.com/duylam15/flashsale',
	},
	{
		title: 'SGU Learning Management System',
		year: '2025',
		category: 'Fullstack Web Application',
		image: '/lms.png',
		description:
			'Multi-role academic portal built for Administrators, Lecturers, and Students. Features role-based JWT authentication, automated assignment grading, gradebook calculations, and real-time course chat rooms powered by Socket.IO.',
		stack: ['ReactJS', 'Vite', 'TypeScript', 'Ant Design', 'Express.js', 'PostgreSQL', 'Socket.IO'],
		liveUrl: 'https://drive.google.com/file/d/1T9x5Bzat81q-qzEpmDgy4yX5TW2ejaW1/view',
		repoUrl: 'https://github.com/duylam15/kltn',
	},
	{
		title: 'Shopee E-Commerce Clone',
		year: '2025',
		category: 'Frontend Architecture',
		image: '/shopee.png',
		description:
			'Full-featured e-commerce frontend replicating core Shopee workflows: JWT authentication, advanced product filtering/sorting/pagination, image zoom slider, cart management, and user profile tracking. Optimized with lazy loading, code splitting, i18n, Storybook, and Unit Tests.',
		stack: ['ReactJS', 'TypeScript', 'Tailwind CSS', 'React Query', 'React Hook Form', 'Storybook'],
		liveUrl: 'https://drive.google.com/drive/folders/14i2_pgvSA15LS-qnQ-6hkulsVKzsnLh1',
		repoUrl: 'https://github.com/duylam15/shopee-clone',
	},
	{
		title: 'Flight Management System',
		year: '2024',
		category: 'Frontend Web Application',
		image: '/flight.png',
		description:
			'Flight booking and airline operations management interface featuring RBAC (User, Role & Permission management), aircraft/flight scheduling, ticket booking, VNPay payment integration, real-time WebSocket updates, and analytics charts.',
		stack: ['ReactJS', 'RESTful API', 'WebSocket', 'VNPay Integration', 'Charts'],
		liveUrl: '',
		repoUrl: 'https://github.com/duylam15/react-flight-management-system',
	},
	{
		title: 'GroceryMart Storefront',
		year: '2024',
		category: 'Responsive UI & Vanilla JS',
		image: '/grocery.png',
		description:
			'Multi-page online grocery storefront built from scratch without frameworks. Features responsive layouts across mobile, tablet, and desktop, Dark/Light mode switching, interactive cart, wishlist, and checkout flows.',
		stack: ['HTML5', 'CSS3', 'SCSS', 'JavaScript (ES6+)', 'Responsive Design'],
		liveUrl: 'https://duylam15.github.io/grocerymart/',
		repoUrl: 'https://github.com/duylam15/grocerymart',
	},
];

export default function App() {
	const [pathname, setPathname] = useState(window.location.pathname);
	const [copied, setCopied] = useState(false);
	const email = 'nguyenducduylam.dev@gmail.com'; // Thay bằng email thật của bạn

	useEffect(() => {
		const handlePopState = () => setPathname(window.location.pathname);
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	const navigate = (e, to) => {
		e.preventDefault();
		window.history.pushState({}, '', to);
		setPathname(to);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleCopyEmail = () => {
		navigator.clipboard.writeText(email);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// Kiểm tra route /blog/:id
	const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
	const activePost = blogMatch ? RECENT_POSTS.find((p) => p.id === blogMatch[1]) : null;

	if (activePost) {
		return (
			<div>
				<header className="navbar">
					<a href="/" onClick={(e) => navigate(e, '/')}>
						Home
					</a>
					<a href="/#blog" onClick={(e) => navigate(e, '/')}>
						Blog
					</a>
					<a href="/#works" onClick={(e) => navigate(e, '/')}>
						Works
					</a>
				</header>

				<main className="post-reader">
					<a href="/" onClick={(e) => navigate(e, '/')} className="back-btn">
						← Back to Portfolio
					</a>
					<h1>{activePost.title}</h1>
					<div className="post-reader-meta">
						<span>{activePost.date}</span>
						<span>|</span>
						<span>{activePost.tags}</span>
					</div>

					<div className="post-body">
						{activePost.content.map((block, index) => (
							<section key={index}>
								<h2>{block.heading}</h2>
								<p>{block.text}</p>
								{block.code && (
									<pre>
										<code>{block.code}</code>
									</pre>
								)}
							</section>
						))}
					</div>
				</main>
			</div>
		);
	}

	return (
		<div>
			{/* Top Navigation */}
			<header className="navbar">
				<a href="#blog">Blog</a>
				<a href="#tech">Technologies</a>
				<a href="#works">Works</a>
				<a href="#contact">Contact</a>
			</header>

			{/* Hero Section */}
			<section className="container hero">
				<div className="hero-content">
					<h1>
						Hi, I am Duy Lam,
						<br />
						Web Developer
					</h1>
					<p>
						Software Engineering graduate from Sai Gon University (GPA 3.27/4.0) with hands-on Fullstack internship experience. I focus on building clean, responsive web interfaces and scalable backend systems.
					</p>
					<a
						href="https://www.linkedin.com/in/l%C3%A2m-nguy%E1%BB%85n-%C4%91%E1%BB%A9c-duy-b2b703362/"
						target="_blank"
						rel="noreferrer"
						className="btn-resume"
					>
						Contact Me
					</a>
				</div>

				<div className="hero-avatar">
					<img
						src="/avatar.jpg"
						alt="Nguyen Duc Duy Lam"
						onError={(e) => {
							e.currentTarget.src = 'https://avatars.githubusercontent.com/u/duylam15';
						}}
					/>
				</div>
			</section>

			{/* Recent Posts Band */}
			<section id="blog" className="band-section">
				<div className="container">
					<div className="band-header">
						<h2 className="section-label">Recent posts</h2>
						<a href="https://github.com/duylam15" target="_blank" rel="noreferrer" className="band-link">
							View all
						</a>
					</div>

					<div className="cards-two-col">
						{RECENT_POSTS.map((post) => (
							<article key={post.id} className="white-card">
								<div>
									<h3>
										<a href={`/blog/${post.id}`} onClick={(e) => navigate(e, `/blog/${post.id}`)}>
											{post.title}
										</a>
									</h3>
									<div className="card-meta">
										<span>{post.date}</span>
										<span>|</span>
										<span>{post.tags}</span>
									</div>
									<p>{post.excerpt}</p>
								</div>
								<a href={`/blog/${post.id}`} onClick={(e) => navigate(e, `/blog/${post.id}`)} className="read-more">
									Read note →
								</a>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* Technologies Section */}
			<section id="tech" className="container tech-section">
				<h2 className="section-label">Technologies</h2>
				<div className="tech-grid">
					{TECH_STACK.map((group) => (
						<div key={group.title} className="tech-group">
							<h4>{group.title}</h4>
							<div className="tech-tags">
								{group.skills.map((skill) => (
									<span key={skill} className="tech-tag">
										{skill}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Featured Works Section */}
			<section id="works" className="container works-section">
				<h2 className="section-label">Featured works</h2>
				<div className="work-list">
					{FEATURED_WORKS.map((work) => (
						<article key={work.title} className="work-item">
							<a
								href={work.liveUrl || work.repoUrl}
								target="_blank"
								rel="noreferrer"
								className="work-thumb"
							>
								<img
									src={work.image}
									alt={work.title}
									onError={(e) => {
										e.currentTarget.style.display = 'none';
										e.currentTarget.parentElement.innerHTML = `<div class="work-placeholder">${work.title}</div>`;
									}}
								/>
							</a>
							<div className="work-info">
								<h3>
									<a href={work.liveUrl || work.repoUrl} target="_blank" rel="noreferrer">
										{work.title}
									</a>
								</h3>
								<div className="work-meta">
									<span className="year-badge">{work.year}</span>
									<span className="work-category">{work.category}</span>
								</div>
								<p>{work.description}</p>
								<div className="tech-tags" style={{ marginBottom: '14px' }}>
									{work.stack.map((tech) => (
										<span key={tech} className="tech-tag">
											{tech}
										</span>
									))}
								</div>
								<div className="work-links">
									{work.liveUrl && (
										<a href={work.liveUrl} target="_blank" rel="noreferrer">
											Live Demo ↗
										</a>
									)}
									<a href={work.repoUrl} target="_blank" rel="noreferrer">
										GitHub Source ↗
									</a>
								</div>
							</div>
						</article>
					))}
				</div>
			</section>

			{/* Footer */}
			<footer id="contact" className="footer">
				<div className="social-icons">
					{/* GitHub */}
					<a href="https://github.com/duylam15" target="_blank" rel="noreferrer" aria-label="GitHub">
						<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
						</svg>
					</a>

					{/* LinkedIn */}
					<a
						href="https://www.linkedin.com/in/l%C3%A2m-nguy%E1%BB%85n-%C4%91%E1%BB%A9c-duy-b2b703362/" target="_blank"
						rel="noreferrer"
						aria-label="LinkedIn"
					>
						<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
							<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
						</svg>
					</a>

					{/* Email Copy Button */}
					<button onClick={handleCopyEmail} aria-label="Copy Email" title={`Click to copy: ${email}`}>
						<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
							<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
						</svg>
					</button>
				</div>

				<p className="copyright">
					{copied ? `Copied email: ${email}` : `Copyright ©${new Date().getFullYear()} Nguyen Duc Duy Lam. All rights reserved.`}
				</p>
			</footer>
		</div>
	);
}
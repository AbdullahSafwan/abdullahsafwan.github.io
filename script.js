const body = document.body

// Cookie Consent & Google Analytics
window.addEventListener('load', function () {
	if (!window.CookieConsent) return;

	const cc = window.CookieConsent.run({
		categories: {
			necessary: {
				enabled: true,
				readOnly: true
			},
			analytics: {}
		},
		language: {
			default: 'en',
			translations: {
				en: {
					consentModal: {
						title: 'Cookie Preferences',
						description: 'This website uses cookies to improve your experience and analyze traffic. You can choose which cookies to accept.',
						acceptAllBtn: 'Accept all',
						acceptNecessaryBtn: 'Reject all',
						showPreferencesBtn: 'Manage preferences'
					},
					preferencesModal: {
						title: 'Cookie Preferences',
						acceptAllBtn: 'Accept all',
						acceptNecessaryBtn: 'Reject all',
						savePreferencesBtn: 'Save preferences',
						closeIconLabel: 'Close',
						sections: [
							{
								title: 'Cookie Usage',
								description: 'I use cookies to enhance your experience and understand how you interact with my portfolio.'
							},
							{
								title: 'Strictly Necessary cookies',
								description: 'These cookies are essential for the proper functioning of the website (theme preferences).',
								linkedCategory: 'necessary'
							},
							{
								title: 'Analytics cookies',
								description: 'These cookies help me understand how visitors interact with my portfolio by collecting anonymous information.',
								linkedCategory: 'analytics'
							},
							{
								title: 'More information',
								description: 'For any queries, please <a href="mailto:abdullahsafwan768@gmail.com">contact me</a>.'
							}
						]
					}
				}
			}
		},
		onConsent: function () {
			if (window.CookieConsent.acceptedCategory('analytics')) {
				loadGoogleAnalytics();
			}
		},
		onChange: function () {
			if (window.CookieConsent.acceptedCategory('analytics')) {
				loadGoogleAnalytics();
			}
		}
	});
});

// Load Google Analytics only after consent
function loadGoogleAnalytics() {
	if (window.gaLoaded) return;
	window.gaLoaded = true;

	const script = document.createElement('script');
	script.async = true;
	script.src = 'https://www.googletagmanager.com/gtag/js?id=G-GVS9TD2LYE';
	document.head.appendChild(script);

	window.dataLayer = window.dataLayer || [];
	function gtag() { dataLayer.push(arguments); }
	window.gtag = gtag;
	gtag('js', new Date());
	gtag('config', 'G-GVS9TD2LYE', {
		'anonymize_ip': true,
		'cookie_flags': 'SameSite=None;Secure'
	});
}

const btnTheme = document.querySelector('.fa-moon')
const btnHamburger = document.querySelector('.fa-bars')

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass)
  btnTheme.classList.add(btnClass)
}

const getBodyTheme = localStorage.getItem('portfolio-theme')
const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

addThemeClass(getBodyTheme, getBtnTheme)

const isDark = () => body.classList.contains('dark')

const setTheme = (bodyClass, btnClass) => {

	body.classList.remove(localStorage.getItem('portfolio-theme'))
	btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'))

  addThemeClass(bodyClass, btnClass)

	localStorage.setItem('portfolio-theme', bodyClass)
	localStorage.setItem('portfolio-btn-theme', btnClass)
}

const toggleTheme = () => {
	const newTheme = isDark() ? 'light' : 'dark';
	isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun');
	gtag('event', 'toggle_theme', {
		'event_category': 'engagement',
		'event_label': newTheme
	});
}

btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
	const navUl = document.querySelector('.nav__list')

	if (btnHamburger.classList.contains('fa-bars')) {
		btnHamburger.classList.remove('fa-bars')
		btnHamburger.classList.add('fa-times')
		navUl.classList.add('display-nav-list')
		gtag('event', 'mobile_menu_open', {
			'event_category': 'navigation',
			'event_label': 'Hamburger Menu'
		});
	} else {
		btnHamburger.classList.remove('fa-times')
		btnHamburger.classList.add('fa-bars')
		navUl.classList.remove('display-nav-list')
		gtag('event', 'mobile_menu_close', {
			'event_category': 'navigation',
			'event_label': 'Hamburger Menu'
		});
	}
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
	const btnScrollTop = document.querySelector('.scroll-top')

	if (
		body.scrollTop > 500 ||
		document.documentElement.scrollTop > 500
	) {
		btnScrollTop.style.display = 'block'
	} else {
		btnScrollTop.style.display = 'none'
	}
}

document.addEventListener('scroll', scrollUp)

// Scroll depth tracking
let scrollDepthTracked = {
	25: false,
	50: false,
	75: false,
	100: false
};

const trackScrollDepth = () => {
	const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	const scrolled = (window.scrollY / scrollHeight) * 100;

	Object.keys(scrollDepthTracked).forEach(depth => {
		if (scrolled >= depth && !scrollDepthTracked[depth]) {
			scrollDepthTracked[depth] = true;
			gtag('event', 'scroll_depth', {
				'event_category': 'engagement',
				'event_label': `${depth}%`
			});
		}
	});
};

document.addEventListener('scroll', trackScrollDepth);

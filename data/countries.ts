export type Continent =
	| "Africa"
	| "Asia"
	| "Europe"
	| "North America"
	| "South America"
	| "Oceania";

export interface Country {
	name: string;
	code: string; // ISO 3166-1 alpha-2
	continent: Continent;
	alternateNames?: string[];
}

// All 195 UN-recognized countries
export const countries: Country[] = [
	// Africa (54 countries)
	{ name: "Algeria", code: "dz", continent: "Africa" },
	{ name: "Angola", code: "ao", continent: "Africa" },
	{ name: "Benin", code: "bj", continent: "Africa" },
	{ name: "Botswana", code: "bw", continent: "Africa" },
	{ name: "Burkina Faso", code: "bf", continent: "Africa" },
	{ name: "Burundi", code: "bi", continent: "Africa" },
	{ name: "Cameroon", code: "cm", continent: "Africa" },
	{
		name: "Cape Verde",
		code: "cv",
		continent: "Africa",
		alternateNames: ["Cabo Verde"],
	},
	{
		name: "Central African Republic",
		code: "cf",
		continent: "Africa",
		alternateNames: ["CAR"],
	},
	{ name: "Chad", code: "td", continent: "Africa" },
	{ name: "Comoros", code: "km", continent: "Africa" },
	{
		name: "Democratic Republic of the Congo",
		code: "cd",
		continent: "Africa",
		alternateNames: ["DRC", "DR Congo", "Congo-Kinshasa", "Congo Kinshasa"],
	},
	{
		name: "Republic of the Congo",
		code: "cg",
		continent: "Africa",
		alternateNames: ["Congo", "Congo-Brazzaville", "Congo Brazzaville"],
	},
	{
		name: "Ivory Coast",
		code: "ci",
		continent: "Africa",
		alternateNames: ["Cote d'Ivoire", "Côte d'Ivoire"],
	},
	{ name: "Djibouti", code: "dj", continent: "Africa" },
	{ name: "Egypt", code: "eg", continent: "Africa" },
	{ name: "Equatorial Guinea", code: "gq", continent: "Africa" },
	{ name: "Eritrea", code: "er", continent: "Africa" },
	{
		name: "Eswatini",
		code: "sz",
		continent: "Africa",
		alternateNames: ["Swaziland"],
	},
	{ name: "Ethiopia", code: "et", continent: "Africa" },
	{ name: "Gabon", code: "ga", continent: "Africa" },
	{
		name: "Gambia",
		code: "gm",
		continent: "Africa",
		alternateNames: ["The Gambia"],
	},
	{ name: "Ghana", code: "gh", continent: "Africa" },
	{ name: "Guinea", code: "gn", continent: "Africa" },
	{ name: "Guinea-Bissau", code: "gw", continent: "Africa" },
	{ name: "Kenya", code: "ke", continent: "Africa" },
	{ name: "Lesotho", code: "ls", continent: "Africa" },
	{ name: "Liberia", code: "lr", continent: "Africa" },
	{ name: "Libya", code: "ly", continent: "Africa" },
	{ name: "Madagascar", code: "mg", continent: "Africa" },
	{ name: "Malawi", code: "mw", continent: "Africa" },
	{ name: "Mali", code: "ml", continent: "Africa" },
	{ name: "Mauritania", code: "mr", continent: "Africa" },
	{ name: "Mauritius", code: "mu", continent: "Africa" },
	{ name: "Morocco", code: "ma", continent: "Africa" },
	{ name: "Mozambique", code: "mz", continent: "Africa" },
	{ name: "Namibia", code: "na", continent: "Africa" },
	{ name: "Niger", code: "ne", continent: "Africa" },
	{ name: "Nigeria", code: "ng", continent: "Africa" },
	{ name: "Rwanda", code: "rw", continent: "Africa" },
	{
		name: "Sao Tome and Principe",
		code: "st",
		continent: "Africa",
		alternateNames: ["São Tomé and Príncipe"],
	},
	{ name: "Senegal", code: "sn", continent: "Africa" },
	{ name: "Seychelles", code: "sc", continent: "Africa" },
	{ name: "Sierra Leone", code: "sl", continent: "Africa" },
	{ name: "Somalia", code: "so", continent: "Africa" },
	{ name: "South Africa", code: "za", continent: "Africa" },
	{ name: "South Sudan", code: "ss", continent: "Africa" },
	{ name: "Sudan", code: "sd", continent: "Africa" },
	{ name: "Tanzania", code: "tz", continent: "Africa" },
	{ name: "Togo", code: "tg", continent: "Africa" },
	{ name: "Tunisia", code: "tn", continent: "Africa" },
	{ name: "Uganda", code: "ug", continent: "Africa" },
	{ name: "Zambia", code: "zm", continent: "Africa" },
	{ name: "Zimbabwe", code: "zw", continent: "Africa" },

	// Asia (49 countries)
	{ name: "Afghanistan", code: "af", continent: "Asia" },
	{ name: "Armenia", code: "am", continent: "Asia" },
	{ name: "Azerbaijan", code: "az", continent: "Asia" },
	{ name: "Bahrain", code: "bh", continent: "Asia" },
	{ name: "Bangladesh", code: "bd", continent: "Asia" },
	{ name: "Bhutan", code: "bt", continent: "Asia" },
	{
		name: "Brunei",
		code: "bn",
		continent: "Asia",
		alternateNames: ["Brunei Darussalam"],
	},
	{ name: "Cambodia", code: "kh", continent: "Asia" },
	{
		name: "China",
		code: "cn",
		continent: "Asia",
		alternateNames: ["People's Republic of China", "PRC"],
	},
	{ name: "Cyprus", code: "cy", continent: "Asia" },
	{ name: "Georgia", code: "ge", continent: "Asia" },
	{ name: "India", code: "in", continent: "Asia" },
	{ name: "Indonesia", code: "id", continent: "Asia" },
	{
		name: "Iran",
		code: "ir",
		continent: "Asia",
		alternateNames: ["Islamic Republic of Iran", "Persia"],
	},
	{ name: "Iraq", code: "iq", continent: "Asia" },
	{ name: "Israel", code: "il", continent: "Asia" },
	{ name: "Japan", code: "jp", continent: "Asia" },
	{ name: "Jordan", code: "jo", continent: "Asia" },
	{ name: "Kazakhstan", code: "kz", continent: "Asia" },
	{ name: "Kuwait", code: "kw", continent: "Asia" },
	{ name: "Kyrgyzstan", code: "kg", continent: "Asia" },
	{
		name: "Laos",
		code: "la",
		continent: "Asia",
		alternateNames: ["Lao People's Democratic Republic", "Lao PDR"],
	},
	{ name: "Lebanon", code: "lb", continent: "Asia" },
	{ name: "Malaysia", code: "my", continent: "Asia" },
	{ name: "Maldives", code: "mv", continent: "Asia" },
	{ name: "Mongolia", code: "mn", continent: "Asia" },
	{ name: "Myanmar", code: "mm", continent: "Asia", alternateNames: ["Burma"] },
	{ name: "Nepal", code: "np", continent: "Asia" },
	{
		name: "North Korea",
		code: "kp",
		continent: "Asia",
		alternateNames: ["Democratic People's Republic of Korea", "DPRK"],
	},
	{ name: "Oman", code: "om", continent: "Asia" },
	{ name: "Pakistan", code: "pk", continent: "Asia" },
	{
		name: "Palestine",
		code: "ps",
		continent: "Asia",
		alternateNames: ["State of Palestine"],
	},
	{ name: "Philippines", code: "ph", continent: "Asia" },
	{ name: "Qatar", code: "qa", continent: "Asia" },
	{ name: "Saudi Arabia", code: "sa", continent: "Asia" },
	{ name: "Singapore", code: "sg", continent: "Asia" },
	{
		name: "South Korea",
		code: "kr",
		continent: "Asia",
		alternateNames: ["Republic of Korea", "Korea"],
	},
	{ name: "Sri Lanka", code: "lk", continent: "Asia" },
	{
		name: "Syria",
		code: "sy",
		continent: "Asia",
		alternateNames: ["Syrian Arab Republic"],
	},
	{
		name: "Taiwan",
		code: "tw",
		continent: "Asia",
		alternateNames: ["Republic of China", "ROC"],
	},
	{ name: "Tajikistan", code: "tj", continent: "Asia" },
	{ name: "Thailand", code: "th", continent: "Asia" },
	{
		name: "Timor-Leste",
		code: "tl",
		continent: "Asia",
		alternateNames: ["East Timor"],
	},
	{
		name: "Turkey",
		code: "tr",
		continent: "Asia",
		alternateNames: ["Türkiye", "Turkiye"],
	},
	{ name: "Turkmenistan", code: "tm", continent: "Asia" },
	{
		name: "United Arab Emirates",
		code: "ae",
		continent: "Asia",
		alternateNames: ["UAE", "Emirates"],
	},
	{ name: "Uzbekistan", code: "uz", continent: "Asia" },
	{
		name: "Vietnam",
		code: "vn",
		continent: "Asia",
		alternateNames: ["Viet Nam"],
	},
	{ name: "Yemen", code: "ye", continent: "Asia" },

	// Europe (44 countries)
	{ name: "Albania", code: "al", continent: "Europe" },
	{ name: "Andorra", code: "ad", continent: "Europe" },
	{ name: "Austria", code: "at", continent: "Europe" },
	{ name: "Belarus", code: "by", continent: "Europe" },
	{ name: "Belgium", code: "be", continent: "Europe" },
	{
		name: "Bosnia and Herzegovina",
		code: "ba",
		continent: "Europe",
		alternateNames: ["Bosnia"],
	},
	{ name: "Bulgaria", code: "bg", continent: "Europe" },
	{ name: "Croatia", code: "hr", continent: "Europe" },
	{
		name: "Czech Republic",
		code: "cz",
		continent: "Europe",
		alternateNames: ["Czechia"],
	},
	{ name: "Denmark", code: "dk", continent: "Europe" },
	{ name: "Estonia", code: "ee", continent: "Europe" },
	{ name: "Finland", code: "fi", continent: "Europe" },
	{ name: "France", code: "fr", continent: "Europe" },
	{ name: "Germany", code: "de", continent: "Europe" },
	{ name: "Greece", code: "gr", continent: "Europe" },
	{ name: "Hungary", code: "hu", continent: "Europe" },
	{ name: "Iceland", code: "is", continent: "Europe" },
	{ name: "Ireland", code: "ie", continent: "Europe" },
	{ name: "Italy", code: "it", continent: "Europe" },
	{ name: "Kosovo", code: "xk", continent: "Europe" },
	{ name: "Latvia", code: "lv", continent: "Europe" },
	{ name: "Liechtenstein", code: "li", continent: "Europe" },
	{ name: "Lithuania", code: "lt", continent: "Europe" },
	{ name: "Luxembourg", code: "lu", continent: "Europe" },
	{ name: "Malta", code: "mt", continent: "Europe" },
	{ name: "Moldova", code: "md", continent: "Europe" },
	{ name: "Monaco", code: "mc", continent: "Europe" },
	{ name: "Montenegro", code: "me", continent: "Europe" },
	{
		name: "Netherlands",
		code: "nl",
		continent: "Europe",
		alternateNames: ["Holland"],
	},
	{
		name: "North Macedonia",
		code: "mk",
		continent: "Europe",
		alternateNames: ["Macedonia"],
	},
	{ name: "Norway", code: "no", continent: "Europe" },
	{ name: "Poland", code: "pl", continent: "Europe" },
	{ name: "Portugal", code: "pt", continent: "Europe" },
	{ name: "Romania", code: "ro", continent: "Europe" },
	{
		name: "Russia",
		code: "ru",
		continent: "Europe",
		alternateNames: ["Russian Federation"],
	},
	{ name: "San Marino", code: "sm", continent: "Europe" },
	{ name: "Serbia", code: "rs", continent: "Europe" },
	{ name: "Slovakia", code: "sk", continent: "Europe" },
	{ name: "Slovenia", code: "si", continent: "Europe" },
	{ name: "Spain", code: "es", continent: "Europe" },
	{ name: "Sweden", code: "se", continent: "Europe" },
	{ name: "Switzerland", code: "ch", continent: "Europe" },
	{ name: "Ukraine", code: "ua", continent: "Europe" },
	{
		name: "United Kingdom",
		code: "gb",
		continent: "Europe",
		alternateNames: ["UK", "Britain", "Great Britain", "England"],
	},
	{
		name: "Vatican City",
		code: "va",
		continent: "Europe",
		alternateNames: ["Holy See", "Vatican"],
	},

	// North America (23 countries)
	{ name: "Antigua and Barbuda", code: "ag", continent: "North America" },
	{
		name: "Bahamas",
		code: "bs",
		continent: "North America",
		alternateNames: ["The Bahamas"],
	},
	{ name: "Barbados", code: "bb", continent: "North America" },
	{ name: "Belize", code: "bz", continent: "North America" },
	{ name: "Canada", code: "ca", continent: "North America" },
	{ name: "Costa Rica", code: "cr", continent: "North America" },
	{ name: "Cuba", code: "cu", continent: "North America" },
	{ name: "Dominica", code: "dm", continent: "North America" },
	{ name: "Dominican Republic", code: "do", continent: "North America" },
	{ name: "El Salvador", code: "sv", continent: "North America" },
	{ name: "Grenada", code: "gd", continent: "North America" },
	{ name: "Guatemala", code: "gt", continent: "North America" },
	{ name: "Haiti", code: "ht", continent: "North America" },
	{ name: "Honduras", code: "hn", continent: "North America" },
	{ name: "Jamaica", code: "jm", continent: "North America" },
	{ name: "Mexico", code: "mx", continent: "North America" },
	{ name: "Nicaragua", code: "ni", continent: "North America" },
	{ name: "Panama", code: "pa", continent: "North America" },
	{
		name: "Saint Kitts and Nevis",
		code: "kn",
		continent: "North America",
		alternateNames: ["St Kitts and Nevis", "St. Kitts and Nevis"],
	},
	{
		name: "Saint Lucia",
		code: "lc",
		continent: "North America",
		alternateNames: ["St Lucia", "St. Lucia"],
	},
	{
		name: "Saint Vincent and the Grenadines",
		code: "vc",
		continent: "North America",
		alternateNames: [
			"St Vincent and the Grenadines",
			"St. Vincent and the Grenadines",
		],
	},
	{ name: "Trinidad and Tobago", code: "tt", continent: "North America" },
	{
		name: "United States",
		code: "us",
		continent: "North America",
		alternateNames: ["USA", "US", "United States of America", "America"],
	},

	// South America (12 countries)
	{ name: "Argentina", code: "ar", continent: "South America" },
	{ name: "Bolivia", code: "bo", continent: "South America" },
	{ name: "Brazil", code: "br", continent: "South America" },
	{ name: "Chile", code: "cl", continent: "South America" },
	{ name: "Colombia", code: "co", continent: "South America" },
	{ name: "Ecuador", code: "ec", continent: "South America" },
	{ name: "Guyana", code: "gy", continent: "South America" },
	{ name: "Paraguay", code: "py", continent: "South America" },
	{ name: "Peru", code: "pe", continent: "South America" },
	{ name: "Suriname", code: "sr", continent: "South America" },
	{ name: "Uruguay", code: "uy", continent: "South America" },
	{ name: "Venezuela", code: "ve", continent: "South America" },

	// Oceania (14 countries)
	{ name: "Australia", code: "au", continent: "Oceania" },
	{ name: "Fiji", code: "fj", continent: "Oceania" },
	{ name: "Kiribati", code: "ki", continent: "Oceania" },
	{ name: "Marshall Islands", code: "mh", continent: "Oceania" },
	{
		name: "Micronesia",
		code: "fm",
		continent: "Oceania",
		alternateNames: ["Federated States of Micronesia", "FSM"],
	},
	{ name: "Nauru", code: "nr", continent: "Oceania" },
	{ name: "New Zealand", code: "nz", continent: "Oceania" },
	{ name: "Palau", code: "pw", continent: "Oceania" },
	{
		name: "Papua New Guinea",
		code: "pg",
		continent: "Oceania",
		alternateNames: ["PNG"],
	},
	{ name: "Samoa", code: "ws", continent: "Oceania" },
	{ name: "Solomon Islands", code: "sb", continent: "Oceania" },
	{ name: "Tonga", code: "to", continent: "Oceania" },
	{ name: "Tuvalu", code: "tv", continent: "Oceania" },
	{ name: "Vanuatu", code: "vu", continent: "Oceania" },
];

// Get flag URL from flagcdn.com
export function getFlagUrl(code: string, width: number = 320): string {
	return `https://flagcdn.com/w${width}/${code}.png`;
}

// Filter countries by continent
export function getCountriesByContinent(continent: Continent): Country[] {
	return countries.filter((c) => c.continent === continent);
}

// Get all continents
export const continents: Continent[] = [
	"Africa",
	"Asia",
	"Europe",
	"North America",
	"South America",
	"Oceania",
];

// Shuffle array using Fisher-Yates algorithm
export function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

// Check if answer matches country (case-insensitive, with alternate names)
export function checkAnswer(country: Country, answer: string): boolean {
	const normalizedAnswer = answer.trim().toLowerCase();
	if (country.name.toLowerCase() === normalizedAnswer) return true;
	if (country.alternateNames) {
		return country.alternateNames.some(
			(alt) => alt.toLowerCase() === normalizedAnswer
		);
	}
	return false;
}

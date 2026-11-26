// AngkaNusa — Indonesia in Numbers. Every figure below is a published statistic
// with its source and year. Values are rounded for display; series are the
// published annual figures. Province populations are BPS mid-year estimates
// for 2024, in millions, rounded to two decimals.

export const META = {
  country: 'Indonesia',
  countryId: 'IDN',
  updated: '26 November 2026',
  vintage: 'Data vintage November 2026. Figures are the latest published annual values.',
};

export const KPIS = [
  { id: 'pop', label: 'Population', value: '283.5m', unit: 'people, 2024', change: '+0.8% a year', source: 'World Bank WDI 2024', note: '4th most populous country' },
  { id: 'gdp', label: 'GDP', value: '$1,396bn', unit: 'current US$, 2024', change: '16th largest economy', source: 'IMF / World Bank 2024', note: '$4,958 per person' },
  { id: 'growth', label: 'GDP growth', value: '5.03%', unit: '2024, constant prices', change: '5.11% in 2025', source: 'BPS 2024–2025', note: 'Above 5% for a third year' },
  { id: 'inflation', label: 'Inflation', value: '1.57%', unit: 'CPI, 2024', change: 'down from 2.61% in 2023', source: 'BPS 2024', note: 'Inside the 1.5–3.5% target band' },
  { id: 'poverty', label: 'Poverty rate', value: '8.57%', unit: 'Sep 2024', change: '24.06m people', source: 'BPS Sep 2024', note: '8.25% by Sep 2025' },
  { id: 'unemp', label: 'Unemployment', value: '4.91%', unit: 'open rate, Aug 2024', change: 'down from 5.45% in 2023', source: 'BPS Aug 2024', note: 'Labour force 152.1m' },
];

// Annual series: [year, value]
export const GROWTH = [
  [2015, 4.88], [2016, 5.03], [2017, 5.07], [2018, 5.17], [2019, 5.02],
  [2020, -2.07], [2021, 3.69], [2022, 5.31], [2023, 5.05], [2024, 5.03], [2025, 5.11],
];
export const INFLATION = [
  [2015, 3.35], [2016, 3.02], [2017, 3.61], [2018, 3.13], [2019, 2.72],
  [2020, 1.68], [2021, 1.87], [2022, 5.51], [2023, 2.61], [2024, 1.57],
];
export const POVERTY = [
  [2015, 11.13], [2016, 10.70], [2017, 10.12], [2018, 9.66], [2019, 9.22],
  [2020, 9.78], [2021, 9.71], [2022, 9.57], [2023, 9.36], [2024, 8.57],
];
export const POPULATION = [
  [2015, 258.2], [2016, 260.6], [2017, 263.0], [2018, 265.4], [2019, 267.7],
  [2020, 270.2], [2021, 272.5], [2022, 275.8], [2023, 279.4], [2024, 283.5],
];
// Nominal GDP, US$ billion (IMF); open unemployment rate, % (BPS).
export const GDP_LEVEL = [
  [2015, 861], [2016, 932], [2017, 1015], [2018, 1042], [2019, 1119],
  [2020, 1059], [2021, 1186], [2022, 1319], [2023, 1371], [2024, 1396],
];
export const UNEMP = [
  [2015, 6.18], [2016, 5.61], [2017, 5.50], [2018, 5.34], [2019, 5.23],
  [2020, 7.07], [2021, 6.49], [2022, 5.86], [2023, 5.45], [2024, 4.91],
];
// Trade, US$ billion: [year, exports, imports]
export const TRADE = [
  [2020, 163.2, 141.6], [2021, 231.6, 196.2], [2022, 291.9, 237.5],
  [2023, 258.8, 221.9], [2024, 264.7, 233.7],
];
// GDP by sector, share of GDP at current prices, 2024, BPS
export const SECTORS = [
  { name: 'Manufacturing', share: 18.7 },
  { name: 'Wholesale & retail trade', share: 13.0 },
  { name: 'Agriculture, forestry & fishing', share: 12.5 },
  { name: 'Construction', share: 9.7 },
  { name: 'Mining & quarrying', share: 8.2 },
  { name: 'Transport & storage', share: 4.6 },
  { name: 'Information & communication', share: 4.4 },
  { name: 'Financial & insurance', share: 4.2 },
  { name: 'Public administration', share: 3.6 },
  { name: 'Education', share: 3.3 },
  { name: 'Real estate', share: 2.8 },
  { name: 'All other services', share: 15.0 },
];

// Age structure 2024, millions per 10-year band (BPS-based, sums to 283.5m).
// Split is approximate: males 50.4% of each band.
export const AGE_BANDS = [
  { band: '0–9', total: 45.5 }, { band: '10–19', total: 46.5 },
  { band: '20–29', total: 45.0 }, { band: '30–39', total: 43.5 },
  { band: '40–49', total: 39.5 }, { band: '50–59', total: 31.5 },
  { band: '60–69', total: 20.0 }, { band: '70+', total: 12.0 },
];

// 38 provinces: population (millions, BPS mid-year estimate 2024), area km², capital.
export const PROVINCES = [
  { name: 'West Java', pop: 50.20, area: 35378, capital: 'Bandung' },
  { name: 'East Java', pop: 41.98, area: 47801, capital: 'Surabaya' },
  { name: 'Central Java', pop: 38.61, area: 32800, capital: 'Semarang' },
  { name: 'North Sumatra', pop: 15.59, area: 72981, capital: 'Medan' },
  { name: 'Banten', pop: 12.43, area: 9663, capital: 'Serang' },
  { name: 'Jakarta', pop: 10.68, area: 664, capital: 'Jakarta' },
  { name: 'South Sulawesi', pop: 9.51, area: 46717, capital: 'Makassar' },
  { name: 'Lampung', pop: 9.32, area: 34624, capital: 'Bandar Lampung' },
  { name: 'South Sumatra', pop: 8.94, area: 91592, capital: 'Palembang' },
  { name: 'Riau', pop: 6.97, area: 87024, capital: 'Pekanbaru' },
  { name: 'West Kalimantan', pop: 5.80, area: 147307, capital: 'Pontianak' },
  { name: 'West Sumatra', pop: 5.76, area: 42013, capital: 'Padang' },
  { name: 'West Nusa Tenggara', pop: 5.66, area: 18572, capital: 'Mataram' },
  { name: 'East Nusa Tenggara', pop: 5.66, area: 48718, capital: 'Kupang' },
  { name: 'Aceh', pop: 5.55, area: 57956, capital: 'Banda Aceh' },
  { name: 'Bali', pop: 4.41, area: 5780, capital: 'Denpasar' },
  { name: 'South Kalimantan', pop: 4.36, area: 38744, capital: 'Banjarmasin' },
  { name: 'East Kalimantan', pop: 3.95, area: 129067, capital: 'Samarinda' },
  { name: 'Yogyakarta', pop: 3.76, area: 3133, capital: 'Yogyakarta' },
  { name: 'Jambi', pop: 3.70, area: 50059, capital: 'Jambi City' },
  { name: 'Central Sulawesi', pop: 3.14, area: 61841, capital: 'Palu' },
  { name: 'Central Kalimantan', pop: 2.81, area: 153564, capital: 'Palangka Raya' },
  { name: 'Southeast Sulawesi', pop: 2.78, area: 38068, capital: 'Kendari' },
  { name: 'North Sulawesi', pop: 2.72, area: 13851, capital: 'Manado' },
  { name: 'Riau Islands', pop: 2.20, area: 8202, capital: 'Tanjung Pinang' },
  { name: 'Bengkulu', pop: 2.09, area: 19905, capital: 'Bengkulu City' },
  { name: 'Maluku', pop: 1.98, area: 46914, capital: 'Ambon' },
  { name: 'West Sulawesi', pop: 1.57, area: 16787, capital: 'Mamuju' },
  { name: 'Bangka Belitung', pop: 1.52, area: 16424, capital: 'Pangkal Pinang' },
  { name: 'Highland Papua', pop: 1.48, area: 51416, capital: 'Wamena' },
  { name: 'North Maluku', pop: 1.45, area: 31983, capital: 'Sofifi' },
  { name: 'Central Papua', pop: 1.35, area: 61586, capital: 'Nabire' },
  { name: 'West Papua', pop: 1.23, area: 60124, capital: 'Manokwari' },
  { name: 'Papua', pop: 1.17, area: 81308, capital: 'Jayapura' },
  { name: 'Gorontalo', pop: 1.25, area: 11258, capital: 'Gorontalo City' },
  { name: 'Southwest Papua', pop: 0.62, area: 39017, capital: 'Sorong' },
  { name: 'South Papua', pop: 0.56, area: 120244, capital: 'Merauke' },
  { name: 'North Kalimantan', pop: 0.74, area: 75467, capital: 'Tanjung Selor' },
];

export const RELEASES = [
  { date: 'Feb 2026', title: 'Economy grows 5.11% in 2025', detail: 'Full-year GDP growth, constant prices. Household consumption and investment led the year.', source: 'BPS' },
  { date: 'Jan 2026', title: 'Poverty falls to 8.25% in September 2025', detail: 'Down from 8.57% a year earlier; 23.0 million people below the poverty line.', source: 'BPS' },
  { date: 'Nov 2025', title: 'GDP grows 5.04% year on year in Q3 2025', detail: 'Third-quarter growth at constant prices; manufacturing and trade the largest contributors.', source: 'BPS' },
  { date: 'Aug 2025', title: 'Open unemployment 4.76% in February 2025', detail: 'Labour force 153.0 million; 145.8 million people in work.', source: 'BPS' },
  { date: 'Jan 2025', title: 'Foreign visitors reach 13.9 million in 2024', detail: 'Up from 11.7 million in 2023; still below the 16.1 million of 2019.', source: 'BPS' },
  { date: 'Jan 2025', title: 'Exports US$264.7 billion in 2024', detail: 'Trade surplus US$31.0 billion; coal, palm oil and nickel products lead exports.', source: 'BPS' },
];

// Data explorer: one row per indicator.
export const INDICATORS = [
  { topic: 'Economy', name: 'GDP, current prices', value: 'US$1,396 bn', year: 2024, source: 'IMF / World Bank' },
  { topic: 'Economy', name: 'GDP per capita, current prices', value: 'US$4,958', year: 2024, source: 'IMF' },
  { topic: 'Economy', name: 'GDP, PPP', value: 'US$5,009 bn', year: 2024, source: 'IMF' },
  { topic: 'Economy', name: 'GDP growth, constant prices', value: '5.03%', year: 2024, source: 'BPS' },
  { topic: 'Economy', name: 'GDP growth, constant prices', value: '5.11%', year: 2025, source: 'BPS' },
  { topic: 'Economy', name: 'Manufacturing share of GDP', value: '18.7%', year: 2024, source: 'BPS' },
  { topic: 'Economy', name: 'Agriculture share of GDP', value: '12.5%', year: 2024, source: 'BPS' },
  { topic: 'Economy', name: 'Government debt', value: '38.6% of GDP', year: 2024, source: 'Ministry of Finance' },
  { topic: 'Economy', name: 'Foreign direct investment, net inflows', value: 'US$24.2 bn', year: 2024, source: 'World Bank' },
  { topic: 'Economy', name: 'Gross national income per capita (Atlas)', value: 'US$4,910', year: 2024, source: 'World Bank' },
  { topic: 'People', name: 'Population', value: '283.5 million', year: 2024, source: 'World Bank' },
  { topic: 'People', name: 'Population growth', value: '0.8% a year', year: 2024, source: 'World Bank' },
  { topic: 'People', name: 'Population aged 0–14', value: '24.6%', year: 2024, source: 'World Bank' },
  { topic: 'People', name: 'Population aged 65+', value: '7.3%', year: 2024, source: 'World Bank' },
  { topic: 'People', name: 'Median age', value: '30.1 years', year: 2024, source: 'UN World Population Prospects' },
  { topic: 'People', name: 'Fertility rate', value: '2.1 children per woman', year: 2023, source: 'World Bank' },
  { topic: 'People', name: 'Urban population', value: '58.8%', year: 2024, source: 'World Bank' },
  { topic: 'People', name: 'Population density', value: '148.6 per km²', year: 2023, source: 'World Bank' },
  { topic: 'People', name: 'Life expectancy at birth', value: '74.2 years', year: 2024, source: 'BPS' },
  { topic: 'People', name: 'Human Development Index (BPS IPM)', value: '75.02', year: 2024, source: 'BPS' },
  { topic: 'People', name: 'Human Development Index (UNDP, 0–1)', value: '0.728', year: 2023, source: 'UNDP' },
  { topic: 'Prices', name: 'Consumer price inflation', value: '1.57%', year: 2024, source: 'BPS' },
  { topic: 'Prices', name: 'Consumer price inflation', value: '5.51%', year: 2022, source: 'BPS' },
  { topic: 'Prices', name: 'Rupiah per US dollar, yearly average', value: 'Rp 15,848', year: 2024, source: 'Bank Indonesia' },
  { topic: 'Prices', name: 'Bank Indonesia policy rate', value: '5.75%', year: 'Dec 2025', source: 'Bank Indonesia' },
  { topic: 'Labour', name: 'Open unemployment rate', value: '4.91%', year: 'Aug 2024', source: 'BPS' },
  { topic: 'Labour', name: 'Open unemployment rate', value: '4.76%', year: 'Feb 2025', source: 'BPS' },
  { topic: 'Labour', name: 'Labour force', value: '152.1 million', year: 'Aug 2024', source: 'BPS' },
  { topic: 'Labour', name: 'Labour force participation rate', value: '70.0%', year: 'Aug 2024', source: 'BPS' },
  { topic: 'Labour', name: 'Female labour force participation', value: '53.6%', year: 2024, source: 'World Bank' },
  { topic: 'Labour', name: 'Youth unemployment (15–24)', value: '17.3%', year: 2025, source: 'World Bank' },
  { topic: 'Labour', name: 'Informal employment share', value: '57.9%', year: 'Aug 2024', source: 'BPS' },
  { topic: 'Trade', name: 'Exports of goods', value: 'US$264.7 bn', year: 2024, source: 'BPS' },
  { topic: 'Trade', name: 'Imports of goods', value: 'US$233.7 bn', year: 2024, source: 'BPS' },
  { topic: 'Trade', name: 'Trade balance', value: 'US$31.0 bn surplus', year: 2024, source: 'BPS' },
  { topic: 'Trade', name: 'Current account balance', value: '−0.6% of GDP', year: 2024, source: 'IMF' },
  { topic: 'Society', name: 'Poverty rate', value: '8.57%', year: 'Sep 2024', source: 'BPS' },
  { topic: 'Society', name: 'Poverty rate', value: '8.25%', year: 'Sep 2025', source: 'BPS' },
  { topic: 'Society', name: 'People in poverty', value: '24.06 million', year: 'Sep 2024', source: 'BPS' },
  { topic: 'Society', name: 'Gini ratio', value: '0.379', year: 'Mar 2024', source: 'BPS' },
  { topic: 'Society', name: 'Adult literacy rate', value: '96.0%', year: 2023, source: 'BPS' },
  { topic: 'Society', name: 'Internet users', value: '221.6 million (79.5%)', year: 2024, source: 'APJII' },
  { topic: 'Society', name: 'Foreign visitor arrivals', value: '13.9 million', year: 2024, source: 'BPS' },
  { topic: 'Society', name: 'Expected years of schooling', value: '13.1 years', year: 2023, source: 'UNDP' },
  { topic: 'Environment', name: 'Rice production, milled', value: '30.3 million tonnes', year: 2024, source: 'BPS' },
  { topic: 'Environment', name: 'Coal production', value: '836 million tonnes', year: 2024, source: 'Ministry of Energy' },
  { topic: 'Environment', name: 'Palm oil production', value: '48 million tonnes', year: 2024, source: 'GAPKI' },
  { topic: 'Environment', name: 'Nickel mine production', value: '2.2 million tonnes', year: 2024, source: 'USGS' },
  { topic: 'Environment', name: 'Forest area', value: '94 million hectares', year: 2023, source: 'Ministry of Forestry' },
];

export const SOURCES = [
  { short: 'BPS', full: 'Statistics Indonesia (Badan Pusat Statistik)', what: 'GDP, inflation, poverty, unemployment, trade, population, HDI, visitors', note: 'National statistical office; figures as published in BPS releases and Statistical Yearbook of Indonesia.' },
  { short: 'World Bank', full: 'World Bank, World Development Indicators', what: 'Population, GDP per capita, urban share, age structure, FDI, Gini inputs', note: '2024 vintage, accessed November 2026.' },
  { short: 'IMF', full: 'International Monetary Fund, World Economic Outlook', what: 'GDP in current US$, GDP (PPP), current account', note: 'October 2025 database vintage.' },
  { short: 'Bank Indonesia', full: 'Bank Indonesia', what: 'Rupiah yearly average, policy rate', note: 'Official exchange-rate and policy-rate series.' },
  { short: 'UNDP', full: 'United Nations Development Programme', what: 'Human Development Index, expected years of schooling', note: 'Human Development Report 2023/2024.' },
  { short: 'APJII', full: 'Indonesian Internet Service Providers Association', what: 'Internet users and penetration', note: 'APJII survey 2024: 221.6 million users.' },
  { short: 'GAPKI / MEMR / USGS', full: 'Palm Oil Association, Ministry of Energy, US Geological Survey', what: 'Palm oil, coal and nickel production', note: 'Industry and government production reports for 2024.' },
];

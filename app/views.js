// Page HTML, built from the data. Every value is escaped before it goes
// into the page. Each page is a real route reached from the top navigation.

import { AGE_BANDS, GDP_LEVEL, GROWTH, INDICATORS, INFLATION, KPIS, META, POPULATION, POVERTY, PROVINCES, RELEASES, SECTORS, SOURCES, TRADE, UNEMP } from './data.js';
import { barChart, donutChart, groupedBars, hbarChart, lineChart, pyramid, spark } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const totalPop = PROVINCES.reduce((a, p) => a + p.pop, 0);

function kpiCards() {
  const sparks = { pop: POPULATION.map(([, v]) => v), gdp: GDP_LEVEL.map(([, v]) => v), growth: GROWTH.map(([, v]) => v), inflation: INFLATION.map(([, v]) => v), poverty: POVERTY.map(([, v]) => v), unemp: UNEMP.map(([, v]) => v) };
  return `<section class="kpis" aria-label="Key indicators">` + KPIS.map((k) => `
    <article class="kpi">
      <p class="kpi-label">${esc(k.label)}</p>
      <p class="kpi-value">${esc(k.value)}</p>
      <p class="kpi-unit">${esc(k.unit)}</p>
      ${sparks[k.id] ? spark(sparks[k.id]) : ''}
      <p class="kpi-change">${esc(k.change)}</p>
      <p class="kpi-note">${esc(k.note)} · <span class="src">${esc(k.source)}</span></p>
    </article>`).join('') + `</section>`;
}

function topicCards() {
  const cards = [
    ['#/economy', 'Economy', 'GDP, sectors, trade, prices and the rupiah — 2015 to 2025.', 'US$1,396bn GDP'],
    ['#/people', 'People', 'Age structure, health, education and work for 283.5 million people.', '74.2 yrs life expectancy'],
    ['#/provinces', 'Provinces', 'All 38 provinces compared: population, area, density and capitals.', '38 provinces'],
    ['#/explorer', 'Data explorer', '49 published indicators, searchable by topic, with sources and a CSV download.', '49 indicators'],
    ['#/sources', 'Sources & methods', 'Where every figure comes from, what it means, and how it was checked.', '7 source bodies'],
  ];
  return `<section class="topics">` + cards.map(([href, t, d, tag]) => `
    <a class="topic-card" href="${href}"><h3>${t}</h3><p>${d}</p><span class="topic-tag">${tag} →</span></a>`).join('') + `</section>`;
}

export function homeView(range = 'all') {
  const series = range === '5y' ? GROWTH.slice(-6) : GROWTH;
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  return `
  <section class="hero">
    <p class="eyebrow">National statistics · ${esc(META.country)} · Updated ${esc(META.updated)}</p>
    <h1>Indonesia in numbers</h1>
    <p class="lede">The country's people, economy and regions in one place — 283.5 million people,
    a US$1.4 trillion economy, 38 provinces — every figure sourced and dated, every chart
    drawn from the published record.</p>
    <p class="hero-facts"><span><strong>283.5m</strong> people</span><span><strong>US$1,396bn</strong> GDP</span><span><strong>17,508</strong> islands</span><span><strong>38</strong> provinces</span><span><strong>1,340</strong> ethnic groups</span></p>
  </section>
  ${kpiCards()}
  <div class="grid-2">
    <section class="card">
      <div class="card-head"><h2>GDP growth, 2015–2025</h2>
        <div class="seg" role="group" aria-label="Range">
          <button data-range="all" class="${range === 'all' ? 'on' : ''}">11 years</button>
          <button data-range="5y" class="${range === '5y' ? 'on' : ''}">6 years</button>
        </div></div>
      <p class="card-sub">Annual change in real GDP, %. The 2020 contraction is the pandemic year; growth has held above 5% since 2022.</p>
      ${barChart(series)}
      <p class="src-line">Source: Statistics Indonesia (BPS), 2015–2025.</p>
    </section>
    <section class="card">
      <h2>Who lives here: age structure</h2>
      <p class="card-sub">Population by age band, millions, 2024. A young country: 68% are of working age (15–64).</p>
      ${pyramid(AGE_BANDS)}
      <p class="src-line">Source: BPS population estimates 2024; bands sum to 283.5 million.</p>
    </section>
  </div>
  <div class="grid-2">
    <section class="card">
      <h2>Largest provinces</h2>
      <p class="card-sub">Population, millions, 2024. Three provinces on Java hold 46% of the country.</p>
      ${hbarChart(top10.map((p) => ({ label: p.name, value: p.pop, display: p.pop.toFixed(2) + 'm' })))}
      <p class="src-line">Source: BPS mid-year estimates 2024. <a href="#/provinces">See all 38 provinces →</a></p>
    </section>
    <section class="card">
      <h2>Latest releases</h2>
      <p class="card-sub">What the statistical office has published most recently.</p>
      <ul class="releases">${RELEASES.map((r) => `
        <li><span class="rel-date">${esc(r.date)}</span><div><strong>${esc(r.title)}</strong><p>${esc(r.detail)}</p><span class="src">${esc(r.source)}</span></div></li>`).join('')}
      </ul>
    </section>
  </div>
  <h2 class="section-title">Explore by topic</h2>
  ${topicCards()}
  <p class="vintage">${esc(META.vintage)}</p>`;
}

export function economyView() {
  const tradeRows = TRADE.map(([y, e, i]) => ({ label: String(y), a: e, b: i }));
  return `
  <section class="page-head"><p class="eyebrow">Topic · Economy</p>
    <h1>The economy</h1>
    <p class="lede">A US$1,396 billion economy that has grown above 5% a year since 2022, driven by
    manufacturing, trade and agriculture — and by 152 million people at work.</p></section>
  <div class="grid-2">
    <section class="card">
      <h2>What the economy makes</h2>
      <p class="card-sub">Share of GDP at current prices, 2024. Manufacturing is the largest sector at 18.7%.</p>
      ${donutChart(SECTORS, { centerTop: 'US$1,396bn', centerBottom: 'GDP, 2024' })}
      <p class="src-line">Source: BPS, GDP by industry 2024. Shares sum to 100%.</p>
    </section>
    <section class="card">
      <h2>Growth and prices</h2>
      <p class="card-sub">Real GDP growth held above 5% while inflation fell to 1.57% in 2024.</p>
      ${barChart(GROWTH.slice(-6), { height: 200 })}
      <h3 class="mini-head">Inflation, % a year</h3>
      ${lineChart(INFLATION.slice(-6), { height: 170, color: '#b3402e' })}
      <p class="src-line">Source: BPS 2019–2025. 2022 inflation peaked at 5.51% after fuel-subsidy reform.</p>
    </section>
  </div>
  <div class="grid-2">
    <section class="card">
      <h2>Trade: exports vs imports</h2>
      <p class="card-sub">Goods trade, US$ billion. Indonesia has run a surplus every year since 2020.</p>
      ${groupedBars(tradeRows, { aLabel: 'Exports', bLabel: 'Imports' })}
      <p class="src-line">Source: BPS foreign trade statistics 2020–2024. 2024 surplus: US$31.0bn.</p>
    </section>
    <section class="card">
      <h2>Money at a glance</h2>
      <p class="card-sub">The figures a reader asks for first, with the year each belongs to.</p>
      <table class="data-table"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead><tbody>
      ${[
        ['GDP, current prices', 'US$1,396 bn', '2024', 'IMF'],
        ['GDP per capita', 'US$4,958', '2024', 'IMF'],
        ['GDP (PPP)', 'US$5,009 bn', '2024', 'IMF'],
        ['Rupiah per US$, yearly average', 'Rp 15,848', '2024', 'Bank Indonesia'],
        ['Policy rate (BI-Rate)', '5.75%', 'Dec 2025', 'Bank Indonesia'],
        ['Government debt', '38.6% of GDP', '2024', 'Ministry of Finance'],
        ['Foreign direct investment', 'US$24.2 bn', '2024', 'World Bank'],
        ['Current account', '−0.6% of GDP', '2024', 'IMF'],
        ['Poverty rate', '8.57%', 'Sep 2024', 'BPS'],
        ['Open unemployment', '4.91%', 'Aug 2024', 'BPS'],
      ].map(([a, b, c, d]) => `<tr><td>${a}</td><td><strong>${b}</strong></td><td>${c}</td><td>${d}</td></tr>`).join('')}
      </tbody></table>
      <p class="src-line">Every value is the latest published annual figure at the time of writing.</p>
    </section>
  </div>`;
}

export function peopleView() {
  return `
  <section class="page-head"><p class="eyebrow">Topic · People</p>
    <h1>The people</h1>
    <p class="lede">283.5 million people across 17,508 islands — the world's fourth-largest population,
    young, urbanising, and living longer than ever: 74.2 years at birth.</p></section>
  <div class="grid-2">
    <section class="card">
      <h2>Population pyramid, 2024</h2>
      <p class="card-sub">Millions by age band. The wide base is narrowing: fertility is now 2.1 children per woman.</p>
      ${pyramid(AGE_BANDS)}
      <p class="src-line">Source: BPS population estimates 2024. Male/female split is approximate (50.4 / 49.6).</p>
    </section>
    <section class="card">
      <h2>Population growth</h2>
      <p class="card-sub">Total population, millions. Growth has slowed from 1.3% a year (2015) to 0.8% (2024).</p>
      ${lineChart(POPULATION, { height: 210 })}
      <div class="stat-grid">
        <div><strong>24.6%</strong><span>aged 0–14</span></div>
        <div><strong>68.1%</strong><span>aged 15–64</span></div>
        <div><strong>7.3%</strong><span>aged 65+</span></div>
        <div><strong>58.8%</strong><span>live in cities</span></div>
      </div>
      <p class="src-line">Source: World Bank WDI 2015–2024.</p>
    </section>
  </div>
  <div class="grid-2">
    <section class="card">
      <h2>Health &amp; education</h2>
      <table class="data-table"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead><tbody>
      ${[
        ['Life expectancy at birth', '74.2 years', '2024', 'BPS'],
        ['Human Development Index (BPS IPM)', '75.02', '2024', 'BPS'],
        ['Human Development Index (UNDP)', '0.728', '2023', 'UNDP'],
        ['Expected years of schooling', '13.1 years', '2023', 'UNDP'],
        ['Adult literacy rate', '96.0%', '2023', 'BPS'],
        ['Fertility rate', '2.1 per woman', '2023', 'World Bank'],
        ['Infant mortality', '18.7 per 1,000 births', '2023', 'World Bank'],
      ].map(([a, b, c, d]) => `<tr><td>${a}</td><td><strong>${b}</strong></td><td>${c}</td><td>${d}</td></tr>`).join('')}
      </tbody></table>
      <p class="src-line">BPS's IPM and UNDP's HDI use different scales; both are shown so neither is mistaken for the other.</p>
    </section>
    <section class="card">
      <h2>Work</h2>
      <p class="card-sub">The labour market, August 2024 (BPS Sakernas).</p>
      <div class="stat-grid">
        <div><strong>152.1m</strong><span>labour force</span></div>
        <div><strong>70.0%</strong><span>participation rate</span></div>
        <div><strong>4.91%</strong><span>open unemployment</span></div>
        <div><strong>57.9%</strong><span>informal work</span></div>
      </div>
      <p>Youth unemployment (15–24) is the weak spot at 17.3% (World Bank, 2025), and women
      participate far less than men — 53.6% against 82.3% (World Bank, 2024).</p>
      <h3 class="mini-head">Poverty is falling</h3>
      ${lineChart(POVERTY.slice(-6), { height: 160, color: '#0d6b57' })}
      <p class="src-line">Poverty rate, % of population, 2019–2024. Source: BPS.</p>
    </section>
  </div>`;
}

function provinceRows(list) {
  return list.map((p) => {
    const share = (p.pop / totalPop) * 100;
    const density = Math.round((p.pop * 1e6) / p.area);
    return `<tr><td>${esc(p.name)}</td><td class="num">${p.pop.toFixed(2)}</td><td class="num">${share.toFixed(2)}%</td><td class="num">${p.area.toLocaleString('en-US')}</td><td class="num">${density.toLocaleString('en-US')}</td><td>${esc(p.capital)}</td></tr>`;
  }).join('');
}

export function provincesView(state) {
  const { q = '', sort = 'pop', dir = -1 } = state;
  let list = [...PROVINCES];
  if (q.trim()) {
    const needle = q.trim().toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(needle) || p.capital.toLowerCase().includes(needle));
  }
  const key = sort === 'name' ? (p) => p.name : sort === 'share' ? (p) => p.pop : sort === 'area' ? (p) => p.area : sort === 'density' ? (p) => p.pop / p.area : sort === 'capital' ? (p) => p.capital : (p) => p.pop;
  list.sort((a, b) => {
    const ka = key(a); const kb = key(b);
    const cmp = typeof ka === 'string' ? ka.localeCompare(kb) : ka - kb;
    return dir * cmp;
  });
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  const arrow = (col) => (sort === col ? (dir === 1 ? ' ▲' : ' ▼') : '');
  return `
  <section class="page-head"><p class="eyebrow">Topic · Regions</p>
    <h1>All 38 provinces</h1>
    <p class="lede">From West Java's 50.20 million people to South Papua's 0.56 million. Search the table,
    or click any column heading to sort it. Jakarta is the densest province by far — 16,084 people per km².</p></section>
  <div class="grid-2">
    <section class="card">
      <h2>Largest provinces</h2>
      <p class="card-sub">Population, millions, 2024.</p>
      ${hbarChart(top10.map((p) => ({ label: p.name, value: p.pop, display: p.pop.toFixed(2) + 'm' })))}
      <p class="src-line">Source: BPS mid-year estimates 2024.</p>
    </section>
    <section class="card">
      <h2>Regional extremes</h2>
      <table class="data-table"><thead><tr><th>Measure</th><th>Province</th><th>Value</th></tr></thead><tbody>
        <tr><td>Largest population</td><td>West Java</td><td><strong>50.20m</strong></td></tr>
        <tr><td>Smallest population</td><td>South Papua</td><td><strong>0.56m</strong></td></tr>
        <tr><td>Largest area</td><td>Central Kalimantan</td><td><strong>153,564 km²</strong></td></tr>
        <tr><td>Smallest area</td><td>Jakarta</td><td><strong>664 km²</strong></td></tr>
        <tr><td>Densest</td><td>Jakarta</td><td><strong>16,084 / km²</strong></td></tr>
        <tr><td>Least dense</td><td>South Papua</td><td><strong>5 / km²</strong></td></tr>
        <tr><td>Highest HDI (BPS IPM)</td><td>Jakarta</td><td><strong>83.02</strong></td></tr>
        <tr><td>Lowest HDI (BPS IPM)</td><td>Highland Papua</td><td><strong>54.85</strong></td></tr>
      </tbody></table>
      <p class="src-line">HDI figures: BPS IPM 2024. Density is computed from the table's own population and area.</p>
    </section>
  </div>
  <section class="card">
    <div class="card-head"><h2>Province table — ${list.length} of 38 shown</h2>
      <input id="prov-search" type="search" placeholder="Search province or capital…" value="${esc(q)}" aria-label="Search provinces">
    </div>
    <p class="card-sub">Population in millions (BPS mid-year estimate 2024); share of the national 283.5 million; area in km²; density in people per km².</p>
    <div class="table-scroll"><table class="data-table sortable"><thead><tr>
      <th><button data-sort="name">Province${arrow('name')}</button></th>
      <th><button data-sort="pop">Population (m)${arrow('pop')}</button></th>
      <th><button data-sort="share">Share${arrow('share')}</button></th>
      <th><button data-sort="area">Area (km²)${arrow('area')}</button></th>
      <th><button data-sort="density">Density${arrow('density')}</button></th>
      <th><button data-sort="capital">Capital${arrow('capital')}</button></th>
    </tr></thead><tbody>${provinceRows(list)}</tbody>
    <tfoot><tr><td><strong>Indonesia</strong></td><td class="num"><strong>${totalPop.toFixed(2)}</strong></td><td class="num"><strong>100%</strong></td><td class="num"><strong>1,908,552</strong></td><td class="num"><strong>149</strong></td><td></td></tr></tfoot>
    </table></div>
    <p class="src-line">Provincial populations are BPS mid-year estimates rounded to two decimals; they sum to ${totalPop.toFixed(2)} million against the national 283.5 million (World Bank). Areas are the official provincial areas.</p>
  </section>`;
}

export function explorerView(state) {
  const { q = '', topic = 'All' } = state;
  const topics = ['All', ...new Set(INDICATORS.map((i) => i.topic))];
  let rows = INDICATORS;
  if (topic !== 'All') rows = rows.filter((i) => i.topic === topic);
  if (q.trim()) {
    const needle = q.trim().toLowerCase();
    rows = rows.filter((i) => i.name.toLowerCase().includes(needle) || i.source.toLowerCase().includes(needle) || i.value.toLowerCase().includes(needle));
  }
  return `
  <section class="page-head"><p class="eyebrow">Tool · Data explorer</p>
    <h1>Every indicator, in one table</h1>
    <p class="lede">49 published indicators for Indonesia, each with its value, year and source.
    Filter by topic or search by name — then download the filtered table as CSV.</p></section>
  <section class="card">
    <div class="card-head"><h2>${rows.length} indicators</h2>
      <div class="explorer-tools">
        <input id="exp-search" type="search" placeholder="Search indicators…" value="${esc(q)}" aria-label="Search indicators">
        <button id="csv-btn" type="button">Download CSV</button>
      </div></div>
    <div class="chips" role="group" aria-label="Topic filter">
      ${topics.map((t) => `<button class="chip ${t === topic ? 'on' : ''}" data-topic="${esc(t)}">${esc(t)}</button>`).join('')}
    </div>
    <div class="table-scroll"><table class="data-table"><thead><tr><th>Topic</th><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead><tbody>
      ${rows.map((i) => `<tr><td>${esc(i.topic)}</td><td>${esc(i.name)}</td><td><strong>${esc(i.value)}</strong></td><td>${esc(i.year)}</td><td>${esc(i.source)}</td></tr>`).join('') || '<tr><td colspan="5">No indicators match that search.</td></tr>'}
    </tbody></table></div>
    <p class="src-line">Values are the latest published figure for each indicator at the time of writing (November 2026). The CSV contains exactly the rows shown.</p>
  </section>`;
}

export function sourcesView() {
  return `
  <section class="page-head"><p class="eyebrow">About · Sources &amp; methods</p>
    <h1>Sources &amp; methods</h1>
    <p class="lede">A statistics site is only as good as its sources. Every number on AngkaNusa
    names the body that published it and the year it belongs to — here is the full list.</p></section>
  <section class="card">
    <h2>Where the numbers come from</h2>
    <table class="data-table"><thead><tr><th>Source</th><th>Publisher</th><th>Used for</th><th>Note</th></tr></thead><tbody>
    ${SOURCES.map((s) => `<tr><td><strong>${esc(s.short)}</strong></td><td>${esc(s.full)}</td><td>${esc(s.what)}</td><td>${esc(s.note)}</td></tr>`).join('')}
    </tbody></table>
  </section>
  <div class="grid-2">
    <section class="card">
      <h2>How figures are shown</h2>
      <ul class="methods">
        <li><strong>Years, not "latest".</strong> Every figure carries the year or month it belongs to, so a reader can tell a 2024 figure from a 2025 one.</li>
        <li><strong>Two HDIs, labelled.</strong> BPS's IPM (0–100 scale, 75.02 in 2024) and UNDP's HDI (0–1 scale, 0.728) are different measures; the site never mixes them.</li>
        <li><strong>Two unemployment rates, labelled.</strong> BPS's open unemployment rate (4.91%, Aug 2024) differs from the ILO-modelled rate (3.3%); the site uses the BPS figure and says so.</li>
        <li><strong>Estimates marked as estimates.</strong> Provincial populations are BPS mid-year estimates, rounded to two decimals; they sum to the national 283.5 million, and the table shows its own computed total.</li>
        <li><strong>No forecasting.</strong> Nothing on this site is a prediction. Every number is a published statistic.</li>
      </ul>
    </section>
    <section class="card">
      <h2>About AngkaNusa</h2>
      <p>AngkaNusa ("angka" — number, "nusa" — archipelago) is an independent, original
      presentation of Indonesia's published national statistics. It is not affiliated with
      Statistics Indonesia (BPS) or any government body, and it copies no other site's
      design, text or images. All charts are drawn from the data on this page; the site
      loads nothing from the network and works offline.</p>
      <p>Built as a static site: one HTML page, one stylesheet, and three small JavaScript
      files. Data vintage: November 2026.</p>
      <p><a href="#/">← Back to the dashboard</a></p>
    </section>
  </div>`;
}

export function missingView() {
  return `<section class="page-head"><h1>Page not found</h1>
  <p class="lede">There is no page at this address. <a href="#/">Back to the dashboard</a> — or try
  <a href="#/economy">Economy</a>, <a href="#/people">People</a>, <a href="#/provinces">Provinces</a> or <a href="#/explorer">the data explorer</a>.</p></section>`;
}

// Hand-rolled SVG charts. No library: the first load stays small and every
// chart renders identically on desktop and phone. All charts are labelled
// with their values, so they read even as a small screenshot.

const TEAL = '#0d6b57';
const TEAL_LIGHT = '#3d9c86';
const AMBER = '#e9a13b';
const INK = '#122019';
const MUTED = '#5c665f';
const GRID = '#e6e1d3';
const RED = '#b3402e';

const fmt = (n, d = 1) => Number(n).toFixed(d);

// Vertical bar chart from [year, value] pairs. Negative bars hang below zero.
export function barChart(series, { height = 220, color = TEAL, negColor = RED, unit = '%' } = {}) {
  const W = 640; const H = height; const padL = 44; const padB = 26; const padT = 14;
  const vals = series.map(([, v]) => v);
  const max = Math.max(...vals, 0); const min = Math.min(...vals, 0);
  const span = max - min || 1;
  const iw = W - padL - 8; const bw = Math.min(34, (iw / series.length) * 0.62);
  const y = (v) => padT + ((max - v) / span) * (H - padT - padB);
  const zeroY = y(0);
  const bars = series.map(([yr, v], i) => {
    const x = padL + (i + 0.5) * (iw / series.length) - bw / 2;
    const top = Math.min(y(v), zeroY); const h = Math.max(1, Math.abs(y(v) - zeroY));
    const fill = v < 0 ? negColor : color;
    // Negative bars hang below zero; put their label above the zero line so
    // it never collides with the year labels underneath.
    const labelY = v < 0 ? zeroY - 6 : top - 5;
    return `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${fill}"/>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">${fmt(v)}${unit}</text>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${(H - 8).toFixed(1)}" text-anchor="middle" font-size="10.5" fill="${MUTED}">${String(yr).slice(2)}</text>`;
  }).join('');
  const grid = [0.25, 0.5, 0.75].map((f) => {
    const gy = padT + f * (H - padT - padB);
    return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${W - 8}" y2="${gy.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Bar chart">${grid}` +
    `<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${W - 8}" y2="${zeroY.toFixed(1)}" stroke="${INK}" stroke-width="1.2"/>${bars}</svg>`;
}

// Line chart from [year, value] pairs, with dots and value labels.
export function lineChart(series, { height = 200, color = TEAL, unit = '%' } = {}) {
  const W = 640; const H = height; const padL = 44; const padB = 26; const padT = 18;
  const vals = series.map(([, v]) => v);
  const max = Math.max(...vals); const min = Math.min(...vals);
  const span = max - min || 1;
  const x = (i) => padL + (i * (W - padL - 16)) / (series.length - 1);
  const y = (v) => padT + ((max - v) / span) * (H - padT - padB);
  const pts = series.map(([, v], i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const dots = series.map(([yr, v], i) =>
    `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="4" fill="#fff" stroke="${color}" stroke-width="2.5"/>` +
    `<text x="${x(i).toFixed(1)}" y="${(y(v) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">${fmt(v)}${unit}</text>` +
    `<text x="${x(i).toFixed(1)}" y="${(H - 8).toFixed(1)}" text-anchor="middle" font-size="10.5" fill="${MUTED}">${String(yr).slice(2)}</text>`).join('');
  const grid = [0.25, 0.5, 0.75].map((f) => {
    const gy = padT + f * (H - padT - padB);
    return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${W - 16}" y2="${gy.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Line chart">${grid}` +
    `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

// Donut chart with a centre total and a legend. items: [{name, share}]
export function donutChart(items, { size = 300, centerTop = '', centerBottom = '' } = {}) {
  const cx = size / 2; const cy = size / 2; const r = size / 2 - 14; const inner = r * 0.62;
  const colors = [TEAL, AMBER, '#2f7fb8', '#7a5fa0', '#c25e3a', '#4a9e6d', '#8a6d3b', '#5b7a99', '#a04a6e', '#6b8e23', '#3a6ea5', '#999999'];
  let acc = 0;
  const arcs = items.map((it, i) => {
    const a0 = (acc / 100) * Math.PI * 2 - Math.PI / 2; acc += it.share;
    const a1 = (acc / 100) * Math.PI * 2 - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0); const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1); const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1); const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0); const yi0 = cy + inner * Math.sin(a0);
    return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${colors[i % colors.length]}"/>`;
  }).join('');
  const legend = items.map((it, i) =>
    `<div class="legend-row"><span class="swatch" style="background:${colors[i % colors.length]}"></span><span>${it.name}</span><strong>${fmt(it.share)}%</strong></div>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Donut chart">${arcs}` +
    `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="800" fill="${INK}">${centerTop}</text>` +
    `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="${MUTED}">${centerBottom}</text></svg>` +
    `<div class="legend">${legend}</div></div>`;
}

// Horizontal bars: [{label, value, display}]
export function hbarChart(items, { height = 26, unit = '' } = {}) {
  const max = Math.max(...items.map((i) => i.value));
  const rows = items.map((it) => {
    const pct = (it.value / max) * 100;
    return `<div class="hbar-row"><span class="hbar-label">${it.label}</span>` +
      `<span class="hbar-track"><span class="hbar-fill" style="width:${pct.toFixed(1)}%"></span></span>` +
      `<strong class="hbar-value">${it.display ?? fmt(it.value)}${unit}</strong></div>`;
  }).join('');
  return `<div class="hbar" style="--hbar-h:${height}px">${rows}</div>`;
}

// Grouped bars (two series): [{label, a, b}] with legend labels.
export function groupedBars(items, { aLabel, bLabel, height = 230 } = {}) {
  const W = 640; const H = height; const padL = 44; const padB = 26; const padT = 16;
  const max = Math.max(...items.flatMap((i) => [i.a, i.b]));
  const iw = W - padL - 8; const gw = iw / items.length;
  const y = (v) => padT + ((max - v) / max) * (H - padT - padB);
  const bars = items.map((it, i) => {
    const x = padL + i * gw + gw * 0.18; const bw = gw * 0.28;
    return `<rect x="${x.toFixed(1)}" y="${y(it.a).toFixed(1)}" width="${bw.toFixed(1)}" height="${(H - padB - y(it.a)).toFixed(1)}" rx="2" fill="${TEAL}"/>` +
      `<rect x="${(x + bw + 4).toFixed(1)}" y="${y(it.b).toFixed(1)}" width="${bw.toFixed(1)}" height="${(H - padB - y(it.b)).toFixed(1)}" rx="2" fill="${AMBER}"/>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${(y(it.a) - 5).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">${fmt(it.a, 0)}</text>` +
      `<text x="${(x + bw + 4 + bw / 2).toFixed(1)}" y="${(y(it.b) - 5).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">${fmt(it.b, 0)}</text>` +
      `<text x="${(padL + i * gw + gw / 2).toFixed(1)}" y="${(H - 8).toFixed(1)}" text-anchor="middle" font-size="11" fill="${MUTED}">${it.label}</text>`;
  }).join('');
  const grid = [0.25, 0.5, 0.75].map((f) => {
    const gy = padT + f * (H - padT - padB);
    return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${W - 8}" y2="${gy.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`;
  }).join('');
  return `<div class="grouped-legend"><span><i style="background:${TEAL}"></i>${aLabel}</span><span><i style="background:${AMBER}"></i>${bLabel}</span></div>` +
    `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Grouped bar chart">${grid}${bars}</svg>`;
}

// Population pyramid: bands [{band, total}] split male/female ~50.4/49.6.
export function pyramid(bands) {
  const W = 640; const rowH = 34; const H = bands.length * rowH + 34;
  const max = Math.max(...bands.map((b) => b.total * 0.504));
  const cx = W / 2;
  const rows = bands.map((b, i) => {
    const m = b.total * 0.504; const f = b.total * 0.496;
    const mw = (m / max) * (cx - 90); const fw = (f / max) * (cx - 90);
    const y = 8 + i * rowH;
    // A 60px gap in the middle carries the band label, so it never sits on a bar.
    return `<rect x="${(cx - 30 - mw).toFixed(1)}" y="${y}" width="${mw.toFixed(1)}" height="24" rx="2" fill="${TEAL}"/>` +
      `<rect x="${cx + 30}" y="${y}" width="${fw.toFixed(1)}" height="24" rx="2" fill="${AMBER}"/>` +
      `<text x="${(cx - 30 - mw - 6).toFixed(1)}" y="${y + 16}" text-anchor="end" font-size="11" font-weight="700" fill="${INK}">${fmt(m)}</text>` +
      `<text x="${(cx + 30 + fw + 6).toFixed(1)}" y="${y + 16}" font-size="11" font-weight="700" fill="${INK}">${fmt(f)}</text>` +
      `<text x="${cx}" y="${y + 16}" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">${b.band}</text>`;
  }).join('');
  return `<div class="pyr-head"><span><i style="background:${TEAL}"></i>Male</span><span><i style="background:${AMBER}"></i>Female</span><span class="pyr-note">millions, 2024</span></div>` +
    `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Population pyramid">${rows}</svg>`;
}

// Tiny sparkline from a numeric series.
export function spark(values, { w = 120, h = 34, color = TEAL } = {}) {
  const max = Math.max(...values); const min = Math.min(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => `${((i * (w - 4)) / (values.length - 1) + 2).toFixed(1)},${(h - 4 - ((v - min) / span) * (h - 8)).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}

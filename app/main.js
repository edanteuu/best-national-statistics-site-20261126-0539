// AngkaNusa router. Hash routes, one page each; every control on every page
// works without the network. window.__shotReady is false while a page renders
// and true once it is on screen, so a screenshot script knows when to capture.
//
//   #/                dashboard
//   #/economy         the economy
//   #/people          the people
//   #/provinces       all 38 provinces
//   #/explorer        data explorer
//   #/sources         sources & methods

import { INDICATORS } from './data.js';
import { economyView, explorerView, homeView, missingView, peopleView, provincesView, sourcesView } from './views.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.nav a')];

let homeRange = 'all';
let provState = { q: '', sort: 'pop', dir: -1 };
let expState = { q: '', topic: 'All' };

function route() {
  const hash = location.hash || '#/';
  const path = hash.replace(/^#\/?/, '').split('?')[0];
  return path === '' ? 'home' : path;
}

function render() {
  window.__shotReady = false;
  const page = route();
  const titles = {
    home: 'AngkaNusa — Indonesia in Numbers',
    economy: 'The Economy | AngkaNusa',
    people: 'The People | AngkaNusa',
    provinces: 'All 38 Provinces | AngkaNusa',
    explorer: 'Data Explorer | AngkaNusa',
    sources: 'Sources & Methods | AngkaNusa',
  };
  document.title = titles[page] ?? 'AngkaNusa — Indonesia in Numbers';
  navLinks.forEach((a) => a.classList.toggle('on', a.dataset.page === page));
  if (page === 'home') app.innerHTML = homeView(homeRange);
  else if (page === 'economy') app.innerHTML = economyView();
  else if (page === 'people') app.innerHTML = peopleView();
  else if (page === 'provinces') app.innerHTML = provincesView(provState);
  else if (page === 'explorer') app.innerHTML = explorerView(expState);
  else if (page === 'sources') app.innerHTML = sourcesView();
  else app.innerHTML = missingView();
  bindPage(page);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function bindPage(page) {
  if (page === 'home') {
    app.querySelectorAll('.seg button').forEach((b) => {
      b.addEventListener('click', () => { homeRange = b.dataset.range; render(); });
    });
  }
  if (page === 'provinces') {
    const search = document.getElementById('prov-search');
    search.addEventListener('input', () => {
      provState.q = search.value;
      const pos = search.selectionStart;
      render();
      const again = document.getElementById('prov-search');
      again.focus(); again.setSelectionRange(pos, pos);
    });
    app.querySelectorAll('[data-sort]').forEach((b) => {
      b.addEventListener('click', () => {
        const col = b.dataset.sort;
        if (provState.sort === col) provState.dir *= -1;
        else { provState.sort = col; provState.dir = col === 'name' || col === 'capital' ? 1 : -1; }
        render();
      });
    });
  }
  if (page === 'explorer') {
    const search = document.getElementById('exp-search');
    search.addEventListener('input', () => {
      expState.q = search.value;
      const pos = search.selectionStart;
      render();
      const again = document.getElementById('exp-search');
      again.focus(); again.setSelectionRange(pos, pos);
    });
    app.querySelectorAll('[data-topic]').forEach((b) => {
      b.addEventListener('click', () => { expState.topic = b.dataset.topic; render(); });
    });
    document.getElementById('csv-btn').addEventListener('click', () => {
      const rows = [['Topic', 'Indicator', 'Value', 'Year', 'Source']];
      let list = INDICATORS;
      if (expState.topic !== 'All') list = list.filter((i) => i.topic === expState.topic);
      if (expState.q.trim()) {
        const n = expState.q.trim().toLowerCase();
        list = list.filter((i) => (i.name + i.source + i.value).toLowerCase().includes(n));
      }
      list.forEach((i) => rows.push([i.topic, i.name, i.value, String(i.year), i.source]));
      const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'angkanusa-indicators.csv';
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }
}

window.addEventListener('hashchange', render);
render();

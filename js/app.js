/* Logique : catégories, recherche, favoris, récents, clavier */
var U = BMS.ui, S = BMS.store;
var favs = S.get('favs', []);
var recents = S.get('recents', []);
var current = 'all';
var shown = [];      // éléments affichés (pour la navigation clavier)
var sel = -1;

// Liste à plat de tous les sites
var all = [];
BMS.cats.forEach(function (c) {
	c.sites.forEach(function (s) {
		all.push({ n: s.n, u: s.u, i: s.i || c.icon || '🌐', c: c.name });
	});
});

function byUrl(u) { return all.filter(function (x) { return x.u === u; })[0]; }

function esc(t) {
	return String(t).replace(/[&<>"]/g, function (c) {
		return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
	});
}

/* ---------- Barre latérale ---------- */
var tabs = [];
function addTab(key, label, count) {
	var b = document.createElement('button');
	b.className = 'cat';
	b.innerHTML = '<span>' + esc(label) + '</span><small></small>';
	b.onclick = function () { current = key; U.input.value = ''; render(); };
	U.side.appendChild(b);
	tabs.push({ key: key, el: b, count: count });
}
function sep() { var d = document.createElement('div'); d.className = 'sep'; U.side.appendChild(d); }

addTab('all', '🏠 Tout', function () { return all.length; });
addTab('fav', '⭐ Favoris', function () { return favs.length; });
addTab('recent', '🕘 Récents', function () { return recents.length; });
sep();
BMS.cats.forEach(function (c) {
	addTab(c.name, (c.icon || '📂') + ' ' + c.name, function () { return c.sites.length; });
});

function refreshTabs() {
	tabs.forEach(function (t) {
		t.el.classList.toggle('on', t.key === current && !U.input.value.trim());
		t.el.lastChild.textContent = t.count();
	});
}

/* ---------- Rendu ---------- */
function getItems() {
	var q = U.input.value.trim().toLowerCase();
	if (q) {
		U.title.textContent = 'Résultats pour « ' + U.input.value.trim() + ' »';
		return all.filter(function (s) {
			return s.n.toLowerCase().indexOf(q) > -1 || s.u.toLowerCase().indexOf(q) > -1;
		});
	}
	var items;
	if (current === 'all') { items = all; U.title.textContent = 'Tous les sites'; }
	else if (current === 'fav') { items = favs.map(byUrl).filter(Boolean); U.title.textContent = 'Favoris'; }
	else if (current === 'recent') { items = recents.map(byUrl).filter(Boolean); U.title.textContent = 'Ouverts récemment'; }
	else { items = all.filter(function (s) { return s.c === current; }); U.title.textContent = current; }
	return items;
}

function render() {
	shown = getItems();
	sel = -1;
	refreshTabs();
	U.grid.innerHTML = '';

	if (!shown.length) {
		var msg = current === 'fav' ? 'Pas encore de favoris : clique sur ☆ sur un site.'
			: current === 'recent' ? 'Rien d\'ouvert pour le moment.'
			: 'Aucun site trouvé.';
		U.grid.innerHTML = '<div class="empty">' + msg + '</div>';
		return;
	}

	var frag = document.createDocumentFragment();
	shown.forEach(function (s, idx) {
		var isFav = favs.indexOf(s.u) > -1;
		var d = document.createElement('div');
		d.className = 'card';
		d.tabIndex = 0;
		d.dataset.idx = idx;
		d.innerHTML =
			'<button class="star' + (isFav ? ' on' : '') + '" title="Favori">' + (isFav ? '★' : '☆') + '</button>' +
			'<span class="ic">' + esc(s.i) + '</span><span class="nm">' + esc(s.n) + '</span>';
		frag.appendChild(d);
	});
	U.grid.appendChild(frag);
}

/* ---------- Actions ---------- */
function openSite(s) {
	recents = [s.u].concat(recents.filter(function (u) { return u !== s.u; })).slice(0, 12);
	S.set('recents', recents);
	if (U.same.checked) location.href = s.u;
	else { window.open(s.u, '_blank'); refreshTabs(); }
}

function toggleFav(s) {
	var i = favs.indexOf(s.u);
	if (i > -1) favs.splice(i, 1); else favs.push(s.u);
	S.set('favs', favs);
	render();
}

function select(i) {
	var cards = U.grid.querySelectorAll('.card');
	if (!cards.length) return;
	sel = (i + cards.length) % cards.length;
	cards.forEach(function (c) { c.classList.remove('sel'); });
	cards[sel].classList.add('sel');
	cards[sel].scrollIntoView({ block: 'nearest' });
}

function close() {
	document.removeEventListener('keydown', onKey, true);
	U.host.remove();
}

/* ---------- Événements ---------- */
U.grid.addEventListener('click', function (e) {
	var card = e.target.closest('.card');
	if (!card) return;
	var s = shown[+card.dataset.idx];
	if (e.target.closest('.star')) toggleFav(s); else openSite(s);
});

U.input.addEventListener('input', render);
U.closeBtn.onclick = close;

/* ---------- Plein écran ---------- */
var full = false;
function setFull(on) {
	full = on;
	U.win.classList.toggle('full', on);
	U.fsBtn.textContent = on ? '❐' : '⛶';
	U.fsBtn.title = on ? 'Quitter le plein écran' : 'Plein écran';
}
U.fsBtn.onclick = function () { setFull(!full); };
U.bar.addEventListener('dblclick', function (e) {
	if (!e.target.closest('button')) setFull(!full);
});

/* ---------- Déplacement (souris + tactile) ---------- */
var dragging = false, dx = 0, dy = 0;
U.bar.addEventListener('pointerdown', function (e) {
	if (full || e.button > 0 || e.target.closest('button')) return;
	dragging = true;
	dx = e.clientX - U.win.offsetLeft;
	dy = e.clientY - U.win.offsetTop;
	U.bar.setPointerCapture(e.pointerId);
	U.bar.classList.add('drag');
});
U.bar.addEventListener('pointermove', function (e) {
	if (!dragging) return;
	var de = document.documentElement;
	var x = Math.min(Math.max(e.clientX - dx, 80 - U.win.offsetWidth), de.clientWidth - 80);
	var y = Math.min(Math.max(e.clientY - dy, 0), de.clientHeight - 40);
	U.win.style.left = x + 'px';
	U.win.style.top = y + 'px';
});
function stopDrag() { dragging = false; U.bar.classList.remove('drag'); }
U.bar.addEventListener('pointerup', stopDrag);
U.bar.addEventListener('pointercancel', stopDrag);

function onKey(e) {
	var k = e.key;
	if (k === 'Escape') { e.stopPropagation(); if (full) setFull(false); else close(); return; }
	if (k === 'Enter') {
		var s = shown[sel > -1 ? sel : 0];
		if (s) { e.preventDefault(); openSite(s); }
	} else if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); select(sel + 1); }
	else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); select(sel - 1); }
}
document.addEventListener('keydown', onKey, true);

render();
setTimeout(function () { U.input.focus(); }, 30);

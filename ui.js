// ui.js : variables communes, helpers et menus (charge en premier)

if (window.__pm) window.__pm();

var TXT = '#fff',
	BG = '#282828',
	Z = 2147483646,
	ac = new AbortController(),
	opt = { signal: ac.signal, capture: true },
	menus = [],
	cur, mx = 0, my = 0,
	main, jeux, video, param;

function el(t, css, txt, p) {
	var e = document.createElement(t);
	Object.assign(e.style, css);
	if (txt) e.textContent = txt;
	if (p) p.appendChild(e);
	return e;
}

function ib(p, t, fn, hov) {
	var b = el('button', {
		background: 'transparent',
		border: 'none',
		color: TXT,
		fontSize: '18px',
		fontWeight: 'bold',
		cursor: 'pointer',
		padding: '0',
		marginLeft: '10px'
	}, t, p);
	b.onclick = fn;
	b.onmouseenter = function () { b.style.color = hov; };
	b.onmouseleave = function () { b.style.color = TXT; };
	return b;
}

function closeMenus() {
	menus.forEach(function (m) { m.style.display = 'none'; });
}

function go(a, b) {
	b.style.left = a.style.left;
	b.style.top = a.style.top;
	a.style.display = 'none';
	b.style.display = 'block';
}

function menu(title, items, sub) {
	var m = el('div', {
		position: 'fixed',
		top: '80px',
		left: '80px',
		width: '300px',
		boxSizing: 'border-box',
		background: BG,
		color: TXT,
		borderRadius: '8px',
		boxShadow: '0 5px 15px rgba(255,255,255,.3)',
		padding: '20px',
		zIndex: Z,
		display: 'none',
		font: '14px sans-serif'
	}, 0, document.body);

	var h = el('div', {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	}, 0, m);
	el('h3', { margin: '0' }, title, h);

	var b = el('div', { display: 'flex' }, 0, h);
	if (sub) ib(b, '\u2B05', function () { go(m, main); }, '#4caf50');
	ib(b, '\u2715', closeMenus, '#f44336');

	el('hr', {
		border: 'none',
		borderTop: '1px solid rgba(255,255,255,.3)',
		margin: '15px 0'
	}, 0, m);

	var list = el('div', {
		display: 'flex',
		flexDirection: 'column',
		gap: '10px'
	}, 0, m);

	items.forEach(function (i) {
		var x = el('button', {
			padding: '10px',
			border: 'none',
			borderRadius: '5px',
			background: i[1],
			color: TXT,
			cursor: 'pointer',
			fontSize: '14px'
		}, i[0], list);
		x.onclick = i[2];
	});

	menus.push(m);
	return m;
}

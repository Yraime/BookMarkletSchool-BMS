// window.js : fenetre iframe deplacable / redimensionnable

function drag(c, h, move) {
	h.addEventListener('pointerdown', function (e) {
		if (document.fullscreenElement || e.target.tagName === 'BUTTON') return;
		var x = e.clientX,
			y = e.clientY,
			r = c.getBoundingClientRect();
		function mv(v) { move(v.clientX - x, v.clientY - y, r); }
		h.setPointerCapture(e.pointerId);
		h.addEventListener('pointermove', mv);
		h.addEventListener('lostpointercapture', function () {
			h.removeEventListener('pointermove', mv);
		}, { once: true });
		e.preventDefault();
	});
}

function openWin(name, url, w, h) {
	closeMenus();
	if (cur) cur.remove();
	w = Math.min(w, innerWidth);
	h = Math.min(h, innerHeight);

	var c = cur = el('div', {
		position: 'fixed',
		left: (innerWidth - w) / 2 + 'px',
		top: (innerHeight - h) / 2 + 'px',
		width: w + 'px',
		height: h + 'px',
		background: '#1e1e1e',
		borderRadius: '10px',
		boxShadow: '0 5px 20px rgba(0,0,0,.5)',
		zIndex: Z + 1,
		display: 'flex',
		flexDirection: 'column',
		boxSizing: 'border-box',
		overflow: 'hidden',
		userSelect: 'none'
	}, 0, document.body);

	var bar = el('div', {
		height: '30px',
		flex: 'none',
		background: BG,
		color: TXT,
		display: 'flex',
		alignItems: 'center',
		padding: '0 10px',
		cursor: 'move',
		font: 'bold 14px sans-serif',
		touchAction: 'none'
	}, 0, c);

	el('span', { flex: '1' }, name, bar);

	ib(bar, '\u26F6', function () {
		document.fullscreenElement ? document.exitFullscreen() : c.requestFullscreen();
	}, '#4caf50');
	ib(bar, '\u2715', function () { c.remove(); }, '#f44336');

	var f = el('iframe', { flex: '1', minHeight: '0', border: 'none' }, 0, c);
	f.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-pointer-lock');
	f.allow = 'autoplay; fullscreen; gamepad';
	f.allowFullscreen = true;
	f.src = url;

	var rz = el('div', {
		position: 'absolute',
		right: '0',
		bottom: '0',
		width: '16px',
		height: '16px',
		cursor: 'nwse-resize',
		touchAction: 'none',
		zIndex: 1
	}, 0, c);

	drag(c, bar, function (dx, dy, r) {
		c.style.left = Math.max(0, Math.min(innerWidth - r.width, r.left + dx)) + 'px';
		c.style.top = Math.max(0, Math.min(innerHeight - r.height, r.top + dy)) + 'px';
	});
	drag(c, rz, function (dx, dy, r) {
		c.style.width = Math.max(300, Math.min(innerWidth - r.left, r.width + dx)) + 'px';
		c.style.height = Math.max(200, Math.min(innerHeight - r.top, r.height + dy)) + 'px';
	});
}

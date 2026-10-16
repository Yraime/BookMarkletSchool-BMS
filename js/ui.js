/* Construit la fenêtre (Shadow DOM) et expose les éléments dans BMS.ui */
var host = document.createElement('div');
host.id = BMS.id;
host.style.cssText = 'position:fixed;inset:0;z-index:2147483647;';
var root = host.attachShadow({ mode: 'open' });

root.innerHTML =
	'<style>' + BMS.css + '</style>' +
	'<div class="bg"></div>' +
	'<div class="win" role="dialog" aria-label="Launcher">' +
		'<div class="bar">' +
			'<span class="brand">🚀 BMS</span>' +
			'<span class="grip">Glisse pour déplacer • double-clic : plein écran</span>' +
			'<div class="btns">' +
				'<button class="fs" title="Plein écran">⛶</button>' +
				'<button class="x" title="Fermer (Échap)">✕</button>' +
			'</div>' +
		'</div>' +
		'<div class="body">' +
			'<nav class="side"></nav>' +
			'<div class="main">' +
				'<div class="top"><input class="search" placeholder="Rechercher un site…" autocomplete="off"></div>' +
				'<div class="title"></div>' +
				'<div class="grid"></div>' +
				'<div class="foot"><span>Entrée : ouvrir • ↑ ↓ ← → : naviguer • Échap : fermer</span>' +
					'<label><input type="checkbox" class="same"> Même onglet</label></div>' +
			'</div>' +
		'</div>' +
	'</div>';

function $(s) { return root.querySelector(s); }

BMS.ui = {
	host: host, root: root,
	win: $('.win'), bar: $('.bar'),
	side: $('.side'), grid: $('.grid'), title: $('.title'),
	input: $('.search'), same: $('.same'),
	closeBtn: $('.x'), fsBtn: $('.fs')
};
document.body.appendChild(host);

// Centre la fenêtre à l'ouverture
var de = document.documentElement;
BMS.ui.win.style.left = Math.max(0, (de.clientWidth - BMS.ui.win.offsetWidth) / 2) + 'px';
BMS.ui.win.style.top = Math.max(0, (de.clientHeight - BMS.ui.win.offsetHeight) / 2) + 'px';

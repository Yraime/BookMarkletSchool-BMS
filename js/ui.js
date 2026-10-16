/* Construit la fenêtre (Shadow DOM) et expose les éléments dans BMS.ui */
var host = document.createElement('div');
host.id = BMS.id;
host.style.cssText = 'position:fixed;inset:0;z-index:2147483647;';
var root = host.attachShadow({ mode: 'open' });

root.innerHTML =
	'<style>' + BMS.css + '</style>' +
	'<div class="bg"></div>' +
	'<div class="win" role="dialog" aria-label="Launcher">' +
		'<nav class="side"><div class="logo">🚀 BMS</div></nav>' +
		'<div class="main">' +
			'<div class="top">' +
				'<input class="search" placeholder="Rechercher un site…" autocomplete="off">' +
				'<button class="x" title="Fermer (Échap)">✕</button>' +
			'</div>' +
			'<div class="title"></div>' +
			'<div class="grid"></div>' +
			'<div class="foot"><span>Entrée : ouvrir le 1er résultat • ↑ ↓ ← → : naviguer • Échap : fermer</span>' +
				'<label><input type="checkbox" class="same"> Même onglet</label></div>' +
		'</div>' +
	'</div>';

function $(s) { return root.querySelector(s); }

BMS.ui = {
	host: host, root: root,
	side: $('.side'), grid: $('.grid'), title: $('.title'),
	input: $('.search'), same: $('.same'),
	closeBtn: $('.x'), bg: $('.bg')
};
document.body.appendChild(host);

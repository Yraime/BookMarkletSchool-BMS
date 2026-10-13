// main.js : creation des menus, raccourcis clavier/souris, nettoyage

function w(n, u, a, b) {
	return function () { openWin(n, u, a, b); };
}

jeux = menu('Jeux', [
	['\uD83C\uDFC0 Basket Legends', '#b89000', w('Basket Legends', 'https://basketballlegends.pro/game/basketball-legends/', 785, 500)],
	['\uD83D\uDC0D Snake', '#00b894', w('Snake', 'https://www.snake.fr/game/1.3/index.html', 600, 625)],
	['\u26BD Rocket Goal', '#a3d53e', w('Rocket Goal', 'https://rocketgoal.io/', 790, 500)],
	['\uD83D\uDE94 Escape Road', '#41bff1', w('Escape Road', 'https://azgames.io/game/escape-road/', 790, 500)],
	['\uD83C\uDF6A Cookie Clicker', '#006338', w('Cookie Clicker', 'https://cookiegame.org/index.html', 790, 500)]
], 1);

video = menu('Vid\u00E9os Streaming', [
	['\uD83C\uDFAC Senpai Stream', '#7e0404', w('Senpai Stream', 'https://senpai-stream.shop/', 800, 600)]
], 1);

param = menu('Param\u00E8tres', [], 1);

main = menu('Plugin Menu', [
	['\uD83D\uDD79 Jeux', '#42a4ea', function () { go(main, jeux); }],
	['\uD83C\uDFA5 Vid\u00E9os Streaming', '#e42031', function () { go(main, video); }],
	['\u2699 Param\u00E8tres', '#5b5b5b', function () { go(main, param); }]
]);

document.addEventListener('pointermove', function (e) {
	mx = e.clientX;
	my = e.clientY;
}, opt);

document.addEventListener('pointerdown', function (e) {
	if (!menus.some(function (m) { return m.contains(e.target); })) closeMenus();
}, opt);

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape') return closeMenus();
	var t = e.target;
	if (e.key !== '<' || t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
	closeMenus();
	main.style.display = 'block';
	main.style.left = Math.max(0, Math.min(mx + 10, innerWidth - main.offsetWidth)) + 'px';
	main.style.top = Math.max(0, Math.min(my + 10, innerHeight - main.offsetHeight)) + 'px';
}, opt);

window.__pm = function () {
	ac.abort();
	menus.forEach(function (m) { m.remove(); });
	if (cur) cur.remove();
	delete window.__pm;
};

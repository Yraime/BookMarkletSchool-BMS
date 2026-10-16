/* main.js – seul fichier chargé par le bookmarklet.
   Il télécharge tous les autres en parallèle puis les exécute dans l'ordre. */
(function () {
	var ID = 'bms-launcher';

	// Re-cliquer sur le bookmarklet ferme le launcher (instantané, sans réseau)
	var old = document.getElementById(ID);
	if (old) { old.remove(); return; }

	var BASE = 'https://raw.githubusercontent.com/Yraime/BookMarkletSchool-BMS/main/';
	var Q = '?' + Date.now();
	var JS = ['js/store.js', 'js/ui.js', 'js/app.js'];   // ordre d'exécution

	function get(f) {
		return fetch(BASE + f + Q).then(function (r) {
			if (!r.ok) throw new Error(r.status + ' ' + f);
			return r.text();
		});
	}

	var BMS = { id: ID, base: BASE, css: '', cats: [] };

	get('data/index.json').then(function (t) {
		var catFiles = JSON.parse(t);

		return Promise.all([
			get('css/style.css'),
			Promise.all(catFiles.map(function (f) { return get('data/' + f).then(JSON.parse); })),
			Promise.all(JS.map(get))
		]);
	}).then(function (r) {
		BMS.css = r[0];
		BMS.cats = r[1];
		r[2].forEach(function (code) { new Function('BMS', code)(BMS); });
	}).catch(function (e) {
		alert('Chargement impossible : ' + e.message);
	});
})();

javascript:(function () {
	var b = 'https://raw.githubusercontent.com/Yraime/BookMarkletSchool-BMS/main/',
		q = '?' + Date.now();

	function g(f) {
		return fetch(b + f + q).then(function (r) {
			if (!r.ok) throw new Error(r.status + ' ' + f);
			return r.text();
		});
	}

	g('files.json')
		.then(function (t) { return Promise.all(JSON.parse(t).map(g)); })
		.then(function (a) { (0, eval)('(function(){' + a.join('\n;\n') + '\n})()'); })
		.catch(function (e) { alert('Chargement impossible : ' + e.message); });
})();

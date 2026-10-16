/* Stockage favoris / récents. Retombe sur la mémoire si localStorage est bloqué. */
var mem = {};
BMS.store = {
	get: function (k, d) {
		try {
			var v = localStorage.getItem('bms_' + k);
			return v ? JSON.parse(v) : (k in mem ? mem[k] : d);
		} catch (e) { return k in mem ? mem[k] : d; }
	},
	set: function (k, v) {
		mem[k] = v;
		try { localStorage.setItem('bms_' + k, JSON.stringify(v)); } catch (e) {}
	}
};

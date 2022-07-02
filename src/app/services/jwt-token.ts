export default {
	setToken(token : any) {
		window.localStorage.setItem('token_autos_motos', JSON.stringify(token));
	},
	getToken() {
		return JSON.parse(window.localStorage.getItem('token_autos_motos') || '{}');
	},
	removeToken() {
		window.localStorage.removeItem('token_autos_motos');
	}
}
export default {
	setToken(token : any) {
		localStorage.setItem('token_autos_motos', token);
	},
	getToken() {
		return JSON.parse(localStorage.getItem('token_autos_motos') || '{}');
	},
	removeToken() {
		localStorage.removeItem('token_autos_motos');
	}
}
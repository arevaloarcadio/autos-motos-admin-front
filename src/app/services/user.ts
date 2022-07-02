export default {
	setUser(user : any) {
		window.localStorage.setItem('user_autos_motos', JSON.stringify(user));
	},
	getUser() {
		return JSON.parse(window.localStorage.getItem('user_autos_motos') || '{}');
	},
	removeUser() {
		window.localStorage.removeItem('user_autos_motos');
	}
}
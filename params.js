const dotenv = require('dotenv');
const app = require("./app");
dotenv.config();

module.exports = {
	ADMIN_USER: process.env.DB_ADMIN_USER,
	ADMIN_PASSWORD: process.env.DB_ADMIN_PASSWORD,
	DB_NAME: process.env.DB_NAME,
	PORT: process.env.PORT || 3001,
	STUDENTS: process.env.STUDENTS,
	IS_DEVELOPEMENT: app.settings.env === 'development',
	get API_URL() {
		return this.IS_DEVELOPEMENT ? `http://localhost:${this.PORT}/api` : process.env.API_URL;
	}
}
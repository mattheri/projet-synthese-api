const express = require('express');
const app = express();

app.use(require('cors')());
app.use(require("helmet")());
app.use(require('body-parser').json());

const PORT = process.env.PORT || 3000;

app.use(require('./api-router'));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
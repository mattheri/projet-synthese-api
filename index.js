const { PORT } = require("./params");
const app = require('./app');
const timeout = require("connect-timeout");

function haltOnTimeout(req, res, next) {
	if (!req.timedout) next();
}

app.use(timeout(120000));
app.use(require('cors')());
app.use(require("helmet")());
app.use(require('body-parser').json());
app.use(require('./api-router'));
app.use(haltOnTimeout);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
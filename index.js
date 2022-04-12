const { PORT } = require("./params");
const app = require("./app");

app.use(require("cors")());
app.use(require("helmet")());
app.use(require("body-parser").json());
app.use(require("./api-router"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const Koa = require("koa");
const _ = require("koa-route");
const parcelStreamCtrl = require("./controllers/parcelstream");
const app = new Koa();

app.use(_.post("/parcel", parcelStreamCtrl.getParcelDetails));

console.log(`Koa server listening on port ${process.env.PORT}`);
app.listen(process.env.PORT);
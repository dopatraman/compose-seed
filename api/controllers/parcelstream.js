const digmapService = require('../service/digmaps');
const { Address } = require('../common/objects');

exports.getParcelDetails = async (ctx) => {
	let body = ctx.request.body;
	console.log("body received", body);
	console.log("go go go");
	ctx.body = body;
}
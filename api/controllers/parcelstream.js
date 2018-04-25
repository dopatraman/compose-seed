const digmapService = require('../service/digmaps');
const { Address } = require('../common/objects');

exports.getParcelDetails = async (ctx) => {
	let body = ctx.request.body;
	console.log("body received", body);
	// @TODO:
	// validate address somehow
	let geom = await digmapService.getParcelGeometry(
// new Address('25482 buckwood', 'Lake Forest', 'CA', '92630')
		new Address(
			body.address1,
			body.address2,
			body.city, 
			body.state,
			body.zipcode)
	)
	ctx.body = geom;
}
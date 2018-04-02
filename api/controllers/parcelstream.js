const digmapService = require('../service/digmaps');
const { Address } = require('../common/objects');


exports.getParcelDetails = async (ctx) => {
	let url = await digmapService.getParcelGeometry(
		new Address('25482 buckwood', 'Lake Forest', 'CA', '92630')
	)
	ctx.body = url;
}
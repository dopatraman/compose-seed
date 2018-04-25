const { get, getJSON } = require('../common/http');
const { parse } = require('../common/xml');
const { ParcelGeometry } = require('../common/objects');

var _getSessionUrl = async function() {
    let resp = await get('http://parcelstream.com/admin/getsik.aspx', {
        account: 'ProspectSandbox',
        login: 'Abode',
        group: 'Abode'
    });
    let body = await parse(resp);
    // make module for parsing json path
    if (body.Response.Error) {
        throw new Error("Error authenticating with Digmaps");
    }
    let token = body.Response.Success[0].$.message;
    let [space, first, second, third] = token.split('/');
    return `http://${first}.parcelstream.com/${second}/InitSession.aspx?sik=${second}/${third}&output=xml`;
}

var _candy = async function() {
    let url = await _getSessionUrl();
    let resp = await get(url);
    let body = await parse(resp);
    // make module for parsing json path
    let data = body.Response.Results[0].Data[0].Row[0].$;
    return [data.Candy, data.Domains];
}

var _getParcelDetails = async function(address) {
    console.log(address);
    let [candy, domain] = await _candy();
    let url = `${domain}/GetGeocode.aspx?
&address=${encodeURIComponent(address.address1)}
&city=${encodeURIComponent(address.city)}
&state=${address.state}&zip=${address.zipcode}
&links={PROP:{Class:'Dmp.Neptune.Links.KeyLink',To:'SS.Prop.ParcelDetail/ParcelDetail',FromKey:'ADDRESSID',ToKey:'ADDRESS_ID'}}
&fields=*,PROP(*)
&showSchema=false&datasource=PARCELS,STREET_CENTERLINE
&obsId=window
&obsSuccessMethod=S14985926201935971117923
&obsErrorMethod=E14985926201935971117923
&output=xml
&ss_candy=${candy}`
    return await get(url);
}

var _parseIrregular = function(irregularParcelResp) {
    let [ _, __, irregularXmlString] = irregularParcelResp.split('\n');
    return irregularXmlString.slice(2, irregularXmlString.length-2).replace(/\\/g, '');
}

exports.getParcelGeometry = async function(address) {
    let parcelResponse = await _getParcelDetails(address);
    let xmlString = _parseIrregular(parcelResponse);
    let xml = await parse(xmlString);
    // make module for parsing json path
    if (xml.Response.Error) {
        console.error(xml.Response.Error);
        return {error: "Address is invalid"}
    }
    return new ParcelGeometry().parse(xml.Response.Results[0].RecordSet[1].Data[0].Row[0].$.GEOMETRY).toSegments();
}
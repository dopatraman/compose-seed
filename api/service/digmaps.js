const { get, getJSON } = require('../common/http');
const { parse } = require('../common/xml');
const { ParcelGeometry } = require('../common/objects');
const strings = require('../common/strings');

exports.getParcelGeometry = async function(address) {
    let parcelResponse = await _getParcelDetails(address);
    let xmlString = _parseIrregular(parcelResponse);
    let xml = await parse(xmlString);
    // @TODO:
    // parse json path somewhere else
    return new ParcelGeometry().parse(xml.Response.Results[0].RecordSet[1].Data[0].Row[0].$.GEOMETRY).toSegments();
}

var _getParcelDetails = async function(address) {
    let [candy, domain] = await _candy();
    let url = `${domain}/GetGeocode.aspx?
&address=${encodeURIComponent(address.address)}
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

var _candy = async function() {
    let url = await _getSessionUrl();
    let resp = await get(url);
    let body = await parse(resp);
    // make module for parsing json path
    let data = body.Response.Results[0].Data[0].Row[0].$;
    return [data.Candy, data.Domains];
}

var _getSessionUrl = async function() {
    let [_, first, second, third] = await _auth();
    return `http://${first}.parcelstream.com/${second}/InitSession.aspx?sik=${second}/${third}&output=xml`;
}

var _auth = async function() {
    let resp = await get(strings.parcelStreamAuthUrl, {
        account: strings.parcelStreamAccountName,
        login: strings.parcelStreamLogin,
        group: strings.parcelStreamGroupName
    });
    let body = await parse(resp);
    if (body.Response.Error) {
        throw new Error(strings.errors.auth);
    }
    let token = body.Response.Success[0].$.message;
    // The names "first", "second", and "third" are literally used in the official docs
    return token.split('/');
}

var _parseIrregular = function(irregularParcelResp) {
    let [ _, __, irregularXmlString] = irregularParcelResp.split('\n');
    return irregularXmlString.slice(2, irregularXmlString.length-2).replace(/\\/g, '');
}

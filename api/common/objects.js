exports.Address = function(address, city, state, zipcode) {
    this.address = address;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
}

exports.ParcelGeometry = function(polygonString) {
    this._rawString = polygonString;
    this._r = /(\w+)\s+(\(\((\-?\d+\.?\d+?\s\-?\d+\.?\d+\,?\s?)*\)\))/
    this.type = null;
    this.coordinates = [];
    
    this.parse = function() {
        let matches = this._r.exec(this._rawString)
        if (matches !== null) {
            this.type = matches[1];
            return this._parseCoordinates(matches[2]);
        }
        throw new Error('Polygon string not formatted coorectly');
    }

    this._parseCoordinates = function(coordString) {
        var coordPairsString = coordString.slice(2, coordString.length-2);
        console.log(coordPairsString);
        this.coordinates = coordPairsString.split(',')
            .map((coordAsString) => {
                return coordAsString.trim().split(' ');
            })
            .map((coordPairAsString) => {
                return [parseFloat(coordPairAsString[0]), parseFloat(coordPairAsString[1])];
            });
    }
}
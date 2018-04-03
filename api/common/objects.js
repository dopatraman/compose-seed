exports.Address = function(address, city, state, zipcode) {
    this.address = address;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
}

exports.ParcelGeometry = function() {
    this._r = /(\w+)\s+(\(\((\-?\d+\.?\d+?\s\-?\d+\.?\d+\,?\s?)*\)\))/
    this.type = null;
    this.coordinates = [];
    
    this.parse = function(polygonString) {
        let matches = this._r.exec(polygonString);
        if (matches !== null) {
            this.type = matches[1];
            this.coordinates = this._parseCoordinates(matches[2]);
            return this;
        }
        throw new Error('Polygon string not formatted coorectly');
    }

    this.toSegments = function() {
        var segment = [];
        var acc = [];
        for (var i = 0; i < this.coordinates.length; i++) {
            var point = this.coordinates[i];
            segment.push(point);
            if (segment.length == 2) {
                acc.push(segment);
                segment = [point];
            }
        }
        return acc;
    }

    this._parseCoordinates = function(coordString) {
        var coordPairsString = coordString.slice(2, coordString.length-2);
        return coordPairsString.split(',')
            .map((coordAsString) => {
                return coordAsString.trim().split(' ');
            })
            .map((coordPairAsString) => {
                return [parseFloat(coordPairAsString[0]), parseFloat(coordPairAsString[1])];
            });
    }
}
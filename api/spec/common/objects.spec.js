const { ParcelGeometry } = require('../../common/objects');

describe("ObjectsTest", () => {
    describe("ParcelGeometry", () => {
        var obj;
        var polygonString;
        beforeEach(() => {
            polygonString = "POLYGON ((-117.68585062056 33.6276267876356, -117.685614712524 33.6278174395575, -117.685701868238 33.6278929232546, -117.685709237625 33.6278981595422, -117.685717575495 33.6279022550463, -117.685726632341 33.6279050872106, -117.685736137141 33.6279065712835, -117.685745805466 33.6279066628548, -117.685755347995 33.6279053591841, -117.685764479172 33.6279026992834, -117.68577292575 33.6278987627492, -117.685780434967 33.6278936673808, -117.685976203068 33.6277354681823, -117.68585062056 33.6276267876356))"
            // mockDb = jasmine.createSpyObj('dbSvc', ['query']);
            obj = new ParcelGeometry();
        });

        describe('#parse', () => {
            it('should parse a polygon string into coordinates', () => {
                let coords = obj.parse(polygonString).coordinates;
                expect(coords).toEqual(jasmine.any(Array));
                expect(coords.length).toBe(14);
            });
            it('should throw an error for an incorrect polygon string', () => {
                expect(() => { obj.parse('!') }).toThrowError();
            })
        });

        describe('#toSegments', () => {
            it('should convert the coordinates to line segment array', () => {
                let segments = obj.parse(polygonString).toSegments();
                expect(segments).toEqual(jasmine.any(Array));
            });
            it('should convert coordinates into line segments', () => {
                let segments = obj.parse(polygonString).toSegments();
                let acc = [];
                let segmentsSublist = []
                for (var i = 0; i < segments.length; i++) {
                    if (i % 2 == 0) {
                        segmentsSublist.push(segments[i][1])
                    }
                    else {
                        segmentsSublist.push(segments[i][0])
                    }
                    if (segmentsSublist.length == 2) {
                        acc.push(segmentsSublist);
                        segmentsSublist = [];
                    }
                }
                acc = acc.map((el) => { return el[0] !== el[1] });
                acc = acc.reduce((acc, el) => { return el + acc }, 0);
                expect(acc).toEqual(0);
            })
        });
    });
});
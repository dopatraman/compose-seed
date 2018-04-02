var LandingPageService = require("../../service/landing");

describe("LandingPageService", () => {
    var svc;
    var mockDb;
    beforeEach(() => {
        mockDb = jasmine.createSpyObj('dbSvc', ['query']);
        svc = new LandingPageService(mockDb);
    });

    describe('#insertSubmission', () => {
        it('should call a db query', () => {
            svc.insertSubmission("prakash@carbonfive.com");
            expect(mockDb.query).toHaveBeenCalled();
        });
    });

    describe('#fetchSubmissions', () => {
        it('should make a db query', () => {
            svc.fetchSubmissions();
            expect(mockDb.query).toHaveBeenCalled();
        });
    });
});
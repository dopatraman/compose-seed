describe("LandingPageService", () => {
    var svc;
    var mockDb;
    beforeEach(() => {
        // mockDb = jasmine.createSpyObj('dbSvc', ['query']);
        // svc = new LandingPageService(mockDb);
    });

    xdescribe('#insertSubmission', () => {
        it('should call a db query', () => {
            svc.insertSubmission("prakash@carbonfive.com");
            expect(mockDb.query).toHaveBeenCalled();
        });
    });

    xdescribe('#fetchSubmissions', () => {
        it('should make a db query', () => {
            svc.fetchSubmissions();
            expect(mockDb.query).toHaveBeenCalled();
        });
    });
});
var LandingPageService = function(dbSvc) {
    this.db = dbSvc;

    this.insertSubmission = function(email) {
        return this.db.query(
            'INSERT INTO submissions ' +
            '(email) ' +
            'VALUES ' +
            '($1) ' + 
            'RETURNING id', [email]
        );
    }

    this.fetchSubmissions = function() {
        return this.db.query(
            'SELECT * FROM submissions'
        );
    }

    this.fetchSubmissionInterestSelections = function() {
        return this.db.query(
            'SELECT ' +
                'submissions.email, ' +
                'interest_selection.interest_id ' +
            'FROM submissions ' +
            'JOIN interest_selection ' +
                'ON submissions.id = interest_selection.submission_id'
        )
    }

    this.insertInterests = function(submissionId, interests) {
        var ins = interests.map(function(el) {
            return '(' + submissionId + ', ' + el + ')';
        });
        return this.db.query(
            'INSERT INTO interest_selection ' +
            '(submission_id, interest_id) ' + 
            'VALUES ' +
            ins.toString()
        );
    }
}

module.exports = LandingPageService;
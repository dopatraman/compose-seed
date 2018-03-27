const pg = require('pg');

var DBService = function(config) {
    this._config = config || {};
    this._pool = new pg.Pool({
        user: this._config.user || process.env.POSTGRES_USER,
        database: this._config.db || process.env.POSTGRES_DB,
        password: this._config.password || process.env.POSTGRES_PASSWORD,
        host: this._config.host || process.env.POSTGRES_HOST
    });

    this.query = function(text, values) {
        return new Promise((resolve, reject) => {
            this._pool.query(text, values, (err, result) => {
                if (err) { reject(err) }
                resolve(result);
            });
        });
    }

    this._pool.on('error', (err) => {
        console.log('Database error!', err);
    });
}

module.exports = DBService;

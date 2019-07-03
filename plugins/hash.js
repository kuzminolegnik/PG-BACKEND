module.exports = function (req, res, next) {

    req.getHash = function (key) {
        let hash;
        key = key || "session_hash";

        if (req.cookies[key]) {
            hash = req.cookies[key];
        }
        else if (req.method === "GET") {
            hash = req.query[key];
        }
        else {
            hash = req.body[key] || req.query[key];
        }

        return hash || req.headers['x-session-hash'];
    };

    next();
};
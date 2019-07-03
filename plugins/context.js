module.exports = function (req, res, next) {

    req.getContext = function () {
        return Number(req.headers['x-context-hash']);
    };

    next();
};
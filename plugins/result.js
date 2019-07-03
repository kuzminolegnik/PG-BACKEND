module.exports = function (req, res, next) {

    res.sendData = function (value) {

        if (value && value['status_code']) {
            res.status(value['status_code'] || 200);
            delete value['status_code'];
        }

        res.json(value);
    };

    next();
};
module.exports = {

    '[GET]/': function (req, res) {
        let user = this.getModel('user');

        user.read({
            values: {
                session: req.getHash(),
                login: null
            },
            callback: res.sendData
        });

    }

};
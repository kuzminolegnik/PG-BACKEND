module.exports = {

    '[GET]/': function (req, res) {
        let usersControl = this.getModel('users.control');

        usersControl.read({
            values: {
                data: {
                    session_hash: req.getHash(),
                    project_id: req.getContext()
                }
            },
            callback: res.sendData
        });

    }

};
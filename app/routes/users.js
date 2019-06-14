module.exports = {

    '[GET]/': function (req, res) {
        let user = this.getModel('user');

        user.read({
            values: {
                session: req.getHash(),
                data: {
                    project_id: req.getContext(),
                }
            },
            callback: res.sendData
        });

    },

    '[GET]/:id': function (req, res) {
        let user = this.getModel('user');

        user.read({
            values: {
                session: req.getHash(),
                data: {
                    project_id: req.getContext(),
                    id: req.params["id"]
                }
            },
            callback: function (metaData) {

                metaData['result'] = metaData['result'] ? metaData['result'][0] : null;

                res.sendData(metaData);
            }
        });

    },

    '[PUT]/:id': function (req, res) {
        let user = this.getModel('user');

        user.edit({
            values: {
                session: req.getHash(),
                data: {
                    id: Number(req.params["id"]),
                    project_id: req.getContext(),
                    roles_id: req.body['roles_id'] || null
                }
            },
            callback: function (metaData) {

                metaData['result'] = metaData['result'] ? metaData['result'][0] : null;

                res.sendData(metaData);
            }
        });
    },

};
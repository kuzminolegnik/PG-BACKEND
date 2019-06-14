module.exports = {

    '[GET]/': function (req, res) {
        let role = this.getModel('roles.template');

        role.read({
            values: {
                session: req.getHash(),
                data: {}
            },
            callback: res.sendData
        });

    },

    '[GET]/:id': function (req, res) {
        let role = this.getModel('roles.template');

        role.read({
            values: {
                session: req.getHash(),
                data: {
                    id: req.params["id"]
                }
            },
            callback: function (metaData) {

                metaData['result'] = metaData['result'] ? metaData['result'][0] : null;

                res.sendData(metaData);
            }
        });

    },

    '[POST]/': function (req, res) {
        let role = this.getModel('roles.template');

        delete req.body['id'];

        role.create({
            values: {
                session: req.getHash(),
                data: req.body
            },
            callback: function (metaData) {

                metaData['result'] = metaData['result'] ? metaData['result'][0] : null;

                res.sendData(metaData);
            }
        });
    },

    '[PUT]/:id': function (req, res) {
        let role = this.getModel('roles.template');

        role.edit({
            values: {
                session: req.getHash(),
                data: req.body
            },
            callback: function (metaData) {

                metaData['result'] = metaData['result'] ? metaData['result'][0] : null;

                res.sendData(metaData);
            }
        });
    },

    '[DELETE]/:id': function (req, res) {
        let role = this.getModel('roles.template');

        role.delete({
            values: {
                session: req.getHash(),
                id: req.params["id"]
            },
            callback: function (metaData) {

                metaData['result'] = metaData['result'] ? metaData['result'][0] : null;

                res.sendData(metaData);
            }
        });
    }

};
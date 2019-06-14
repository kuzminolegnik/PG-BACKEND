module.exports = {

    '[GET]/': function (req, res) {
        let control = this.getModel('control');

        control.read({
            values: {
                session: req.getHash(),
                data: {}
            },
            callback: res.sendData
        });

    },

    '[GET]/:id': function (req, res) {
        let control = this.getModel('control');

        control.read({
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
        let control = this.getModel('control');

        delete req.body['id'];

        control.create({
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
        let control = this.getModel('control');


        control.edit({
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
        let control = this.getModel('control');

        control.delete({
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
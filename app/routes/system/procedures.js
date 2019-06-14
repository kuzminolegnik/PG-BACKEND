module.exports = {

    '[GET]/': function (req, res) {
        let procedure = this.getModel('procedure');

        procedure.read({
            values: {
                session: req.getHash(),
                data: {}
            },
            callback: res.sendData
        });

    },

    '[GET]/:id': function (req, res) {
        let procedure = this.getModel('procedure');

        procedure.read({
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
        let procedure = this.getModel('procedure');

        delete req.body['id'];

        procedure.create({
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
        let procedure = this.getModel('procedure');


        procedure.edit({
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
        let procedure = this.getModel('procedure');

        procedure.delete({
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
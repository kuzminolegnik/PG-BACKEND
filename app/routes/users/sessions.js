/**
 * Base url path /users/sessions
 *
 */
module.exports = {

    '[DELETE]/:id': function (req, res) {
        let session = this.getModel('session');

        session.destroy({
            values: {
                session: req.params["id"]
            },
            callback: res.sendData
        });
    },

    '[POST]/': function (req, res) {
        let session = this.getModel('session'),
            md5 = require('md5'),
            record;

        session.create({
            values: {
                login: req.body['login'],
                password: md5(req.body['password'])
            },
            callback: function (metaData) {

                if (!metaData['success']) {
                    res.sendData(metaData);
                    return;
                }

                record = metaData['result'][0];

                if (record) {
                    metaData['result'] = record;
                }

                res.sendData(metaData);
            }
        });
    },

    '[GET]/:id': function (req, res) {
        let session = this.getModel('session');

        session.record({
            values: {
                session: req.params["id"]
            },
            callback: function (metaData) {

                metaData['result'] = null;

                res.sendData(metaData);
            }
        });

    }

};
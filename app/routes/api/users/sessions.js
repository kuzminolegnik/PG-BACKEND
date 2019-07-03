module.exports = function (config) {

    const app = this;
    const RouterHttpApi = app.getRoute('base.http.api');

    return new RouterHttpApi({

        prefix: config['prefix'],

        '[DELETE]/:id': function (req, res) {
            let session = app.getModel('db.session');

            session.destroy({
                values: {
                    session: req.params["id"]
                },
                callback: res.sendData
            });
        },

        '[POST]/': function (req, res) {
            let session = app.getModel('db.session'),
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
            let session = app.getModel('db.session');

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
    });

};
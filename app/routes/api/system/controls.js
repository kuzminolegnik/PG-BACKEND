module.exports = function (config) {

    const app = this;
    const RouterHttpApi = app.getRoute('base.http.api');

    return new RouterHttpApi({

        prefix: config['prefix'],

        '[GET]/': function (req, res) {
            let control = app.getModel('db.control');

            control.read({
                values: {
                    session: req.getHash(),
                    data: {}
                },
                callback: res.sendData
            });

        },

        '[GET]/:id': function (req, res) {
            let control = app.getModel('db.control');

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
            let control = app.getModel('db.control');

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
            let control = app.getModel('db.control');

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
            let control = app.getModel('db.control');

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

    });

};
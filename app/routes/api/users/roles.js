module.exports = function (config) {

    const app = this;
    const RouterHttpApi = app.getRoute('base.http.api');

    return new RouterHttpApi({

        prefix: config['prefix'],

        '[GET]/': function (req, res) {
            let role = app.getModel('db.role');

            role.read({
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
            let role = app.getModel('db.role');

            role.read({
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

        '[POST]/': function (req, res) {
            let role = app.getModel('db.role');

            delete req.body['id'];

            req.body['project_id'] = req.getContext();

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
            let role = app.getModel('db.role');

            req.body['project_id'] = req.getContext();

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
            let role = app.getModel('db.role');

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

    });

};
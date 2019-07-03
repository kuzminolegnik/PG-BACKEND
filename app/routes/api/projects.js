module.exports = function (config) {

    const app = this;
    const RouterHttpApi = app.getRoute('base.http.api');

    return new RouterHttpApi({

        prefix: config['prefix'],

        '[GET]/': function (req, res) {
            let project = app.getModel('db.project');

            project.read({
                values: {
                    session: req.getHash(),
                    data: {}
                },
                callback: res.sendData
            });

        },

        '[GET]/:id': function (req, res) {
            let project = app.getModel('db.project');

            project.read({
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
            let project = app.getModel('db.project');

            delete req.body['id'];

            project.create({
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
            let project = app.getModel('db.project');

            project.edit({
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
            let project = app.getModel('db.project');

            project.delete({
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
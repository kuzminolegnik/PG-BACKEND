module.exports = {

    '[GET]/': function (req, res) {
        let project = this.getModel('project');

        project.read({
            values: {
                session: req.getHash(),
                data: {}
            },
            callback: res.sendData
        });

    },

    '[GET]/:id': function (req, res) {
        let project = this.getModel('project');

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
        let project = this.getModel('project');

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
        let project = this.getModel('project');

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
        let project = this.getModel('project');

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

};
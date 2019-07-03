module.exports = function (config) {

    const app = this;
    const RouterHttpFiles = app.getRoute('base.http.files');
    const userFileModel = app.getModel('file.user');
    const userDBModel = app.getModel('db.files.user');

    return new RouterHttpFiles({

        prefix: config['prefix'],

        '[GET]/:id/:name': function (req, res) {

            userDBModel.record({
                values: {
                    session: req.getHash(),
                    id: req.params["id"]
                },
                failure: res.sendData,
                success: function (metaData) {

                    let record = metaData['result'] ? metaData['result'][0] : null;

                    userFileModel.read({
                        file: {
                            entityId: record["entity_id"],
                            name: req.params["name"]
                        },
                        failure: res.sendData,
                        success: function (data) {
                            res.send(data['buffer']);
                        }
                    })
                }
            });

        },

        '[POST]/': function (req, res) {
            let file = req.files["upload"];

            file['entityId'] = req.body["entityId"];

            userFileModel.update({
                file: file,
                failure: res.sendData,
                success: function () {
                    userDBModel.create({
                        values: {
                            session: req.getHash(),
                            data: {
                                entity_id: req.body["entityId"],
                                type_id: 1,
                                name: file["name"],
                                size: file["size"],
                                mime_type: file["type"]
                            }
                        },
                        success: res.sendData,
                        failure: function (metaData) {
                            userFileModel.delete({
                                file: file,
                                callback: function () {
                                    metaData['result'] = metaData['result'] ? metaData['result'][0] : null;

                                    res.sendData(metaData);
                                }
                            });
                        }
                    });
                }
            });

        },

        '[PUT]/:id': function (req, res) {
            let file = req.files["upload"];

            file['entityId'] = req.body["entityId"];

            userDBModel.record({
                values: {
                    session: req.getHash(),
                    id: req.params["id"]
                },
                failure: res.sendData,
                success: function (metaData) {

                    let record = metaData['result'] ? metaData['result'][0] : null;

                    userFileModel.delete({
                        file: {
                            entityId: record["entity_id"],
                            name: record["name"]
                        },
                        failure: res.sendData,
                        success: function () {

                            userFileModel.update({
                                file: file,
                                failure: res.sendData,
                                success: function () {
                                    userDBModel.create({
                                        values: {
                                            session: req.getHash(),
                                            data: {
                                                entity_id: req.body["entityId"],
                                                type_id: 1,
                                                name: file["name"],
                                                size: file["size"],
                                                mime_type: file["type"]
                                            }
                                        },
                                        success: res.sendData,
                                        failure: function (metaData) {

                                            userFileModel.delete({
                                                file: file,
                                                callback: function () {
                                                    metaData['result'] = metaData['result'] ? metaData['result'][0] : null;

                                                    res.sendData(metaData);
                                                }
                                            });

                                        }
                                    });
                                }
                            });

                        }
                    })
                }
            });

        },

        '[DELETE]/:id': function (req, res) {

            userDBModel.record({
                values: {
                    session: req.getHash(),
                    id: req.params["id"]
                },
                failure: res.sendData,
                success: function (metaData) {

                    let record = metaData['result'] ? metaData['result'][0] : null;

                    userFileModel.delete({
                        file: {
                            entityId: record["entity_id"],
                            name: record["name"]
                        },
                        failure: res.sendData,
                        success: function () {
                            userDBModel.delete({
                                values: {
                                    session: req.getHash(),
                                    id: req.params["id"]
                                },
                                callback: res.sendData
                            });
                        }
                    })
                }
            });


        }
    });

};
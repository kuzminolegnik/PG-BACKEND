module.exports = function (app) {
    const fs = require('fs');
    const path = require("path");
    const pathRoutesBase = app.get('path.base.model');
    const Base = require(path.join(pathRoutesBase, 'base'))(app);

    let loadFile = function (parametrs) {
            let {path, success, failure, callback} = parametrs;

            fs.readFile(path, function (error, buffer) {

                if (error) {
                    if (typeof failure === "function") {
                        failure({
                            message: error.message,
                            success: false
                        });
                    }

                    if (typeof callback === "function") {
                        callback({
                            message: error.message,
                            success: false
                        });
                    }
                    return
                }

                if (typeof success === "function") {
                    success(buffer);
                }
            });
        },

        methods = {

            read: function (parametrs) {
                let me = this,
                    {success, failure, callback} = parametrs,
                    {session, id, file} = parametrs.values,
                    resourcesPath = app.get("path.resources"),
                    filePath = path.join(resourcesPath, me.name, id, file);

                loadFile({
                    path: filePath,
                    failure: failure,
                    callback: callback,
                    success: function (buffer) {
                        if (typeof success === "function") {
                            success({
                                buffer: buffer,
                                success: true
                            })
                        }
                    }
                });

            },

            update: function (parametrs) {
                let me = this,
                    {failure, callback, runQuery} = parametrs,
                    {entityId, name} = parametrs.file,
                    pathTmp = parametrs.file.path,
                    resourcesPath = app.get("path.resources"),
                    filePath = path.join(resourcesPath, me.name, entityId);

                loadFile({
                    path: pathTmp,
                    failure: failure,
                    success: function (buffer) {
                        fs.mkdir(filePath, {recursive: true}, function (error) {
                            if (error) {
                                if (typeof failure === "function") {
                                    failure({
                                        message: error.message,
                                        success: false
                                    });
                                }

                                if (typeof callback === "function") {
                                    callback({
                                        message: error.message,
                                        success: false
                                    });
                                }

                                return
                            }

                            fs.writeFile(path.join(filePath, name), buffer, function (error) {

                                if (error) {
                                    if (typeof failure === "function") {
                                        failure({
                                            message: error.message,
                                            success: false
                                        });
                                    }

                                    if (typeof callback === "function") {
                                        callback({
                                            message: error.message,
                                            success: false
                                        });
                                    }
                                    return
                                }

                                parametrs['failure'] = function () {
                                    let args = arguments;
                                    fs.unlink(path.join(filePath, name), function (error) {
                                        if (error) {
                                            if (typeof failure === "function") {
                                                failure({
                                                    message: error.message,
                                                    success: false
                                                });
                                            }

                                            if (typeof callback === "function") {
                                                callback({
                                                    message: error.message,
                                                    success: false
                                                });
                                            }
                                            return
                                        }

                                        if (typeof failure === "function") {
                                            failure.apply(me, args);
                                        }

                                        if (typeof callback === "function") {
                                            callback.apply(me, args);
                                        }


                                    });
                                };
                                parametrs.values.data.type_id = me.type;
                                runQuery(parametrs);
                            });
                        });
                    }
                });

            },

            delete: function (parametrs) {
                let me = this,
                    {success, failure, callback} = parametrs,
                    {session, id, file} = parametrs.values,
                    resourcesPath = app.get("path.resources"),
                    filePath = path.join(resourcesPath, me.name, id, file);

                loadFile({
                    path: filePath,
                    failure: failure,
                    success: function (buffer) {
                        fs.unlink(buffer, function (error) {
                            if (error) {
                                if (typeof failure === "function") {
                                    failure({
                                        message: error.message,
                                        success: false
                                    });
                                }

                                if (typeof callback === "function") {
                                    callback({
                                        message: error.message,
                                        success: false
                                    });
                                }
                                return
                            }

                            if (typeof success === "function") {
                                success({
                                    success: true
                                });
                            }
                        });
                    }
                });

            }
        };

    class ModelFiles extends Base {

        constructor(parameters) {
            super(parameters);
            let me = this,
                {type} = parameters;

            me._type = type;
        }

        createMethod(params, key) {
            let me = this,
                runQuery = me.createRunQueryFromParams.apply(me, [params]);

            if (methods[key]) {
                me[key] = function (parametrs) {
                    parametrs['runQuery'] = runQuery;
                    methods[key].bind(me)(parametrs);

                }
            }
        }

        get type() {
            return this._type;
        }

    }

    return ModelFiles;
};


module.exports = function () {

    const app = this;
    const fs = require("fs");
    const path = require("path");

    let loadFile = function (parametrs) {
        let {path, success, failure, callback} = parametrs;

        fs.readFile(path, function (error, buffer) {

            if (error) {
                if (typeof failure === "function") {
                    failure({
                        status_code: 404,
                        message: error.message,
                        success: false
                    });
                }

                if (typeof callback === "function") {
                    callback({
                        status_code: 404,
                        message: error.message,
                        success: false
                    });
                }
                return
            }

            if (typeof success === "function") {
                success({
                    buffer: buffer,
                    success: true
                });
            }
        });
    };

    class ModelFiles {

        constructor(config) {
            const me = this;
            const {entityName} = config;

            me._app = app;
            me._entityName = entityName;
        }

        get app() {
            return this._app;
        }

        get entityName() {
            return this._entityName;
        }

        read(config) {
            let me = this,
                {success, failure, callback} = config,
                {entityId, name} = config.file,
                resourcesPath = app.get("path.resources"),
                filePath = path.join(resourcesPath, me.entityName, String(entityId), name);

            loadFile({
                path: filePath,
                failure: failure,
                callback: callback,
                success: success
            });

        }

        update(config) {
            let me = this,
                {failure, success, callback} = config,
                {entityId, name} = config.file,
                pathTmp = config.file.path,
                resourcesPath = app.get("path.resources"),
                filePath = path.join(resourcesPath, me.entityName, String(entityId));

            loadFile({
                path: pathTmp,
                failure: failure,
                success: function (result) {

                    fs.mkdir(filePath, {recursive: true}, function (error) {
                        if (error) {
                            if (typeof failure === "function") {
                                failure({
                                    status_code: 404,
                                    message: error.message,
                                    success: false
                                });
                            }

                            if (typeof callback === "function") {
                                callback({
                                    status_code: 404,
                                    message: error.message,
                                    success: false
                                });
                            }

                            return
                        }

                        fs.writeFile(path.join(filePath, name), result.buffer, function (error) {

                            if (error) {
                                if (typeof failure === "function") {
                                    failure({
                                        status_code: 404,
                                        message: error.message,
                                        success: false
                                    });
                                }

                                if (typeof callback === "function") {
                                    callback({
                                        status_code: 404,
                                        message: error.message,
                                        success: false
                                    });
                                }
                                return;
                            }

                            if (typeof success === "function") {
                                success({
                                    buffer: result.buffer,
                                    success: true
                                });
                            }

                            if (typeof callback === "function") {
                                callback({
                                    buffer: result.buffer,
                                    success: true
                                });
                            }

                        });
                    });
                }
            });

        }

        delete(config) {
            let me = this,
                {success, failure, callback} = config,
                {entityId, name} = config.file,
                resourcesPath = app.get("path.resources"),
                filePath = path.join(resourcesPath, me.entityName, entityId, name);

            loadFile({
                path: filePath,
                failure: failure,
                success: function (result) {
                    fs.unlink(result.buffer, function (error) {
                        if (error) {
                            if (typeof failure === "function") {
                                failure({
                                    message: error.message,
                                    success: false
                                });
                            }

                            if (typeof callback === "function") {
                                callback({
                                    message: error.message,
                                    success: false
                                });
                            }
                            return
                        }

                        if (typeof success === "function") {
                            success({
                                success: true
                            });
                        }

                        if (typeof callback === "function") {
                            callback({
                                success: true
                            });
                        }

                    });
                }
            });

        }


    }

    return ModelFiles;
};
let path = require("path"),
    express = require('express'),
    routeRegexp = new RegExp(/^\[(GET|POST|PUT|DELETE)\](.*)$/, 'i'),
    listLoadModule = {};

module.exports = class Router {

    constructor(parameters) {
        let me = this,
            router = express.Router(),
            {name, app} = parameters,
            result;

        for (let key in parameters) if (parameters.hasOwnProperty(key)) {
            if (routeRegexp.test(key)) {
                result = key.match(routeRegexp);

                if (result[1] && result[2]) {
                    router[result[1].toLowerCase()](result[2], function () {
                        parameters[key].apply(me, arguments);
                    })
                }
            }
        }

        me.app = app;
        me.router = router;
        me.name = name;

        app.use(path.join("/", name).replace(new RegExp("\\\\", 'g'), "/"), router);
    }

    getModel(name) {
        let me = this,
            app = me.app,
            Model = require(path.join(app.get('path.model'), 'base')),
            pathLoad = path.join(app.get('path.model'), name),
            modelConfig;

        if (!listLoadModule[pathLoad]) {
            modelConfig = require(pathLoad);
            modelConfig['app'] = app;
            listLoadModule[pathLoad] = new Model(modelConfig);
        }

        return listLoadModule[pathLoad];
    }

};
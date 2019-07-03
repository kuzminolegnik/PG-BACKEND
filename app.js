let express = require('express'),
    logger = require('morgan'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    config = require("config"),
    pg = require('pg'),

    path = require('path'),
    fs = require('fs'),
    http = require('http'),

    rootPath = __dirname,

    loggerPath = path.join(rootPath, "logger"),

    pluginsPath = path.join(rootPath, "plugins"),

    modelPath = path.join(rootPath, "app/model"),
    routePath = path.join(rootPath, "app/routes"),
    loadModules = {},

    resourcesPath = config.get("files.path") || path.join(rootPath, "resources");
/*
 * Создание директорий если они отсутствуют
 */
!fs.existsSync(modelPath) ? fs.mkdirSync(modelPath, {recursive: true}) : null;
!fs.existsSync(routePath) ? fs.mkdirSync(routePath, {recursive: true}) : null;

!fs.existsSync(loggerPath) ? fs.mkdirSync(loggerPath, {recursive: true}) : null;

!fs.existsSync(resourcesPath) ? fs.mkdirSync(resourcesPath, {recursive: true}) : null;

!fs.existsSync(pluginsPath) ? fs.mkdirSync(pluginsPath, {recursive: true}) : null;

const database = new pg.Client(config.get("database"));

database.connect(function (error, client) {

    if (error) {
        throw new Error(error);
    }

    /**
     * Создание HTTP сервера
     */
    const app = express();

    app.use(cors());

    http.createServer(app).listen(config.get("server.port"), config.get("server.host"));

    app.set("config", config);
    app.set("database.client", client);

    app.set("path.logger", loggerPath);

    app.set("path.resources", resourcesPath);

    app.set("path.model", modelPath);
    app.set("path.routes", routePath);


    /**
     * Открытие патока для записи логов в файл
     */
    app.use(logger(config.get("server.logger.format"), {
        stream: fs.createWriteStream(path.join(loggerPath, config.get("server.logger.file")), {flags: 'a'})
    }));

    app.use(bodyParser.json({
        limit: '10mb'
    }));

    app.use(bodyParser.urlencoded({
        limit: '10mb',
        extended: false
    }));

    app.use(cookieParser());

    let plugins = fs.readdirSync(pluginsPath, {withFileTypes: true});

    plugins.forEach(function (plugin) {

        if (plugin.isFile()) {
            plugin = require(path.join(pluginsPath, path.parse(plugin['name'])['name']));
            app.use(function (req, res, next) {
                plugin.apply(app, arguments);
            });
        }

    });

    app.getRoute = function (name) {
        let me = this,
            pathLoad = path.join(me.get(`path.routes`), path.join.apply(path, name.split('.')) );

        if (!loadModules[pathLoad]) {
            loadModules[pathLoad] = require(pathLoad).apply(me, arguments);
        }

        return loadModules[pathLoad];
    };

    app.getModel = function (name) {
        let me = this,
            pathLoad = path.join(me.get(`path.model`), path.join.apply(path, name.split('.')) );

        if (!loadModules[pathLoad]) {
            loadModules[pathLoad] = require(pathLoad).apply(app, arguments);
        }

        return loadModules[pathLoad];
    };

    let initRoutes = function () {
        let pathRoute = app.get("path.routes"),
            routes = [], prefix,

            loadRoute = function (currentRoutePath) {

                let items = fs.readdirSync(currentRoutePath, {withFileTypes: true});

                items.forEach(function (item) {

                    if (!item.isFile()) {
                        if (item['name'] !== 'base') {
                            loadRoute(path.join(currentRoutePath, item['name']));
                        }
                        return;
                    }

                    routes.push(path.join(currentRoutePath, path.parse(item['name'])['name']));
                });

            };

        loadRoute(pathRoute);

        routes.forEach(function (route) {


            prefix = path.relative(pathRoute, route);
            prefix = prefix.replace(new RegExp("\\\\", 'g'), "/");

            require(route).apply(app, [{prefix}])

        });
    };

    initRoutes();

    app.get('/*', function(req, res) {
        res.status(404).end();
    });


});
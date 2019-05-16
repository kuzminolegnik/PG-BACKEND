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
    modelPath = path.join(rootPath, "app/model"),
    routePath = path.join(rootPath, "app/routes");

/*
 * Создание директорий если они отсутствуют
 */
!fs.existsSync(modelPath) ? fs.mkdirSync(modelPath, {recursive: true}) : null;
!fs.existsSync(routePath) ? fs.mkdirSync(routePath, {recursive: true}) : null;
!fs.existsSync(loggerPath) ? fs.mkdirSync(loggerPath, {recursive: true}) : null;

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
    app.set("path.model", modelPath);
    app.set("path.logger", loggerPath);
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

    app.use(function (req, res, next) {

        req.getHash = function (key) {
            key = key || "hash";
            var hash;
            if (req.cookies[key]) {
                hash = req.cookies[key];
            }
            else if (req.method === "GET") {
                hash = req.query[key];
            }
            else {
                hash = req.body[key] || req.query[key];
            }
            return hash
        };

        res.sendData = function (value) {

            if (value && value['status_code']) {
                res.status(value['status_code'] || 200);
                delete value['status_code'];
            }

            res.json(value);
        };

        next();

    });


    let Route = require(path.join(routePath, 'base')),
        listRoutes = [], configRoute,

        loadRoute = function (currentRoutePath) {

            let items = fs.readdirSync(currentRoutePath, {withFileTypes: true});

            items.forEach(function (item) {

                if (!item.isFile()) {
                    loadRoute(path.join(currentRoutePath, item['name']));
                    return;
                }

                if (path.parse(item['name'])['name'] !== 'base') {
                    listRoutes.push(path.join(currentRoutePath, path.parse(item['name'])['name']));
                }

            });

        };

    loadRoute(routePath);

    listRoutes.forEach(function (route) {

        configRoute = require(route);

        if (!configRoute['name']) {
            configRoute['name'] = path.relative(routePath, route);
        }

        configRoute['app'] = app;

        new Route(configRoute)

    });

    app.get('/*', function(req, res) {
        res.status(404).end();
    });


});
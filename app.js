let express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    config = require("config"),
    pg = require('pg'),

    path = require('path'),
    fs = require('fs'),
    http = require('http'),

    rootPath = __dirname,
    loggerPath = path.join(rootPath, "logger"),
    modelPath = path.join(rootPath, "model"),
    routePath = path.join(rootPath, "routes"),
    controllerPath = path.join(rootPath, "controller");

/*
 * Создание директорий если они отсутствуют
 */
!fs.existsSync(modelPath) ? fs.mkdirSync(modelPath, {recursive: true}): null;
!fs.existsSync(routePath) ? fs.mkdirSync(routePath, {recursive: true}): null;
!fs.existsSync(loggerPath) ? fs.mkdirSync(loggerPath, {recursive: true}): null;

const database = new pg.Client(config.get("database"));

database.connect(function (error, client) {

    if (error) {
        throw new Error(error);
    }

    client.query('select auth.logon($1::text,md5($2::text));', ['test', 'test'], function (err, res) {
        console.log(err);
        console.log(JSON.stringify(res.rows));
    });

    /**
     * Создание HTTP сервера
     */
    const app = express();

    http.createServer(app).listen(config.get("server.port"), config.get("server.host"));

    app.set("config", config);
    app.set("database.client", client);
    app.set("path.model", loggerPath);
    app.set("path.logger", modelPath);
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
});




// /**
//  * Подключаем все апи через входной файл.
//  */
// require('./routes/main')(app);
//
//
// /**
//  * Обработка ошибок.
// //  */
//
// app.use(function (error, req, res, next) {
//     console.log(123)
// });


// module.exports = app;

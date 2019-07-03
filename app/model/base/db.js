module.exports = function () {

    const app = this;

    class ModelDB {

        constructor(config) {
            let me = this,
                {schema, methods} = config;

            me._app = app;
            me._schema = schema;
            me._clientDB = app.get("database.client");

            for (let key in methods) if (methods.hasOwnProperty(key)) {

                if (typeof methods[key] === 'function') {
                    me[key] = methods[key].bind(me);
                }
                else if (String(methods[key]).toLowerCase() === '[object object]') {
                    me[key] = me.createRunQueryFromParams.apply(me, [methods[key]]);
                }

            }
        }

        get app() {
            return this._app;
        }

        get schema() {
            return this._schema;
        }

        get clientDB() {
            return this._clientDB;
        }

        runQuery(config) {

            let me = this,
                {schema, procedure, values, success, failure, callback} = config,
                client = me.clientDB,
                partsArg = [],
                partsValue = [],
                data;

            callback = callback || function () {};
            success = success || function () {};
            failure = failure || function () {};

            if (values) {
                values.forEach(function (row) {
                    partsValue.push(row['value']);
                    partsArg.push('$' + (partsArg.length + 1) + (row['type'] && row['type'] === 'string' ? '::text' : ''));
                });
            }

            client.query('select ' + schema + '.' + procedure + '(' + partsArg.join(',') + ');', partsValue, function (error, result) {

                if (error) {
                    callback({
                        procedure: {
                            name: 'select ' + schema + '.' + procedure + '(' + partsArg.join(',') + ');',
                            args: partsValue
                        },
                        message: error.message,
                        success: false
                    });
                    failure({
                        procedure: {
                            name: 'select ' + schema + '.' + procedure + '(' + partsArg.join(',') + ');',
                            args: partsValue
                        },
                        message: error.message,
                        success: false
                    });
                    return;
                }
                if (!result['rows']) {
                    callback(result);
                    failure(result);
                    return;
                }

                data = result['rows'][0][procedure];

                data['procedure'] = {
                    name: 'select ' + schema + '.' + procedure + '(' + partsArg.join(',') + ');',
                    args: partsValue
                };

                if (data['success']) {
                    callback(data);
                    success(data);
                }
                else {
                    callback(data);
                    failure(data);
                }
            });
        }

        createRunQueryFromParams (destParams) {
            let me = this,
                destArguments = destParams['arguments'],
                procedure = destParams['procedure'],
                schema = destParams['schema'];

            return function (sourceParams) {
                let sourceArguments = sourceParams['values'] || {},
                    values = [], value;

                destArguments.forEach(function (arg) {
                    value = sourceArguments[arg['name']] ? sourceArguments[arg['name']] : arg['defaultValue'];

                    values.push({
                        type: arg['type'],
                        value: value
                    });

                });

                me.runQuery({
                    schema: schema || me.schema,
                    procedure: procedure,
                    values: values,
                    callback: sourceParams['callback'],
                    success: sourceParams['success'],
                    failure: sourceParams['failure']
                });

            }.bind(me);

        }
    }

    return ModelDB;
};
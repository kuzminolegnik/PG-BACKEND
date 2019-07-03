module.exports = function () {

    const app = this;
    const ModelDB = app.getModel('base.db');

    return new ModelDB({

        schema: 'files',

        methods: {

            record: {
                procedure: 'names_view',
                arguments: [
                    {
                        name: 'session',
                        type: 'string',
                        defaultValue: null
                    },
                    {
                        name: 'id',
                        defaultValue: null
                    }
                ]
            },

            create: {
                procedure: 'names_add',
                arguments: [
                    {
                        name: 'session',
                        type: 'string',
                        defaultValue: null
                    },
                    {
                        name: 'data',
                        defaultValue: null
                    }
                ]
            },

            delete: {
                procedure: 'names_del',
                arguments: [
                    {
                        name: 'session',
                        type: 'string',
                        defaultValue: null
                    },
                    {
                        name: 'id',
                        defaultValue: null
                    }
                ]
            }

        }

    });

};